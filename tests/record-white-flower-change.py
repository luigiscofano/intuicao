import hashlib,json,pathlib,difflib
root=pathlib.Path(__file__).resolve().parents[1]
sha=lambda b:hashlib.sha256(b).hexdigest()
before=(root/'../../white-flower-reference/platform-before.css').read_text()
after=(root/'dist/platform.css').read_text()
old=next(l for l in before.splitlines() if 'button[aria-pressed=true]::after{content:' in l)
new=next(l for l in after.splitlines() if 'button[aria-pressed=true]::after{content:' in l)
removed=next(l+'\n' for l in before.splitlines() if 'button[aria-pressed=true]::before{content:' in l)
anchor=''.join(before.split(removed)[1].splitlines(keepends=True)[:2])
assert before.count(old)==before.count(removed)==1
assert before.replace(old,new).replace(removed,'')==after
prior=json.loads((root/'tests/reference-flowers-authorized-change.json').read_text())
assert sha(before.encode())==prior['afterCssSHA256']
m=dict(purpose='Move original white flower to the active card top-right green-flower position, add a fine green alpha contour, and remove its lower duplicate. No other decorations or game styles change.',priorCssSHA256=sha(before.encode()),afterCssSHA256=sha(after.encode()),replacements=[dict(before=old,after=new)],removals=[dict(text=removed,beforeAnchor=anchor)],assets=prior['assets'])
(root/'tests/white-flower-authorized-change.json').write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n')
