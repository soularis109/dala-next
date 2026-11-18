"""Rewrite banks 1 and 2 of the hero particle atlas: bank 1 = branching streams of document fragments, bank 2 = the document.

Banks store baked positions (like bank 0, the document); the simulation shaders decode them as
(p - 0.5) * 2 * radius.  Page flow: document (bank 0) -> streams (bank 1) -> the streams fall apart and fold back into
the document on the left (bank 2, an exact copy of bank 0) where the stamp is pressed -> bank 3.
Bank 0 (document) and bank 3 are kept byte for byte.

Look (right part of the frame, a lying figure-eight ribbon seen from the side and slightly at an angle):
  1. from a far upper-left node a high arc goes up and gently down to the right edge, coming towards the camera;
  2. from the same node a second line dives down at once, closing an "eye" between 1 and 2, then rises and runs
     almost parallel to line 1;
  3. a thinner middle line starts a little lower and deeper (from under the upper node), passes under line 2 with
     a narrow dark gap and runs to the right as the central axis;
  4/5. a thin line deep on the left runs diagonally down-right and at about a third splits: branch 4 goes almost
     horizontally right, branch 5 drops steeply into the lower right corner - the closest, widest part with the
     biggest fragments.
On the left everything is a dense, pale grey-white, half-transparent bundle (far away, depth of field); on the
right the streams open up, with air between fragments and contrasting document colours (white, amber, violet, teal).
All colours come from the document itself (bank 0).

Authoring: lines are Catmull-Rom curves through control points in final SCREEN space (half screen height = 1,
origin = screen centre, y up) plus a depth z (world units).  The particle camera is a real perspective camera
(fov 50, z = 10), so the world position is screen * SCREEN_TO_WORLD * (10 - z) / 10 and the shape stays exact on
screen; the group offset of the hero scroll step is subtracted before baking.

Usage: python3 scripts/generate-hero-streams.py [preview.png]
"""
from pathlib import Path
import bisect, math, random, struct, subprocess, sys, zlib

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/images'
N = 40000
COUNT = 10000
rng = random.Random(2601)
BASE_SCALE = 108

SCREEN_TO_WORLD = 4.66          # world units per half screen height at z = 0
CAM_Z = 10.0                    # particle camera distance
RADIUS = 4.35                   # u_factor of the simulation at this step
GROUP = (-2.5, 0.5)             # basePosition on this step (desktop _updatePosition)
Y_SHIFT = 0.26                  # measured with a marker grid: the engine draws this step 0.26 half-heights lower

WHITE_TARGET = (240, 240, 244)  # sheet white the document body is lifted to
INK_LIFT = (118, 118, 126)      # dark text rows are lifted so they stay visible on black
HAZE = (216, 216, 222)          # pale grey-white of the far, blurred bundles on the left

X0, X1 = -0.42, 1.95            # screen x range of the composition (past the right edge at 16:9)
DEPTH = (-2.6, 2.8)             # z at X0 / X1: far on the left (still visible: alpha is smoothstep(-4.5, 4, z)), near on the right
Z_LIMIT = RADIUS * 0.98         # |z| the baked data may reach: the EXR stores (z / (2 * RADIUS) + 0.5), which must stay in [0, 1]
SPLIT_X = 0.02                  # where lines 4 and 5 meet in one node and split (far to the left)
EYE_END = 1.0                   # where the eye between lines 1 and 2 closes
STRAYS = 20

# Left start: all five lines leave X0 separately, one above the other (a vertical stack of five layers coming out of
# the depth), then flow into their own paths:
#   lines 1 + 2 (y 0.40 / 0.30) come together into one dense node near x = -0.15 and at once part up and down (the eye);
#   line 3 (y 0.20) runs smoothly under line 2;
#   lines 4 + 5 (y 0.08 / -0.04) meet in the split node at SPLIT_X (y -0.18): 4 levels out to the right, 5 drops
#   diagonally into the lower right corner.
CONTROL = [
    [(X0, 0.40), (-0.15, 0.35), (0.15, 0.54), (0.60, 0.66), (1.10, 0.62), (1.55, 0.54), (1.95, 0.46)],         # 1 high arc
    [(X0, 0.30), (-0.15, 0.31), (0.15, 0.15), (0.60, 0.11), (1.05, 0.17), (1.50, 0.25), (1.95, 0.30)],         # 2 lower arc of the eye
    [(X0, 0.20), (-0.15, 0.12), (0.15, 0.00), (0.60, -0.04), (1.05, 0.01), (1.50, 0.06), (1.95, 0.10)],        # 3 middle axis
    [(X0, 0.08), (-0.18, -0.06), (SPLIT_X, -0.18), (0.45, -0.26), (0.95, -0.27), (1.45, -0.25), (1.95, -0.23)],  # 4 horizontal branch
    [(X0, -0.04), (-0.18, -0.11), (SPLIT_X, -0.18), (0.45, -0.40), (0.95, -0.62), (1.45, -0.80), (1.95, -0.94)],  # 5 low front branch
]


def smooth(a, b, x):
    t = max(0.0, min(1.0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)


def lerp(a, b, t):
    return a + (b - a) * t


def clamp(v):
    return max(0, min(255, int(round(v))))


def gauss():
    return (rng.random() + rng.random() + rng.random() - 1.5) / 1.5     # ~[-1, 1], bell-like


def mix(a, b, t):
    return tuple(a[k] * (1 - t) + b[k] * t for k in range(3))


def catmull_rom(ctrl, steps=120):
    """Smooth polyline through the control points (end points duplicated so the curve starts and ends on them)."""
    p = [ctrl[0]] + list(ctrl) + [ctrl[-1]]
    out = []
    for i in range(1, len(p) - 2):
        p0, p1, p2, p3 = p[i - 1], p[i], p[i + 1], p[i + 2]
        for s in range(steps):
            t = s / steps
            t2, t3 = t * t, t * t * t
            out.append(tuple(0.5 * (2 * p1[c] + (-p0[c] + p2[c]) * t + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2
                                    + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3) for c in range(2)))
    out.append(ctrl[-1])
    return out


LINES = [catmull_rom(c) for c in CONTROL]

# Arc length of every line, so particles are spread evenly along the curves.
ARCS = []
for pts in LINES:
    acc = [0.0]
    for p, q in zip(pts, pts[1:]):
        acc.append(acc[-1] + math.hypot(q[0] - p[0], q[1] - p[1]))
    ARCS.append(acc)
TOTAL = [arc[-1] for arc in ARCS]
LINE_CUM = [sum(TOTAL[:k + 1]) for k in range(len(LINES))]

PHASE = [rng.uniform(0, 6.28) for _ in LINES]


def density(si, f):
    """Uneven fill: slow waves make clumps and thin spots along each line (0..1, the shared node of 1 + 2 up to 2)."""
    p = PHASE[si]
    n = 0.5 + 0.28 * math.sin(f * 15 + p) + 0.18 * math.sin(f * 37 + p * 2.3)
    d = max(0.65, min(1.0, 0.7 + 0.45 * n))                 # dense, even fill without big gaps
    if si in (0, 1):                                         # dense grey-white node before lines 1 and 2 part (fx < 0.25)
        node = 1 - smooth(0.0, 0.25, fx_of(point_on(si, f)[0]))
        d = lerp(d, 2.0, node)
    return d


def point_on(si, f):
    """Point at arc-length fraction f of line si (linear interpolation on the polyline)."""
    arc, pts = ARCS[si], LINES[si]
    target = f * arc[-1]
    j = min(max(bisect.bisect_left(arc, target), 1), len(arc) - 1)
    w = (target - arc[j - 1]) / max(arc[j] - arc[j - 1], 1e-9)
    return tuple(lerp(pts[j - 1][c], pts[j][c], w) for c in range(2))


def fx_of(x):
    return max(0.0, min(1.0, (x - X0) / (X1 - X0)))


def z_of(si, x):
    """Depth of the line centre: far left (strong depth of field), near right; line 3 deeper; branch 5 closest."""
    z = lerp(DEPTH[0], DEPTH[1], fx_of(x))
    eye = 1 - smooth(EYE_END - 0.2, EYE_END + 0.1, x)
    if si == 0:
        z += 0.2 * eye
    elif si == 1:
        z -= 0.2 * eye
    elif si == 2:
        z -= 0.8
    elif si == 4:
        z += 1.2 * smooth(SPLIT_X, X1, x)
    return z


def radius_of(si, x):
    """Strand radius on screen: thick on the left (0.055), wide on the right (0.16, branch 5 up to 0.25)."""
    r = lerp(0.055, 0.16, smooth(0.0, 1.0, fx_of(x)))
    if si == 2:
        r *= 0.80                                            # line 3 is a bit thinner than its neighbours
    elif si == 4:
        r = lerp(r, 0.25, smooth(SPLIT_X, X1, x))
    return r


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

# Bank 0 colours are read BEFORE banks 1/2 are overwritten, so a re-run samples the real document, not itself.
doc_colors = [tuple(colors[((c // 100) * 200 + c % 100) * 3:((c // 100) * 200 + c % 100) * 3 + 3]) for c in range(COUNT)]
ACCENTS = [c for c in doc_colors if max(c) - min(c) >= 28]      # the document's own amber / violet / teal pixels
preview = []
clipped, lo, hi = 0, [9.0] * 3, [-9.0] * 3      # bake range check: x, y, z in the EXR must stay in [0, 1]


def doc_colour(i):
    """Colour of a real document cell: the grey body is lifted to sheet white, ink is kept (lifted), accents untouched."""
    c = doc_colors[(i * 7919) % COUNT]
    lo, hi = min(c), max(c)
    if hi - lo < 28:                                    # neutral: body, fold or text row
        if hi >= 140:                                   # body (~#c8c8cc) -> sheet white
            return mix(c, WHITE_TARGET, 0.8)
        return mix(c, INK_LIFT, 0.65)                   # dark text row
    return c                                            # purple title, teal / amber specks, lilac


def colour_at(i, fx):
    """Left (fx < 0.35): an almost solid, half-transparent grey-white haze; right: full document colours, accents ~55%."""
    if ACCENTS and rng.random() < 0.55 * smooth(0.3, 1.0, fx):
        c = rng.choice(ACCENTS)
    else:
        c = doc_colour(i)
    return mix(c, HAZE, 0.85 * (1 - smooth(0.35, 0.7, fx)))


def pick_line():
    """A line chosen by its length and an arc fraction on it; rejection sampling gives clumps and gaps."""
    while True:
        si = bisect.bisect_left(LINE_CUM, rng.random() * LINE_CUM[-1])
        f = rng.random()
        x = point_on(si, f)[0]
        if rng.random() < 0.5 * density(si, f) * lerp(1.0, 0.5, fx_of(x)):     # denser far bundles on the left
            return si, f


for i in range(COUNT):
    k = (i * 7919) % COUNT          # coprime permutation: the first 7000 (mobile) hold strays and all lines
    if k < STRAYS:                  # loose fragments floating around the lines on the right
        si, f = pick_line()
        f = lerp(0.45, 1.0, f)                               # only around the centre / right part
        cx, cy = point_on(si, f)
        sx = cx + rng.uniform(-0.1, 0.1)
        sy = cy + rng.choice((-1, 1)) * rng.uniform(0.15, 0.45)
        sz = z_of(si, cx) + rng.uniform(-0.8, 0.8)
        fx = fx_of(cx)
        light = 0.5                                          # muted, so they never read as big colour blots
        col = tuple(c * light for c in colour_at(i, fx))
        scale = BASE_SCALE * rng.uniform(0.25, 0.45)         # very small
    else:
        si, f = pick_line()
        cx, cy = point_on(si, f)
        fx = fx_of(cx)
        rad = radius_of(si, cx)
        spread = 1.0 if rng.random() > 0.08 else rng.uniform(1.4, 2.2)       # ragged, scattered edge
        sx = cx + gauss() * rad * 0.65
        sy = cy + gauss() * rad * spread
        sz = z_of(si, cx) + gauss() * rad * 2.4 * spread
        light = lerp(0.7, 1.0, smooth(0.0, 0.6, fx))
        if si == 1:
            light *= lerp(0.88, 1.0, smooth(EYE_END - 0.2, EYE_END + 0.1, cx))   # back line of the eye
        col = tuple(c * light + rng.uniform(-6, 6) for c in colour_at(i, fx))
        s = lerp(0.6, 1.35, fx)                              # small fragments on the far left, up to 1.35 * BASE_SCALE on the right
        if si == 4:
            s = lerp(s, 1.55, smooth(SPLIT_X, X1, cx))       # branch 5: the biggest fragments, down in the right corner
        scale = BASE_SCALE * s * rng.uniform(0.8, 1.2)
    sz = max(-Z_LIMIT, min(Z_LIMIT, sz))                    # keep the baked z inside the EXR range
    persp = (CAM_Z - sz) / CAM_Z
    wx = sx * SCREEN_TO_WORLD * persp
    wy = sy * SCREEN_TO_WORLD * persp + Y_SHIFT * SCREEN_TO_WORLD
    x = 0.5 + (wx - GROUP[0]) / (2 * RADIUS)                # shader: (p - 0.5) * 2 * radius, group offset added afterwards
    y = 0.5 + (wy - GROUP[1]) / (2 * RADIUS)
    z = 0.5 + sz / (2 * RADIUS)
    if not (0.0 <= x <= 1.0 and 0.0 <= y <= 1.0):          # only counted: the right ends of the lines lie beyond the
        clipped += 1                                        # RADIUS box by design, the float EXR and the shader handle it
    lo = [min(lo[0], x), min(lo[1], y), min(lo[2], z)]
    hi = [max(hi[0], x), max(hi[1], y), max(hi[2], z)]
    col = bytes(clamp(c) for c in col)
    sc = bytes([clamp(scale)] * 3)
    j = (i // 100) * 200 + 100 + i % 100                    # bank 1: the streams
    r[j], g[j], b[j] = x, y, z
    colors[j * 3:j * 3 + 3] = col
    scales[j * 3:j * 3 + 3] = sc
    preview.append((sz, sx, sy, col, scale))

# Bank 2 is the document again: the same particles with the same colours and scales as bank 0 (the sheet the stamp is
# pressed on, on the left like at the start of the page).  The engine flies every particle from its bank 1 spot to its
# bank 2 spot at progress 3.3-3.5, so the streams fall apart and fold back into the document.
# On step 2 the engine turns the sheet round the Y axis by DOC_TILT (legacy/2601.cjs, _updateRotation: -0.2 * pi for
# progress 1..2.7, back to 0 at 3), so its left edge is nearer to the camera.  From step 3 the group is straight again,
# so the same turn is baked into bank 2: the stamp sheet keeps the pose of step 2.  The shader applies
# rotationMatrix(Y, a) = (x cos a - z sin a, y, x sin a + z cos a) about the centre of the group (p = 0.5).
# Bank 0 is only read here, never written.
DOC_TILT = -0.2 * math.pi
tc, ts = math.cos(DOC_TILT), math.sin(DOC_TILT)
for i in range(COUNT):
    j0 = (i // 100) * 200 + i % 100
    j2 = (i // 100 + 100) * 200 + i % 100
    dx, dz = r[j0] - 0.5, b[j0] - 0.5
    r[j2], g[j2], b[j2] = 0.5 + dx * tc - dz * ts, g[j0], 0.5 + dx * ts + dz * tc
    colors[j2 * 3:j2 * 3 + 3] = colors[j0 * 3:j0 * 3 + 3]
    scales[j2 * 3:j2 * 3 + 3] = scales[j0 * 3:j0 * 3 + 3]

planes = struct.pack('<120000f', *(g + b + r))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'gbrpf32le', '-s', '200x200', '-i', 'pipe:0',
                '-frames:v', '1', '-compression', 'none', str(OUT / 'hero-document-positions.exr')],
               input=planes, check=True)
write_png(OUT / 'hero-document-colors.png', colors)
write_png(OUT / 'hero-document-scales.png', scales)
print('Bank 1: branching streams; bank 2: the document (bank 0) turned by DOC_TILT, as on step 2.')
print('baked range  x %.3f..%.3f  y %.3f..%.3f  z %.3f..%.3f;  %d of %d particles have x or y outside 0..1 (z is clamped into 0..1)'
      % (lo[0], hi[0], lo[1], hi[1], lo[2], hi[2], clipped, COUNT))

if len(sys.argv) > 1:               # quick preview at 1062x562: perspective size and depth alpha, no blur
    W, H = 1062, 562
    img = bytearray(W * H * 3)
    for sz, sx, sy, cb, scale in sorted(preview):           # far first, near last
        persp = CAM_Z / (CAM_Z - sz)
        alpha = smooth(-4.5, 4.0, sz)
        px, py = int(W / 2 + sx * H / 2), int(H / 2 - sy * H / 2)
        half = max(1, int(scale * persp / 45))
        for yy in range(py - half, py + half + 1):
            for xx in range(px - half, px + half + 1):
                if 0 <= xx < W and 0 <= yy < H:
                    o = (yy * W + xx) * 3
                    for c in range(3):
                        img[o + c] = clamp(img[o + c] * (1 - alpha) + cb[c] * alpha)
    write_png(Path(sys.argv[1]), img, W, H)
    print('Preview:', sys.argv[1])
