"""Use the same document in banks zero, two and three; retain the bulb."""
from pathlib import Path
import math, struct, subprocess, zlib
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/images'
N = 40000

def decode(name, fmt):
    return subprocess.check_output(['ffmpeg', '-v', 'error', '-i', str(OUT/name), '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', fmt, 'pipe:1'])

def png(path, data):
    def chunk(kind, payload):
        return struct.pack('>I', len(payload)) + kind + payload + struct.pack('>I', zlib.crc32(kind+payload)&0xffffffff)
    scan = b''.join(b'\0'+data[y*600:(y+1)*600] for y in range(200))
    path.write_bytes(b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR', struct.pack('>IIBBBBB',200,200,8,2,0,0,0))+chunk(b'IDAT',zlib.compress(scan))+chunk(b'IEND',b''))

raw = struct.unpack('<120000f', decode('pos-33.exr','gbrpf32le'))
g, b, r = [list(raw[i*N:(i+1)*N]) for i in range(3)]
colors = bytearray(decode('cd-33.png','rgb24'))
scales = bytearray(decode('sc-33.png','rgb24'))
for i in range(10000):
    # Coprime permutation keeps the first 7000 mobile instances spread over the full page.
    cell = (i*7919)%10000
    u, v = ((cell%100+.5)/100, (cell//100+.5)/100)
    x, y, z = (u-.5)*3.4, (v-.5)*4.8, .025*math.sin(u*math.pi)
    fold = u>.77 and v>.83 and (u-.77)/.23+(v-.83)/.17>1
    if fold:
        # Reflect the triangular corner over its diagonal, then lift it off the page.
        a, c = (u-.77)/.23, (v-.83)/.17
        x, y = (.77+(1-c)*.23-.5)*3.4, (.83+(1-a)*.17-.5)*4.8
        z += .12 + .26*(a+c-1)
    ink = False
    # Photo frame and stylised head/shoulders.
    if .10<u<.36 and .60<v<.88:
        ink = u<.12 or u>.34 or v<.62 or v>.86
        ink |= ((u-.23)/.064)**2+((v-.77)/.049)**2<1
        ink |= .62<v<.71 and abs(u-.23)<.10*math.sqrt(max(0,1-((v-.64)/.08)**2))
    # Header, labels and framed form fields.
    ink |= .43<u<.72 and .81<v<.84
    ink |= .43<u<.66 and .75<v<.765
    for row in [.65,.48,.31]:
        # Keep the upper field beside the photo; the lower fields span the page.
        left = .43 if row == .65 else .10
        ink |= left<u<left+.22 and row+.085<v<row+.115
        if left<u<.89 and row-.025<v<row+.065:
            ink |= u<left+.03 or u>.86 or v<row+.005 or v>row+.035
    for cx in [.13,.39,.65]:
        if abs(u-cx)<.028 and abs(v-.14)<.020:
            ink |= abs(u-cx)>.019 or abs(v-.14)>.012
        ink |= cx+.05<u<cx+.18 and abs(v-.14)<.006
    # Two grid cells across the diagonal make the large folded corner legible.
    crease_distance = ((u-.77)/.23+(v-.83)/.17-1) / math.hypot(1/.23,1/.17)
    crease = u>.75 and v>.81 and abs(crease_distance)<.01
    color = (64,83,109) if crease else ((214,190,147) if fold else ((4,30,66) if ink else (246,242,233)))
    j = (i//100)*200+i%100
    r[j],g[j],b[j] = .5+x/8.7,.5+y/8.7,.5+z/8.7
    colors[j*3:j*3+3] = bytes(color)
    scales[j*3:j*3+3] = bytes([90]*3)
# The former sphere is the same page, with identical particle identities.
for i in range(10000):
    j = (i//100)*200+i%100
    k = j+20000
    r[k],g[k],b[k] = r[j],g[j],b[j]
    colors[k*3:k*3+3] = colors[j*3:j*3+3]
    scales[k*3:k*3+3] = scales[j*3:j*3+3]
# Finale uses the same particle identities as both earlier pages.
for i in range(10000):
    j = (i//100)*200+i%100
    k = j+20100
    r[k],g[k],b[k] = r[j],g[j],b[j]
    colors[k*3:k*3+3] = colors[j*3:j*3+3]
    scales[k*3:k*3+3] = scales[j*3:j*3+3]
# Float planes preserve the unmodified banks exactly; use uncompressed EXR for the legacy decoder.
planes = struct.pack('<120000f',*(g+b+r))
subprocess.run(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','gbrpf32le','-s','200x200','-i','pipe:0','-frames:v','1','-compression','none',str(OUT/'hero-document-positions.exr')],input=planes,check=True)
png(OUT/'hero-document-colors.png',colors)
png(OUT/'hero-document-scales.png',scales)
print('Generated matching hero and stamp documents; finale document generated; bulb retained.')
