import hashlib, json, pathlib
root = pathlib.Path(__file__).resolve().parents[1]
sha = lambda b: hashlib.sha256(b).hexdigest()
before = (root / '../../ingame-flower-reference/platform-before.css').read_text()
after = (root / 'dist/platform.css').read_text()
prior = json.loads((root / 'tests/stemless-flower-authorized-change.json').read_text())
assert sha(before.encode()) == prior['afterCssSHA256']
selector = '#main > .games > button[aria-pressed=true]'
anchor_before = next(line for line in before.splitlines() if line.startswith(selector + '{'))
anchor_after = anchor_before.replace('{', '{position:relative;', 1)
flower_before = prior['replacements'][0]['after']
prefix = ':where(body:not(:has(.lab:not([hidden]), #collection:not([hidden]) > .collection-lab))) '
assert flower_before.startswith(prefix + selector + '::after{')
flower_after = flower_before.removeprefix(prefix)
replacements = [dict(before=anchor_before, after=anchor_after), dict(before=flower_before, after=flower_after)]
restored = before
for replacement in replacements:
    assert restored.count(replacement['before']) == 1
    restored = restored.replace(replacement['before'], replacement['after'])
assert restored == after
manifest = dict(purpose='Keep the authorized stemless white flower with its green contour on the active navigation button inside all six games, free mode and editor. Remove only its menu-state guard and anchor it to the active button; preserve every other platform CSS byte.', priorCssSHA256=sha(before.encode()), afterCssSHA256=sha(after.encode()), replacements=replacements, assets=prior['assets'])
(root / 'tests/ingame-flower-authorized-change.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
