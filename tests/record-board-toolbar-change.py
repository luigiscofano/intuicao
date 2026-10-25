import hashlib,json,pathlib,difflib,subprocess
root=pathlib.Path(__file__).resolve().parents[1]
base='53784447416fe62e35cc26ece6b9ec71ea418fcd'
sha=lambda s:hashlib.sha256(s.encode()).hexdigest()
touch=json.loads((root/'tests/toolbar-touch-authorized-change.json').read_text())
files={}
for name in ['collection-ui.mjs','index.html','style.css']:
 before=subprocess.check_output(['git','show',f'{base}:dist/{name}'],cwd=root).decode()
 if name=='style.css':before+=touch['append'];assert sha(before)==touch['afterSha256']
 after=(root/'dist'/name).read_text();a,b=before.splitlines(keepends=True),after.splitlines(keepends=True)
 for n in [3,6,12,24,len(a)+len(b)]:
  blocks=[{'before':''.join(a[g[0][1]:g[-1][2]]),'after':''.join(b[g[0][3]:g[-1][4]])} for g in difflib.SequenceMatcher(None,a,b,autojunk=False).get_grouped_opcodes(n)]
  if all(x['before'] and x['after'] and before.count(x['before'])==1 and after.count(x['after'])==1 for x in blocks):break
 restored=after
 for x in reversed(blocks):assert restored.count(x['after'])==1;restored=restored.replace(x['after'],x['before'])
 assert restored==before
 files[name]={'beforeSha256':sha(before),'afterSha256':sha(after),'blocks':blocks}
(root/'tests/board-toolbar-authorized-change.json').write_text(json.dumps({'baseCommit':base,'priorLayer':'toolbar-touch','scope':'Move unchanged action sequence immediately before the map and align right; remove only the global PACTO Values and Candidates button; increase both shared hint IDs to16px/1.55. Preserve local palette, keyboard/candidate data, rules, gameplay and saves.','files':files},ensure_ascii=False,indent=2)+'\n')
