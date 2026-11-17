"""Rewrite banks 1 and 2 of the hero particle atlas with five wide streams of document fragments.

Banks 1/2 store baked positions (like bank 0, the document); the simulation shaders decode them as
(p - 0.5) * 2 * radius.  Both banks get identical data.  Bank 0 (document) and bank 3 are kept byte for byte.

Look: on pure black a wide, soft, grey cloud comes out of the left edge.  About a third of the way across it
splits into five broad ribbons that bend smoothly and run past the right edge.  Near the split everything is grey,
pale, small and far away (blurred by depth of field); further right fragments grow, brighten and saturate.
Ribbons are dense but uneven (gaps and clumps), with ragged, scattered edges and a few free-floating coloured
fragments around them.

Authoring space = final screen space: half the screen height = 1, origin = screen centre, y up.  It is converted with
SCREEN_TO_WORLD and the group offset of the hero scroll step is subtracted before baking.

Usage: python3 scripts/generate-hero-streams.py [preview.png]
"""
from pathlib import Path
import math, random, struct, subprocess, sys, zlib

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/images'
N = 40000
COUNT = 10000
rng = random.Random(2601)
BASE_SCALE = 84

SCREEN_TO_WORLD = 4.66          # world units per half screen height
RADIUS = 4.35                   # u_factor of the simulation at this step
GROUP = (-2.5, 0.5)             # basePosition on this step (desktop _updatePosition)
Y_SHIFT = 0.26                  # measured with a marker grid: the engine draws this step 0.26 half-heights lower

VIOLET, LILAC, TEAL, YELLOW, WHITE, LIGHT = '#7c4dff', '#b79cff', '#27c4b0', '#ffd23f', '#ffffff', '#d4d2de'
GREY = '#8c8c96'
ACCENTS = [LILAC, VIOLET, TEAL, YELLOW, WHITE]

X0, X1 = -2.0, 2.3              # ribbons start left of the frame and end past the right edge (screen units)
CLOUD = (-1.45, 0.05)           # centre of the grey cloud on the left edge
SPLIT = (0.10, 0.42)            # u range over which the cloud fans out into five ribbons
SHARE_CLOUD, STRAYS = 0.14, 56


def smooth(a, b, x):
    t = max(0.0, min(1.0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)


def lerp(a, b, t):
    return a + (b - a) * t


def hexc(s):
    return tuple(int(s[i:i + 2], 16) for i in (1, 3, 5))


def clamp(v):
    return max(0, min(255, int(round(v))))


def gauss():
    return (rng.random() + rng.random() + rng.random() - 1.5) / 1.5     # ~[-1, 1], bell-like


def shade(color, grey_amount, brightness, jitter=8):
    g, d = hexc(GREY), rng.uniform(-jitter, jitter)
    return bytes(clamp(lerp(c, gc, grey_amount) * brightness + d) for c, gc in zip(color, g))


# Target centre lines (screen y at u in 0..1), each its own broad wave.
def y1(u):  # high arc, peaks across the middle, dips a little at the right edge
    return 0.36 + 0.26 * math.sin(math.pi * (0.06 + 0.88 * u))


def y2(u):  # a little lower, wide wave
    return 0.15 + 0.06 * math.sin(2 * math.pi * 1.05 * u + 0.6)


def y3(u):  # roughly the middle, soft bend
    return -0.17 + 0.06 * math.sin(2 * math.pi * 1.25 * u + 2.2)


def y4(u):  # lower, nearly flat wave
    return -0.50 + 0.04 * math.sin(2 * math.pi * 1.6 * u + 4.0)


def y5(u):  # drops noticeably out of the cloud into the lower part of the frame
    return -0.15 - 0.64 * smooth(0.05, 0.62, u) + 0.04 * math.sin(2 * math.pi * 1.3 * u + 1.0)


# (centre line, half-width scale, dominant accent colour)
STREAMS = [(y1, 1.0, LILAC), (y2, 1.0, TEAL), (y3, 1.1, VIOLET), (y4, 0.9, YELLOW), (y5, 1.05, VIOLET)]
PHASES = [rng.uniform(0, 6.28) for _ in STREAMS]


def centre(si, u):
    fan = smooth(SPLIT[0], SPLIT[1], u)
    return lerp(X0, X1, u), lerp(CLOUD[1], STREAMS[si][0](u), fan)


def order_of(u):
    """0 = grey cloud chaos, 1 = crisp saturated ribbon."""
    return smooth(0.08, 0.62, u)


def density(si, u):
    """Uneven fill: slow waves make clumps and thin spots along the ribbon."""
    p = PHASES[si]
    n = 0.5 + 0.30 * math.sin(u * 17 + p) + 0.20 * math.sin(u * 41 + p * 2.3)
    return max(0.12, min(1.0, 0.35 + 0.75 * n))


def decode(name, fmt):
    return subprocess.check_output(['ffmpeg', '-v', 'error', '-i', str(OUT / name), '-frames:v', '1',
                                    '-f', 'rawvideo', '-pix_fmt', fmt, 'pipe:1'])


def write_png(path, data, w=200, h=200):
    def chunk(kind, payload):
        return struct.pack('>I', len(payload)) + kind + payload + struct.pack('>I', zlib.crc32(kind + payload) & 0xffffffff)
    scan = b''.join(b'\0' + bytes(data[y * w * 3:(y + 1) * w * 3]) for y in range(h))
    path.write_bytes(b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0))
                     + chunk(b'IDAT', zlib.compress(scan)) + chunk(b'IEND', b''))


raw = struct.unpack('<120000f', decode('hero-document-positions.exr', 'gbrpf32le'))
g, b, r = [list(raw[i * N:(i + 1) * N]) for i in range(3)]
colors = bytearray(decode('hero-document-colors.png', 'rgb24'))
scales = bytearray(decode('hero-document-scales.png', 'rgb24'))

n_cloud = int(COUNT * SHARE_CLOUD)
preview = []


def page_colour(i):
    """Real document artwork (sheet white, ink, coloured blocks) sampled from bank 0; ink is lifted so it stays visible."""
    cell = (i * 7919) % COUNT
    texel = (cell // 100) * 200 + cell % 100
    c = tuple(colors[texel * 3:texel * 3 + 3])
    if sum(c) / 3 < 90:
        c = hexc(LIGHT) if rng.random() < 0.55 else c
    return c


for i in range(COUNT):
    k = (i * 7919) % COUNT          # coprime permutation: the first 7000 (mobile) hold cloud, strays and all ribbons
    if k < n_cloud:                 # soft grey cloud on the left edge
        ang, rad = rng.uniform(0, 2 * math.pi), rng.random() ** 0.75
        sx = CLOUD[0] + math.cos(ang) * rad * 0.75 + 0.1
        sy = CLOUD[1] + math.sin(ang) * rad * 0.42
        sz = -0.05 + rng.uniform(-0.15, 0.1)
        col = shade(page_colour(i), 0.45, rng.uniform(0.7, 1.0), 12)
        scale = BASE_SCALE * rng.uniform(0.6, 1.0)
    elif k < n_cloud + STRAYS:      # free-floating coloured fragments around the ribbons
        si = rng.randrange(5)
        u = rng.uniform(0.35, 1.0)
        cx, cy = centre(si, u)
        sx = cx + rng.uniform(-0.15, 0.15)
        sy = cy + rng.choice((-1, 1)) * rng.uniform(0.22, 0.55)
        sz = rng.uniform(-0.5, 0.5)
        col = shade(hexc(rng.choice(ACCENTS)), 0.0, rng.uniform(0.6, 1.0), 5)
        scale = BASE_SCALE * rng.uniform(0.8, 1.9)
    else:
        si = k % 5
        while True:                 # rejection sampling gives clumps and gaps
            u = rng.random() ** 0.92
            if rng.random() < density(si, u):
                break
        order = order_of(u)
        cx, cy = centre(si, u)
        half = lerp(0.22, 0.14, order) * STREAMS[si][1] * (1 + 0.22 * math.sin(u * 9 + PHASES[si]))
        spread = gauss() * half
        if rng.random() < 0.10:     # ragged, scattered edge
            spread *= rng.uniform(1.3, 2.0)
        sx = cx + rng.uniform(-0.06, 0.06) * (1 - order) + rng.uniform(-0.02, 0.02)
        sy = cy + spread
        sz = -(1 - order) * 0.30 + rng.uniform(-0.05, 0.05)
        if rng.random() < lerp(0.03, 0.30, order):      # bright coloured blocks and details
            src = STREAMS[si][2] if rng.random() < 0.55 else rng.choice(ACCENTS)
            col = shade(hexc(src), (1 - order) * 0.6, lerp(0.75, 1.0, order) * rng.uniform(0.85, 1.05), 5)
        else:
            col = shade(page_colour(i), (1 - order) * 0.55, lerp(0.75, 1.0, order), 6)
        scale = BASE_SCALE * lerp(0.65, 1.1, order) * rng.uniform(0.8, 1.2)
    wx, wy, wz = sx * SCREEN_TO_WORLD, (sy + Y_SHIFT) * SCREEN_TO_WORLD, sz * SCREEN_TO_WORLD
    x = 0.5 + (wx - GROUP[0]) / (2 * RADIUS)           # shader: (p - 0.5) * 2 * radius, group offset added afterwards
    y = 0.5 + (wy - GROUP[1]) / (2 * RADIUS)
    z = 0.5 + wz / (2 * RADIUS)
    sc = bytes([clamp(scale)] * 3)
    for j in ((i // 100) * 200 + 100 + i % 100,           # bank 1
              (i // 100 + 100) * 200 + i % 100):          # bank 2
        r[j], g[j], b[j] = x, y, z
        colors[j * 3:j * 3 + 3] = col
        scales[j * 3:j * 3 + 3] = sc
    preview.append((sz, sx, sy, col, scale))

planes = struct.pack('<120000f', *(g + b + r))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'gbrpf32le', '-s', '200x200', '-i', 'pipe:0',
                '-frames:v', '1', '-compression', 'none', str(OUT / 'hero-document-positions.exr')],
               input=planes, check=True)
write_png(OUT / 'hero-document-colors.png', colors)
write_png(OUT / 'hero-document-scales.png', scales)
print('Banks 1-2 rewritten with streams.')

if len(sys.argv) > 1:               # quick preview at 1062x562 (no blur, no depth of field)
    W, H = 1062, 562
    img = bytearray(W * H * 3)
    for sz, sx, sy, cb, scale in sorted(preview):
        px, py = int(W / 2 + sx * H / 2), int(H / 2 - sy * H / 2)
        half = max(1, int(scale / 60))
        for yy in range(py - half, py + half + 1):
            for xx in range(px - half, px + half + 1):
                if 0 <= xx < W and 0 <= yy < H:
                    o = (yy * W + xx) * 3
                    img[o:o + 3] = cb
    write_png(Path(sys.argv[1]), img, W, H)
    print('Preview:', sys.argv[1])
