"""Record only the authorized JSON/mode/history/toolbar/check-spacing layer.
Historical manifests are never rebased. Run after source is frozen.
"""
import hashlib,json,pathlib,difflib,subprocess
root=pathlib.Path(__file__).resolve().parents[1]
base='1f6c0bc7d67599ded7e8da227f92aa6435f42f6d'
sha=lambda text:hashlib.sha256(text.encode()).hexdigest()
files={}
for name in ['app.mjs','collection-ui.mjs','index.html','style.css']:
    before=subprocess.check_output(['git','show',f'{base}:dist/{name}'],cwd=root).decode()
    after=(root/'dist'/name).read_text()
    old,new=before.splitlines(keepends=True),after.splitlines(keepends=True)
    for context in [3,6,12,24,len(old)+len(new)]:
        blocks=[]
        for group in difflib.SequenceMatcher(None,old,new,autojunk=False).get_grouped_opcodes(context):
            blocks.append({'before':''.join(old[group[0][1]:group[-1][2]]),'after':''.join(new[group[0][3]:group[-1][4]])})
        if all(b['before'] and b['after'] and before.count(b['before'])==1 and after.count(b['after'])==1 for b in blocks):break
    restored=after
    for b in reversed(blocks):
        assert restored.count(b['after'])==1,(name,'reverse uniqueness')
        restored=restored.replace(b['after'],b['before'])
    assert restored==before,name
    files[name]={'beforeSha256':sha(before),'afterSha256':sha(after),'blocks':blocks}
newfiles=['level-json-common.mjs','collection-json.mjs','collection-json-worker.mjs','original-json.mjs','IMPORTAR-NIVEIS-JSON.md']+[f'json-examples/{g}.json' for g in ['light','cut','elo','prumo','pacto','desvio']]
manifest={'baseCommit':base,'scope':'Authorized local JSON import in all six games; remove Continue/Tutorial entry buttons and title suffix words only; direct Endless preserving sessions; final toolbar undo/redo/reset/rules/advanced; bounded ephemeral original-game history; smaller idle check-button gap for ELO/PRUMO/PACTO. No campaign or rule engine replacement. Separate About/flower layers are not included.','files':files,'newFilesSha256':{name:sha((root/'dist'/name).read_text()) for name in newfiles}}
(root/'tests/json-import-authorized-change.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
