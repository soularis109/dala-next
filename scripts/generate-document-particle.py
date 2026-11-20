"""Write public/models/document-particle.glb: one tiny sheet of paper with a folded top-right corner.

Used as the instanced particle geometry (replaces the pyramid py-lod7/py-monbile for the main cloud),
so the big document is built out of many small documents. Two-sided (front + back faces).
"""
from pathlib import Path
import json, struct

OUT = Path(__file__).resolve().parents[1] / 'public/models/document-particle.glb'
S = 1.7                      # overall size, comparable with the pyramid (~1.1 across)
W, H, C = 0.78 * S, 1.0 * S, 0.30 * S   # sheet width, height, size of the cut corner
hw, hh = W / 2, H / 2

# Page outline (counter-clockwise, seen from +z) with the top-right corner cut off.
outline = [(-hw, -hh), (hw, -hh), (hw, hh - C), (hw - C, hh), (-hw, hh)]
# Folded flap: the cut triangle mirrored over its diagonal and lifted a little off the page.
flap = [(hw - C, hh), (hw, hh - C), (hw - C, hh - C)]
LIFT = 0.0

pos, nrm, uv, idx = [], [], [], []


def add_poly(points, z, flip=False, zs=None):
    base = len(pos)
    for k, (x, y) in enumerate(points):
        zz = zs[k] if zs else z
        # The engine's look-at rotation (calcLookAtMatrix) aims the model's +Z axis at the camera,
        # so the sheet lies in XY with its normal along +/-Z.
        pos.append((x, y, zz if not flip else -zz))
        nrm.append((0, 0, -1 if flip else 1))
        uv.append(((x + hw) / W, (y + hh) / H))
    for k in range(1, len(points) - 1):
        tri = (base, base + k, base + k + 1)
        idx.extend(tri[::-1] if flip else tri)


for flip in (False, True):
    add_poly(outline, 0.0, flip)
    # Flap: its fold edge sits on the page, the free corner is lifted.
    add_poly(flap, 0.0, flip, zs=[0.0, 0.0, LIFT])

pos_b = b''.join(struct.pack('<3f', *p) for p in pos)
nrm_b = b''.join(struct.pack('<3f', *n) for n in nrm)
uv_b = b''.join(struct.pack('<2f', *t) for t in uv)
idx_b = b''.join(struct.pack('<H', i) for i in idx)
idx_b += b'\0' * (-len(idx_b) % 4)
blob = pos_b + nrm_b + uv_b + idx_b
xs, ys, zs_ = [p[0] for p in pos], [p[1] for p in pos], [p[2] for p in pos]

doc = {
    'asset': {'generator': 'document particle generator', 'version': '2.0'},
    'scene': 0, 'scenes': [{'nodes': [0]}],
    'nodes': [{'mesh': 0, 'name': 'document-particle'}],
    'meshes': [{'name': 'document-particle-mesh', 'primitives': [{'attributes': {'POSITION': 0, 'NORMAL': 1, 'TEXCOORD_0': 2}, 'indices': 3}]}],
    'accessors': [
        {'bufferView': 0, 'componentType': 5126, 'count': len(pos), 'type': 'VEC3', 'min': [min(xs), min(ys), min(zs_)], 'max': [max(xs), max(ys), max(zs_)]},
        {'bufferView': 1, 'componentType': 5126, 'count': len(pos), 'type': 'VEC3'},
        {'bufferView': 2, 'componentType': 5126, 'count': len(pos), 'type': 'VEC2'},
        {'bufferView': 3, 'componentType': 5123, 'count': len(idx), 'type': 'SCALAR'},
    ],
    'bufferViews': [
        {'buffer': 0, 'byteOffset': 0, 'byteLength': len(pos_b), 'target': 34962},
        {'buffer': 0, 'byteOffset': len(pos_b), 'byteLength': len(nrm_b), 'target': 34962},
        {'buffer': 0, 'byteOffset': len(pos_b) + len(nrm_b), 'byteLength': len(uv_b), 'target': 34962},
        {'buffer': 0, 'byteOffset': len(pos_b) + len(nrm_b) + len(uv_b), 'byteLength': len(idx) * 2, 'target': 34963},
    ],
    'buffers': [{'byteLength': len(blob)}],
}
j = json.dumps(doc, separators=(',', ':')).encode()
j += b' ' * (-len(j) % 4)
glb = struct.pack('<4sII', b'glTF', 2, 12 + 8 + len(j) + 8 + len(blob))
glb += struct.pack('<I4s', len(j), b'JSON') + j + struct.pack('<I4s', len(blob), b'BIN\0') + blob
OUT.write_bytes(glb)
print(f'Wrote {OUT.name}: {len(pos)} vertices, {len(idx) // 3} triangles, {len(glb)} bytes')
