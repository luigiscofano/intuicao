"""Recertifica a campanha pronta de FOZ; não depende de pools intermediários."""
import hashlib
import importlib.util
import json
from pathlib import Path

BASE = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('foz_generator', Path(__file__).with_name('foz-generate.py'))
generator = importlib.util.module_from_spec(spec)
spec.loader.exec_module(generator)
source = (BASE / 'dist/logica/games/foz/campaign.mjs').read_text()
levels = json.loads(source.split('export const CAMPAIGN = ', 1)[1].rsplit(';', 1)[0])
certificate = json.loads((BASE / 'tests/logica/foz-certificates.json').read_text())
assert len(levels) == 80
fingerprints = set()
for number, (level, record) in enumerate(zip(levels, certificate['levels']), 1):
    definition = {key: level[key] for key in ['width', 'height', 'root', 'channels', 'clues']}
    digest = hashlib.sha256(json.dumps(definition, sort_keys=True, separators=(',', ':')).encode()).hexdigest()
    assert digest == record['definition_sha256']
    assert level['id'] == record['id'] == 'foz-' + digest[:16]
    assert level['number'] == number and level['version'] == 1
    solutions, _ = generator.solve(definition)
    assert len(solutions) == 1 and solutions[0] == level['solution']
    human = generator.human_trace(definition)
    assert human and human['solved'] and human['solution'] == level['solution']
    assert human['trace'] == record['trace'] and human['metrics'] == record['metrics']
    fingerprint = generator.fingerprint(definition)
    assert fingerprint == record['fingerprint'] and fingerprint not in fingerprints
    fingerprints.add(fingerprint)
assert [sum(level['difficulty'] == band for level in levels) for band in range(6)] == [15, 15, 15, 15, 15, 5]
print('FOZ: 80/80 soluções únicas, trilhas reproduzidas, hashes e simetrias conferidos.')
