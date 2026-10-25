"""Record only exact user-authorized hint/rule/status edits; retain all baselines."""
from pathlib import Path
import subprocess,json,hashlib,difflib
root=Path(__file__).resolve().parent.parent
base='40e0ba6';sha=lambda b:hashlib.sha256(b).hexdigest();changes={}
for name in ['app.mjs','collection-ui.mjs','index.html']:
 old=subprocess.check_output(['git','show',base+':dist/'+name],cwd=root);current=(root/'dist'/name).read_bytes();entry={'beforeSha256':sha(old),'afterSha256':sha(current)}
 a,b=old.decode().splitlines(keepends=True),current.decode().splitlines(keepends=True);blocks=[]
 for group in difflib.SequenceMatcher(None,a,b,autojunk=False).get_grouped_opcodes(1):
  before=''.join(a[group[0][1]:group[-1][2]]);after=''.join(b[group[0][3]:group[-1][4]])
  assert after and current.decode().count(after)==1,name
  blocks.append({'before':before,'after':after})
 entry['blocks']=blocks;changes[name]=entry
(root/'tests/rules-sidebar-authorized-change.json').write_text(json.dumps({'baseCommit':base,'scope':'Rules toggle retained above boards, content in reserved responsive sidebar; auto-open for actual introductory mechanics only. No engines, campaigns, hints or progress changes.','files':changes},ensure_ascii=False,indent=2)+'\n')
