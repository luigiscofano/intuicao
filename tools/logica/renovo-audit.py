"""Recertifica RENOVO e a dependência de cruzamentos nas 35 fases finais."""
import hashlib
import importlib.util
import json
from pathlib import Path

BASE = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('renovo_generator', Path(__file__).with_name('renovo-generate.py'))
generator = importlib.util.module_from_spec(spec)
spec.loader.exec_module(generator)
source = (BASE / 'dist/logica/games/renovo/campaign.mjs').read_text()
levels = json.loads(source.split('export const CAMPAIGN = ', 1)[1].rsplit(';', 1)[0])
certificate = json.loads((BASE / 'tests/logica/renovo-certificates.json').read_text())

def count_without_crossing(pieces, width, height):
    """Contrafactual: mantém primeira peça/ângulo/uso único e retira interseções."""
    count = 0
    def visit(domains):
        nonlocal count
        if any(not options for options in domains.values()):
            return
        if not domains:
            count += 1
            return
        bud = min(domains, key=lambda item: len(domains[item]))
        for seed, _, leaf in domains[bud]:
            rest = {other: [trio for trio in options if trio[0] != seed and trio[2] != leaf]
                    for other, options in domains.items() if other != bud}
            visit(rest)
    visit(generator.candidates(pieces, width, height))
    return count

assert len(levels) == 80
fingerprints = set()
for number, (level, record) in enumerate(zip(levels, certificate['levels']), 1):
    definition = {key: level[key] for key in ['width', 'height', 'pieces']}
    digest = hashlib.sha256(json.dumps(definition, sort_keys=True, separators=(',', ':')).encode()).hexdigest()
    assert digest == record['definition_sha256']
    assert level['id'] == record['id'] == 'renovo-' + digest[:16]
    assert level['number'] == number and level['version'] == 1
    pieces = {int(key): value for key, value in level['pieces'].items()}
    width, height = level['width'], level['height']
    solutions, _ = generator.exact_solutions(pieces, width, height)
    assert len(solutions) == 1 and sorted(solutions[0]) == sorted(map(tuple, level['solution']))
    human = generator.human_trace(pieces, width, height)
    assert human and human['solved']
    assert human['trace'] == record['trace']
    assert all(record['metrics'][key] == value for key, value in human['metrics'].items())
    fingerprint = generator.fingerprint(pieces, width, height)
    assert fingerprint == record['fingerprint'] and fingerprint not in fingerprints
    fingerprints.add(fingerprint)
    count = count_without_crossing(pieces, width, height)
    assert count == record['without_crossing_solutions']
    if level['difficulty'] >= 3:
        assert count > 1 and record['metrics']['mandatory_segment_steps'] > 0
    if level['difficulty'] >= 4:
        assert record['metrics']['conditional_segment_steps'] > 0
    if level['difficulty'] == 5:
        assert record['metrics']['conditional_dependency_depth'] >= 2
assert [sum(level['difficulty'] == band for level in levels) for band in range(6)] == [15, 15, 15, 15, 15, 5]
print('RENOVO: 80/80 únicas; últimas 35 têm duas soluções ao retirar cruzamentos; trilhas e hashes conferidos.')
