"""Package unchanged 32-cell PNGs as clipped SVG assets (no raster rewriting)."""
import base64
import hashlib
import json
import sys
from collections import deque
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
sources = json.loads((root / 'docs/sintonia-sprites/roster-sources.json').read_text())
output = root / 'dist/sintonia/assets/roster'
output.mkdir(parents=True, exist_ok=True)
for source in sources:
    path = Path(sys.argv[1]) / source['name']
    raw = path.read_bytes()
    im = Image.open(path).convert('RGB')
    assert im.size == (512, 512)
    cells = {(x, y) for y in range(32) for x in range(32)}
    ink = {(x, y) for x, y in cells if im.getpixel((x * 16, y * 16)) != (255, 255, 255)}
    # The main connected silhouette excludes isolated decorative floor flecks.
    parts = []
    while ink:
        part = {ink.pop()}
        queue = deque(part)
        while queue:
            x, y = queue.popleft()
            for dx, dy in [(a,b) for a in (-1,0,1) for b in (-1,0,1) if a or b]:
                p = (x + dx, y + dy)
                if p in ink:
                    ink.remove(p); part.add(p); queue.append(p)
        parts.append(part)
    silhouette = max(parts, key=len)
    # Keep enclosed white eyes and plumage; clip only the outside/background.
    outside = {p for p in cells - silhouette if p[0] in (0,31) or p[1] in (0,31)}
    queue = deque(outside)
    while queue:
        x, y = queue.popleft()
        for dx, dy in [(1,0),(-1,0),(0,1),(0,-1)]:
            p = (x + dx, y + dy)
            if p in cells and p not in silhouette and p not in outside:
                outside.add(p); queue.append(p)
    visible = cells - outside
    commands = []
    for y in range(32):
        x = 0
        while x < 32:
            if (x,y) not in visible:
                x += 1; continue
            start = x
            while x < 32 and (x,y) in visible: x += 1
            width = (x-start)*16
            commands.append(f'M{start*16} {y*16}h{width}v16h-{width}z')
    xs, ys = zip(*visible)
    dx, dy = 256-(min(xs)+max(xs)+1)*8, 256-(min(ys)+max(ys)+1)*8
    encoded = base64.b64encode(raw).decode()
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" viewBox="0 0 512 512"><defs><clipPath id="animal"><path d="{"".join(commands)}"/></clipPath></defs><g transform="translate({dx} {dy})"><image width="512" height="512" style="image-rendering:pixelated" clip-path="url(#animal)" xlink:href="data:image/png;base64,{encoded}"/></g></svg>\n'
    target = output / source['name'].replace('(1).png','.svg')
    target.write_text(svg)
    source['sourceSHA256'] = hashlib.sha256(raw).hexdigest()
    source['asset'] = str(target.relative_to(root))
    source['assetSHA256'] = hashlib.sha256(svg.encode()).hexdigest()
    source['visibleCells'] = len(visible)
(root / 'docs/sintonia-sprites/roster-sources.json').write_text(json.dumps(sources, ensure_ascii=False, indent=2)+'\n')
print(f'Packaged {len(sources)} unchanged PNGs in SVG wrappers.')
