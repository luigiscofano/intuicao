"""Record only the ELO-authorized exact changes, retaining every historical baseline."""
from pathlib import Path
import subprocess,json,hashlib,difflib
root=Path(__file__).resolve().parent.parent
manifest=json.loads((root/'tests/elo-v3-baseline-sha256.json').read_text())
base=manifest['baseCommit']; sha=lambda b:hashlib.sha256(b).hexdigest()
allowed={'collection-ui.mjs','direct-actions.mjs','direct-hints.mjs','geometry-games.mjs','geometry-levels.mjs','geometry-answers.mjs','style.css'}
changes={}
for path,oldhash in manifest['sha256'].items():
 current=(root/path).read_bytes()
 if sha(current)==oldhash: continue
 name=path.removeprefix('dist/')
 if name not in allowed: raise RuntimeError('Outside authorized ELO scope: '+path)
 old=subprocess.check_output(['git','show',base+':'+path],cwd=root)
 entry={'beforeSha256':sha(old),'afterSha256':sha(current)}
 if current.startswith(old): entry['append']=current[len(old):].decode()
 else:
  a,b=old.decode().splitlines(keepends=True),current.decode().splitlines(keepends=True)
  blocks=[]
  for group in difflib.SequenceMatcher(None,a,b,autojunk=False).get_grouped_opcodes(1):
   before=''.join(a[group[0][1]:group[-1][2]]); after=''.join(b[group[0][3]:group[-1][4]])
   if not after or current.decode().count(after)!=1: raise RuntimeError('Need stronger exact patch context for '+name)
   blocks.append({'before':before,'after':after})
  entry['blocks']=blocks
 changes[name]=entry
result={'baseCommit':base,'scope':'ELO only: new campaign, restrictions, hints, presentation and non-destructive progress migration. Other games and the platform are preserved.','files':changes}
(root/'tests/elo-v3-authorized-change.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print('Recorded',len(changes),'exact ELO file changes; historical baselines were not modified.')
