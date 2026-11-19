"""Replace bank 0 (the brain) of the particle atlas with a grainy mosaic document sheet.

Look: portrait ivory sheet (~3:4) with a cut/folded top-right corner and a champagne glint,
a navy title bar, four navy text rows and ~4% navy/champagne speckles (brand palette).
The title bar, rows and speckles carry a fill threshold (scale texture, green channel): the engine shows
them only as u_fill passes it, so the sheet is filled with data while the page scrolls.

Banks 1-3 (bulb, globe, finale) are copied unchanged from the original atlas.
The originals (pos-33.exr, cd-33.png, sc-33.png) are only read; new files are
written next to them as hero-document-*.  Deterministic (seeded) output.
"""
from pathlib import Path
import math, random, struct, subprocess, zlib

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/images'
N = 40000          # 200x200 atlas pixels
COUNT = 10000      # particles per bank (100x100)
rng = random.Random(7)

SHEET_H = 0.80                  # vertical extent in normalised coordinates
SHEET_W = SHEET_H * 0.75        # portrait 3:4
BASE_SCALE = 84                 # mean particle scale of the brain bank
DECOR = 150                     # particles used for decorative squares outside the sheet


def hexc(s):
    return tuple(int(s[i:i + 2], 16) for i in (1, 3, 5))


# Brand palette (public/css/style.css :root): deep navy #041E42, champagne #D6BE93, ivory #F6F2E9 - the same colours as
# the small documents floating around the sheet, so the sheet and its "data" read as one design.
# The engine draws the texture colour as is on black, so the ivory body is toned down to the brightness the old grey had.
BODY, TITLE, TEXT = hexc('#d2cdc2'), hexc('#0b2a58'), hexc('#1d3a66')
VIOLET, TEAL, AMBER, LILAC = hexc('#0b2a58'), hexc('#d6be93'), hexc('#d6be93'), hexc('#f6f2e9')
FOLD = (176, 164, 140)


def clamp(v):
    return max(0, min(255, int(round(v))))


def jitter(color, amount):
    d = rng.uniform(-amount, amount)
    return tuple(clamp(c + d) for c in color)


def mix(a, b, t):
    return tuple(clamp(a[k] * (1 - t) + b[k] * t) for k in range(3))


def decode(name, fmt):
    return subprocess.check_output(['ffmpeg', '-v', 'error', '-i', str(OUT / name), '-frames:v', '1',
                                    '-f', 'rawvideo', '-pix_fmt', fmt, 'pipe:1'])


def write_png(path, data):
    def chunk(kind, payload):
        return struct.pack('>I', len(payload)) + kind + payload + struct.pack('>I', zlib.crc32(kind + payload) & 0xffffffff)
    scan = b''.join(b'\0' + bytes(data[y * 600:(y + 1) * 600]) for y in range(200))
    path.write_bytes(b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', 200, 200, 8, 2, 0, 0, 0))
                     + chunk(b'IDAT', zlib.compress(scan)) + chunk(b'IEND', b''))


raw = struct.unpack('<120000f', decode('pos-33.exr', 'gbrpf32le'))
g, b, r = [list(raw[i * N:(i + 1) * N]) for i in range(3)]
colors = bytearray(decode('cd-33.png', 'rgb24'))
scales = bytearray(decode('sc-33.png', 'rgb24'))

# Sheet geometry in sheet coordinates (u right, v up, both 0..1).
FOLD_U, FOLD_V = 0.78, 0.84
CORNER = (0.89, 0.92)                              # centre of the folded corner (glint origin)
TITLE_BOX = (0.10, 0.65, 0.82, 0.88)               # u0, u1, v0, v1  (55% of the width)
ROWS = [0.68, 0.58, 0.48, 0.38]                    # text row centres
ROW_H = 0.035
RAYS = [i * math.tau / 10 + 0.2 for i in range(10)]


# Fill order (green channel of the scale texture, blue = field flag; read by the engine as the threshold of u_fill): while the page
# scrolls the blank sheet is "filled with data" - first the title bar, then the four text rows, each typed from left
# to right.  0 = the sheet itself, always shown; rows go from FILL_START to 1 in this order.
FILL_START = 0.06
FILL_SLOTS = 5                                     # title bar + 4 rows


def fill_threshold(u, slot, u0, u1):
    a = FILL_START + (1 - FILL_START) * slot / FILL_SLOTS
    b = FILL_START + (1 - FILL_START) * (slot + 0.85) / FILL_SLOTS
    f = max(0.0, min(1.0, (u - u0) / (u1 - u0)))
    return a + (b - a) * f


def place(i, cell):
    """Return (x, y, z, color, scale, fill, field) for one sheet cell: fill = threshold of u_fill above which the final
    colour shows, field = 1 for title bar / rows (blank state champagne), 0 for the rest (blank state ivory sheet)."""
    u, v = ((cell % 100 + .5) / 100, (cell // 100 + .5) / 100)
    a = (u - FOLD_U) / (1 - FOLD_U)
    c = (v - FOLD_V) / (1 - FOLD_V)
    inside_corner = u > FOLD_U and v > FOLD_V and a + c > 1   # triangle cut off, mirrored as the fold
    px, py = u, v
    z = 0.010 * math.sin(u * math.pi) * math.sin(v * math.pi)
    if inside_corner:
        px, py = FOLD_U + (1 - c) * (1 - FOLD_U), FOLD_V + (1 - a) * (1 - FOLD_V)
        z += 0.03 + 0.07 * (a + c - 1)

    edge = min(u, 1 - u, v, 1 - v) < 0.03
    jit = 0.006 if edge else 0.002                       # grainy, slightly uneven edges
    px += rng.uniform(-jit, jit)
    py += rng.uniform(-jit, jit)

    scale = BASE_SCALE
    # Blank state of the page start: the ivory sheet is there at once, its fields (title bar, rows) are champagne and
    # turn navy as they are filled.
    fill = 0.0
    field = 0
    color = jitter(BODY, 14)
    if inside_corner:
        color = jitter(FOLD, 12)
        fill = 0.0                                   # the folded corner is there from the start
    elif TITLE_BOX[0] < u < TITLE_BOX[1] and TITLE_BOX[2] < v < TITLE_BOX[3]:
        color = jitter(TITLE, 10)
        fill, field = fill_threshold(u, 0, TITLE_BOX[0], TITLE_BOX[1]), 1
    else:
        for k, row in enumerate(ROWS):
            if 0.10 < u < 0.90 and abs(v - row) < ROW_H / 2:
                color = mix(jitter(BODY, 14), jitter(TEXT, 8), 0.85)
                fill, field = fill_threshold(u, k + 1, 0.10, 0.90), 1
                break

    # Amber glint on the fold: bright core plus thin rays.
    ru, rv = (u - CORNER[0]), (v - CORNER[1])
    dist = math.hypot(ru * 0.75, rv)
    if dist < 0.075:
        if inside_corner and rng.random() < 0.55 + 0.4 * (1 - dist / 0.075):
            color = jitter(AMBER, 10)
        elif any(abs(math.sin(math.atan2(rv, ru * 0.75) - ang)) * dist < 0.006 and
                 math.cos(math.atan2(rv, ru * 0.75) - ang) > 0 for ang in RAYS):
            color = jitter(AMBER, 10)
            fill, field = 0.0, 0                     # glint rays are champagne from the start

    # ~4% speckles in violet / teal, slightly bigger than the rest.
    if rng.random() < 0.04:
        color = jitter(VIOLET if rng.random() < 0.5 else TEAL, 8)
        scale = BASE_SCALE * 1.25
        fill = max(fill, rng.uniform(FILL_START, 1.0))      # the specks are data too: they appear while the sheet fills

    x = 0.5 + (px - .5) * SHEET_W
    y = 0.5 + (py - .5) * SHEET_H
    return x, y, 0.5 + z, color, scale, max(0.0, fill), field


# Decorative squares outside the sheet: (cx, cy, colour, count).
DECOR_CLUSTERS = [
    (0.055, 0.90, AMBER, 36), (0.065, 0.10, AMBER, 36),
    (0.945, 0.30, LILAC, 40), (0.935, 0.72, hexc('#6a4de8'), 38),
]
decor = []
for cx, cy, col, n in DECOR_CLUSTERS:
    for k in range(n):
        ang, rad = rng.uniform(0, math.tau), 0.02 * math.sqrt(rng.random())
        decor.append((cx + math.cos(ang) * rad, cy + math.sin(ang) * rad * 1.3, 0.5 + rng.uniform(-.02, .02),
                      jitter(col, 10), BASE_SCALE * rng.uniform(0.9, 1.3), 0.0, 0))
decor = []   # the molecule-like clusters of tiny documents next to the sheet are switched off (the loop above still runs so the rng sequence of the sheet is unchanged)

for i in range(COUNT):
    j = (i // 100) * 200 + i % 100          # bank 0 pixel for particle i
    if i < len(decor):
        x, y, z, color, scale, fill, field = decor[i]    # first indices -> also present on mobile (first 7000)
    else:
        # Coprime permutation: the first 7000 particles (mobile) still cover the whole sheet.
        x, y, z, color, scale, fill, field = place(i, (i * 7919) % COUNT)
    r[j], g[j], b[j] = x, y, z
    colors[j * 3:j * 3 + 3] = bytes(color)
    scales[j * 3:j * 3 + 3] = bytes([clamp(scale), clamp(fill * 255), 255 if field else 0])   # R = scale, G = fill threshold, B = field flag

# Bank 3 (shown after the streams, on the left with the stamp) is the same sheet, particle for particle.
for i in range(COUNT):
    j = (i // 100) * 200 + i % 100
    k = j + 20100
    r[k], g[k], b[k] = r[j], g[j], b[j]
    colors[k * 3:k * 3 + 3] = colors[j * 3:j * 3 + 3]
    scales[k * 3:k * 3 + 3] = bytes([scales[j * 3], 0, 0])    # the final sheet is already filled

# Uncompressed float EXR so the bundled decoder reads it exactly.
planes = struct.pack('<120000f', *(g + b + r))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'gbrpf32le', '-s', '200x200', '-i', 'pipe:0',
                '-frames:v', '1', '-compression', 'none', str(OUT / 'hero-document-positions.exr')],
               input=planes, check=True)
write_png(OUT / 'hero-document-colors.png', colors)
write_png(OUT / 'hero-document-scales.png', scales)
print('Generated hero-document-{positions.exr,colors.png,scales.png}; banks 1-3 unchanged.')
