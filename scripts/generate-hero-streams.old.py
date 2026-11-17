"""Rewrite banks 1 and 2 of the hero particle atlas with five document-fragment streams.

Banks 1/2 store real, baked positions (like bank 0, the document), so the simulation shaders decode them the
standard way: (p - 0.5) * 2 * radius.  Both banks get identical data.  Bank 0 (document) and bank 3 are kept
byte for byte.

Look (from the screenshot reference): five wavy sine ribbons flowing left to right. On the left
the ribbons are wide, grey, small and dim and merge into one cloud (chaos); to the right they narrow into dense
saturated strands (order): order = smoothstep(0.05, 0.55, t).  Ribbon width pulses along the length.  About 28
strays drift around the ribbons for depth.

Geometry is authored in "screen units" (half the screen height = 1, origin = screen centre, y up), converted with
SCREEN_TO_WORLD and offset by the group position of that scroll step (x -2.5, y +0.5).

Usage: python3 scripts/generate-hero-streams.py [preview.png]
"""
from pathlib import Path
import math, random, struct, subprocess, sys, zlib

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/images'
N = 40000
COUNT = 10000
rng = random.Random(11)
BASE_SCALE = 84

SCREEN_TO_WORLD = 4.66          # world units per half screen height
RADIUS = 4.35                   # u_factor of the simulation at this step
GROUP = (-2.5, 0.5)             # basePosition on this step (desktop _updatePosition)

# Palette used to pick readable details from the document itself, plus restrained accent glints.
VIOLET, LILAC, TEAL, AMBER, LIGHT = '#7c4dff', '#a98bff', '#2bb59a', '#f5b942', '#e8e6f5'
PALETTE = [VIOLET, LILAC, TEAL, AMBER, LIGHT]
GREY = '#8a8a94'

X0, X1 = -0.05, 2.05            # ribbon start / end (screen units, past the right edge)
CLOUD = (0.12, 0.20)            # where the ribbons come out of the cloud
# (base_y, amplitude, frequency, phase): every ribbon has its own wave.
STREAMS = [
    (0.50, 0.075, 1.5, 0.4),
    (0.22, 0.060, 1.9, 2.1),
    (0.05, 0.085, 1.4, 4.0),
    (-0.18, 0.055, 2.1, 1.2),
    (-0.55, 0.080, 1.6, 5.2),
]
WIDE, NARROW = 0.20, 0.075      # half-width of the ribbon at the source / far right
SHARE_CLOUD, STRAYS = 0.08, 28


def hexc(s):
    return tuple(int(s[i:i + 2], 16) for i in (1, 3, 5))


def clamp(v):
    return max(0, min(255, int(round(v))))


def lerp(a, b, t):
    return a + (b - a) * t


def smooth(a, b, x):
    t = max(0.0, min(1.0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)


def gauss():
    return (rng.random() + rng.random() + rng.random() - 1.5) / 1.5     # ~[-1, 1], clumpy


def shade(color, grey_amount, brightness, jitter=10):
    """Mix a colour towards grey and dim it: left side is greyish and faint."""
    g, d = hexc(GREY), rng.uniform(-jitter, jitter)
    return bytes(clamp(lerp(c, gc, grey_amount) * brightness + d) for c, gc in zip(color, g))


def decode(name, fmt):
    return subprocess.check_output(['ffmpeg', '-v', 'error', '-i', str(OUT / name), '-frames:v', '1',
                                    '-f', 'rawvideo', '-pix_fmt', fmt, 'pipe:1'])


def write_png(path, data, w=200, h=200):
    def chunk(kind, payload):
        return struct.pack('>I', len(payload)) + kind + payload + struct.pack('>I', zlib.crc32(kind + payload) & 0xffffffff)
    scan = b''.join(b'\0' + bytes(data[y * w * 3:(y + 1) * w * 3]) for y in range(h))
    path.write_bytes(b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0))
                     + chunk(b'IDAT', zlib.compress(scan)) + chunk(b'IEND', b''))


def centre(stream, t):
    """Centre line of a ribbon: fans out of the cloud, then a sine with the stream's own phase/amplitude."""
    base_y, amp, freq, phase = stream
    order = smooth(0.05, 0.55, t)
    fan = smooth(0.0, 0.55, t)
    y = lerp(CLOUD[1], base_y, fan) + amp * order * math.sin(t * freq * 2 * math.pi + phase)
    return lerp(X0, X1, t), y


raw = struct.unpack('<120000f', decode('hero-document-positions.exr', 'gbrpf32le'))
g, b, r = [list(raw[i * N:(i + 1) * N]) for i in range(3)]
colors = bytearray(decode('hero-document-colors.png', 'rgb24'))
scales = bytearray(decode('hero-document-scales.png', 'rgb24'))

n_cloud = int(COUNT * SHARE_CLOUD)
preview = []

for i in range(COUNT):
    k = (i * 7919) % COUNT          # coprime permutation: mobile (first 7000) keeps cloud, strays and every ribbon
    if k < n_cloud:                 # grey cloud where the ribbons start
        ang, rad = rng.uniform(0, 2 * math.pi), rng.random() ** 0.8
        sx = CLOUD[0] + math.cos(ang) * rad * 0.30
        sy = CLOUD[1] + math.sin(ang) * rad * 0.26
        sz = -0.15 + rng.uniform(-0.1, 0.08)
        col = shade(hexc(LIGHT), 0.6, 0.7, 14)
        scale = BASE_SCALE * rng.uniform(0.35, 0.6)
    elif k < n_cloud + STRAYS:      # lone squares drifting around the ribbons
        s_ = STREAMS[rng.randrange(5)]
        t = rng.uniform(0.25, 1.0)
        cx, cy = centre(s_, t)
        sx, sy = cx + rng.uniform(-0.1, 0.1), cy + rng.choice((-1, 1)) * rng.uniform(0.12, 0.38)
        sz = rng.uniform(-0.5, 0.5)
        col = shade(hexc(rng.choice(PALETTE)), 0.0, rng.uniform(0.5, 1.0), 6)
        scale = BASE_SCALE * rng.uniform(0.7, 1.7)
    else:
        s_ = STREAMS[rng.randrange(5)]
        t = rng.random() ** 0.9
        order = smooth(0.05, 0.55, t)
        cx, cy = centre(s_, t)
        width = lerp(WIDE, NARROW, order) * (1 + 0.25 * math.sin(t * 9 + s_[3]))     # width pulses
        sx = cx + rng.uniform(-0.05, 0.05) * (1 - order)
        sy = cy + gauss() * width
        sz = -(1 - order) * 0.5 + rng.uniform(-0.04, 0.04)
        # Sample actual document artwork by particle index: sheet white, ink, title and small
        # colored details travel together through each ribbon instead of becoming plain squares.
        page_cell = (i * 7919) % COUNT
        page_texel = (page_cell // 100) * 200 + page_cell % 100
        page_color = tuple(colors[page_texel * 3:page_texel * 3 + 3])
        accent = hexc(rng.choice(PALETTE))
        detail = rng.random() < 0.12
        source = accent if detail else page_color
        col = shade(source, (1 - order) * 0.72, lerp(0.52, 1.0, order), 7)
        scale = BASE_SCALE * lerp(0.45, 1.1, order) * rng.uniform(0.85, 1.15)
    wx, wy, wz = sx * SCREEN_TO_WORLD, sy * SCREEN_TO_WORLD, sz * SCREEN_TO_WORLD
    # baked texel: shader does (p - 0.5) * 2 * radius, and the group offset is added afterwards
    x = 0.5 + (wx - GROUP[0]) / (2 * RADIUS)
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

if len(sys.argv) > 1:               # preview on the reference screenshot's size (1062x562)
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
