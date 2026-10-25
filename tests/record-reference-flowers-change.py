import hashlib,json,pathlib,subprocess
root=pathlib.Path(__file__).resolve().parents[1]
sha=lambda s:hashlib.sha256(s).hexdigest()
before=(root/'../../flower-reference-v2/platform-before.css').read_text()
after=(root/'dist/platform.css').read_text()
marker='\n/* Original owner-provided flowers:'
base,append=after.split(marker)
append=marker+append
bl=before.splitlines(keepends=True);al=base.splitlines(keepends=True)
assert len(bl)==len(al)
changes=[dict(before=b.rstrip('\n'),after=a.rstrip('\n')) for b,a in zip(bl,al) if a!=b]
assert len(changes)==1
assert before.replace(changes[0]['before'],changes[0]['after'])+append==after
assets=[]
for color,time in [('green','014508'),('white','014509')]:
 source=root/f'../../flower-reference-v2/image(20261025-{time}).png';target=root/f'dist/platform-assets/flower-{color}-original.png'
 assert source.read_bytes()==target.read_bytes()
 assets.append(dict(file=str(target.relative_to(root/'dist')),sha256=sha(target.read_bytes()),referenceFileName=source.name,referenceSHA256=sha(source.read_bytes())))
preserved={}
for name in subprocess.check_output(['git','ls-tree','-r','--name-only','HEAD','dist'],cwd=root,text=True).splitlines():
 if name=='dist/platform.css':continue
 preserved[name]=sha(subprocess.check_output(['git','show','HEAD:'+name],cwd=root))
m=dict(purpose='Use the two original owner-provided transparent PNG flowers, replacing the active flower and adding passive section accents without changing game logic or geometry.',priorCssSHA256=sha(before.encode()),afterCssSHA256=sha(after.encode()),replacements=changes,append=append,assets=assets,preservedDistSHA256=preserved)
(root/'tests/reference-flowers-authorized-change.json').write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n')
