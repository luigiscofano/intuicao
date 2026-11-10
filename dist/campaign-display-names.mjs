/**
 * Revisões editoriais da apresentação. A chave e o nome de origem são conferidos
 * juntos para que uma futura fase ou importação nunca seja renomeada por engano.
 * Os catálogos, identificadores, respostas e saves permanecem intactos.
 */
const DISPLAY_NAMES = new Map([
  ['light-v7-spacious-017', ['Lados invertidos 001', 'Lados invertidos']],
  ['light-v7-spacious-019', ['A saída decide 023', 'A saída decide']],
  ['light-v5-portal-011', ['O salto que não cruza 011', 'O salto que não cruza']],
  ['light-v5-portal-012', ['A consequência distante 012', 'A consequência distante']],
  ['light-v5-portal-031', ['Lados invertidos 031', 'Lados invertidos']],
  ['light-v7-spacious-030', ['O salto que não cruza 003', 'O salto que não cruza']],
  ['light-v7-spacious-053', ['A volta pelo acesso útil 875', 'A volta pelo acesso útil']],
  ['light-v7-spacious-054', ['O salto que não cruza 017', 'O salto que não cruza']],
  ['light-v7-spacious-065', ['A saída decide 931', 'A saída decide']],
  ['light-v7-spacious-073', ['Uma hipótese, três consequências 034', 'Uma hipótese, três consequências']]
]);

export function displayCampaignName(level) {
  const revision = DISPLAY_NAMES.get(level?.id);
  return revision && revision[0] === level.name ? revision[1] : level?.name ?? '';
}
