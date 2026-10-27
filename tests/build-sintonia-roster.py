"""Clip all 16 animals from the approved sheet without rewriting its PNG."""
import base64
import hashlib
import json
import re
import sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

root = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1])
raw = source.read_bytes()
pixels = np.array(Image.open(source).convert('RGBA'))
assert pixels.shape == (1254, 1254, 4)
names = ['tuiuiu','capivara','bemtevi','mico','tamandua','onca','lobo','coral',
         'jacare','tatu','arara','anta','piranha','tucano','macaco','quati']
old_svg = (root/'dist/sintonia/assets/chibi-user-atlas.svg').read_text()
old_paths = dict(re.findall(r'<path data-animal="([a-z]+)" d="([^"]+)"/>', old_svg))
clips, records = [], []

for frame, animal in enumerate(names):
    row, col = divmod(frame, 4)
    x0, y0 = round(col*313.5)+7, round(row*313.5)+7
    x1, y1 = round((col+1)*313.5)-7, round((row+1)*313.5)-7
    if frame < 4:
        # The old top-row masks already preserve plumage and white eye details.
        path = old_paths[animal]
    else:
        patch = pixels[y0:y1,x0:x1]
        foreground = (patch[:,:,:3].min(axis=2)<235)&(patch[:,:,3]>0)
        labels, count = ndimage.label(foreground,np.ones((3,3)))
        sizes = np.bincount(labels.ravel());sizes[0]=0
        mask = ndimage.binary_fill_holes(labels==sizes.argmax())
        # Exact integer-coordinate clip rectangles, not repainted pixel art.
        rectangles=[];active={}
        for y,line in enumerate(mask):
            padded=np.r_[False,line,False].astype(int)
            starts=np.flatnonzero(np.diff(padded)==1)
            ends=np.flatnonzero(np.diff(padded)==-1)
            current={}
            for start,end in zip(starts,ends):
                key=(int(start+x0),int(end-start))
                if key in active:
                    rect=active.pop(key);rect[3]+=1
                else:rect=[key[0],y+y0,key[1],1]
                current[key]=rect
            rectangles.extend(active.values());active=current
        rectangles.extend(active.values())
        path=''.join(f'M{x} {y}h{w}v{h}h-{w}z' for x,y,w,h in rectangles)
    rects=[tuple(map(int,m)) for m in re.findall(r'M(\d+) (\d+)h(\d+)v(\d+)h-\d+z',path)]
    records.append({'animal':animal,'frame':frame,'visibleBounds':[min(x for x,y,w,h in rects),min(y for x,y,w,h in rects),max(x+w for x,y,w,h in rects),max(y+h for x,y,w,h in rects)],'visibleSourcePixels':sum(w*h for x,y,w,h in rects)})
    clips.append(f'<path data-animal="{animal}" d="{path}"/>')

svg='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1254" height="1254" viewBox="0 0 1254 1254"><defs><clipPath id="animals">'+''.join(clips)+'</clipPath></defs><image width="1254" height="1254" style="image-rendering:pixelated" clip-path="url(#animals)" xlink:href="data:image/png;base64,'+base64.b64encode(raw).decode()+'"/></svg>\n'
target=root/'dist/sintonia/assets/chibi-user-roster.svg'
target.write_text(svg)
provenance={'sourceFilename':source.name,'sourceLibraryFileId':'libfile_c8e90fb42ca48191bdd126cc3f7638bc','sourceSHA256':hashlib.sha256(raw).hexdigest(),'sourceSize':[1254,1254],'asset':str(target.relative_to(root)),'assetSHA256':hashlib.sha256(svg.encode()).hexdigest(),'method':'Original attached PNG embedded unchanged once; SVG clipping selects all 16 original silhouettes. No resampling, repainting or substituted artwork.','animals':records}
(root/'docs/sintonia-sprites/roster-sources.json').write_text(json.dumps(provenance,ensure_ascii=False,indent=2)+'\n')
print('Packaged the 16 exact animals from the attached sheet.')
