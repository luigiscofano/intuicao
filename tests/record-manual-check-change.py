"""Record exact user-authorized manual-check edits without rewriting old baselines."""
from pathlib import Path
import subprocess,json,hashlib,difflib
root=Path(__file__).resolve().parent.parent
base='842865d'
sha=lambda b:hashlib.sha256(b).hexdigest()
changes={}
for name in ['collection-ui.mjs','pacto-check.mjs','style.css']:
 old=subprocess.check_output(['git','show',base+':dist/'+name],cwd=root);current=(root/'dist'/name).read_bytes()
 entry={'beforeSha256':sha(old),'afterSha256':sha(current)}
 if current.startswith(old):entry['append']=current[len(old):].decode()
 else:
  a,b=old.decode().splitlines(keepends=True),current.decode().splitlines(keepends=True);blocks=[]
  for group in difflib.SequenceMatcher(None,a,b,autojunk=False).get_grouped_opcodes(1):
   before=''.join(a[group[0][1]:group[-1][2]]);after=''.join(b[group[0][3]:group[-1][4]])
   assert after and current.decode().count(after)==1,name
   blocks.append({'before':before,'after':after})
  entry['blocks']=blocks
 changes[name]=entry
(root/'tests/manual-check-authorized-change.json').write_text(json.dumps({'baseCommit':base,'scope':'Checar for ELO/PRUMO and red/green board borders for ELO/PRUMO/PACTO. Alternative valid solutions accepted. Engines and historical baselines unchanged.','files':changes},ensure_ascii=False,indent=2)+'\n')
