"""Record only the current three-file ELO explanations layer above 0866506."""
import hashlib,json,pathlib,difflib,subprocess
root=pathlib.Path(__file__).resolve().parents[1]
base='0866506cb924eab8031cc4ec7e700f532348a63f'
sha=lambda s:hashlib.sha256(s.encode()).hexdigest()
files={}
for name in ['elo-presentation.mjs','collection-ui.mjs','style.css']:
 before=subprocess.check_output(['git','show',f'{base}:dist/{name}'],cwd=root).decode();after=(root/'dist'/name).read_text();a,b=before.splitlines(keepends=True),after.splitlines(keepends=True)
 for n in [3,6,12,24,len(a)+len(b)]:
  blocks=[{'before':''.join(a[g[0][1]:g[-1][2]]),'after':''.join(b[g[0][3]:g[-1][4]])} for g in difflib.SequenceMatcher(None,a,b,autojunk=False).get_grouped_opcodes(n)]
  if all(x['before'] and x['after'] and before.count(x['before'])==1 and after.count(x['after'])==1 for x in blocks):break
 restored=after
 for x in reversed(blocks):assert restored.count(x['after'])==1;restored=restored.replace(x['after'],x['before'])
 assert restored==before
 files[name]={'beforeSha256':sha(before),'afterSha256':sha(after),'blocks':blocks}
(root/'tests/elo-explanations-authorized-change.json').write_text(json.dumps({'baseCommit':base,'scope':'ELO only: preserve public clue codes and add concrete Portuguese explanations in rules sidebar with independent show/hide control; no answer/solver/rules/data/board/save changes.','files':files},ensure_ascii=False,indent=2)+'\n')
