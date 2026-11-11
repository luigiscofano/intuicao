// Cada pictograma preserva a ação da conquista dentro da roseta aprovada.
// A moldura é compartilhada pelos cartões e pelos avisos de descoberta.
const ICON_DRAWINGS = {
  "light-light-jump": `<ellipse cx="15" cy="31" rx="7" ry="20" class="ai-tint"/><ellipse cx="49" cy="31" rx="7" ry="20" class="ai-tint"/><path d="M3 45h12l8-26 12 26 14-26h12M18 15l10 8M30 49l10-8M44 15l10 8"/><circle cx="59" cy="19" r="3" class="ai-accent"/>`,
  "prumo-unlikely-balance": `<path d="M5 22h18v-9h12v22h24v9H5Z" class="ai-tint"/><path d="m30 46-9 13h18Z" class="ai-accent"/><path d="M9 50h9M43 50h12M30 26v13"/><circle cx="30" cy="42" r="3" class="ai-fill"/>`,
  "pacto-quartet": `<circle cx="14" cy="14" r="7" class="ai-tint"/><circle cx="14" cy="34" r="7" class="ai-tint"/><path d="m33 7 7 14H26Zm0 20 7 14H26Z" class="ai-accent"/><path d="m51 9 6 6-6 6-6-6Zm0 20 6 6-6 6-6-6Z" class="ai-fill"/><path d="M9 48h11v11H9Zm21 0h11v11H30ZM14 22v4M33 22v4M51 22v5M21 53h8M44 53h13l-5-5m5 5-5 5"/>`,
  "sintonia-baton-pass": `<path d="M6 49h20V15h30v34H38" class="ai-tint"/><path d="M27 15v34M43 22v20M3 34h18m-6-6 6 6-6 6M34 34h26m-6-6 6 6-6 6"/><circle cx="10" cy="20" r="5" class="ai-fill"/><circle cx="42" cy="54" r="5" class="ai-accent"/>`,
  "repasse-chain-inheritance": `<path d="M4 12h15v15H4Zm21 12h15v15H25Zm20 12h15v15H45Z" class="ai-tint"/><path d="M11 19h12v12h21v12h12M56 54v6H7M17 56l-6 4 6 4"/><circle cx="11" cy="19" r="3" class="ai-fill"/><circle cx="33" cy="31" r="3" class="ai-accent"/>`,
  "cerco-last-exit": `<path d="M8 8h48v48H38M8 8v48h16M16 16h32v32H34M16 16v32h10M24 24h16v16H24Z"/><path d="M32 32v29m-5-6 5 6 5-6" class="ai-highlight"/><circle cx="32" cy="32" r="4" class="ai-fill"/><path d="M7 61h3m5 0h3m5 0h3"/>`,
  "precision-first-try": `<path d="M7 48h25V19h10"/><path d="m47 8 4 10 11 1-9 7 3 11-9-6-10 6 3-11-9-7 11-1Z" class="ai-accent"/><path d="m8 36 7-6v26M9 56h12"/>`,
  "precision-three-first-tries": `<path d="M5 48h54M10 41V18h10v23M27 41V10h10v31M44 41V18h10v23" class="ai-tint"/><path d="m11 29 3 3 5-7m10-4 3 3 5-7m9 12 3 3 5-7" class="ai-highlight"/><path d="M12 56h40"/>`,
  "sintonia-four-command-plan": `<path d="M7 56V44h12V32h12V20h12V8h14v48Z" class="ai-tint"/><path d="M10 52h9V40h12V28h12V16h11m-5-5 5 5-5 5" class="ai-highlight"/>`,
  "efficiency-proven-minimum": `<path d="M9 47V15h46v32H9" stroke-dasharray="3 5"/><path d="M9 47h46m-7-7 7 7-7 7"/><circle cx="9" cy="47" r="5" class="ai-fill"/><circle cx="55" cy="47" r="5" class="ai-accent"/><path d="m25 27 6 6 12-14" class="ai-highlight"/>`,
  "orbita-personal-best": `<path d="M6 50V14h17v20h18V14h17v36" stroke-dasharray="3 4"/><path d="M6 50h52m-7-7 7 7-7 7"/><circle cx="6" cy="50" r="4" class="ai-fill"/><path d="M25 8h11v8H25Zm0 19h11v8H25Z" class="ai-accent"/>`,
  "efficiency-clean-plan": `<path d="M12 49V18q0-9 9-9h22q9 0 9 9v28q0 9-9 9H23q-8 0-8-8t8-8h16V25H25v8" class="ai-tint"/><path d="m22 29 3 4 4-4M35 21l4 4 4-4" class="ai-highlight"/><circle cx="12" cy="49" r="3" class="ai-accent"/>`,
  "cut-millimetric-eye": `<path d="M7 32q25-30 50 0-25 30-50 0Z" class="ai-tint"/><circle cx="32" cy="32" r="10"/><path d="M32 4v56M25 9h14M25 55h14M13 28v8M51 28v8"/><circle cx="32" cy="32" r="3" class="ai-accent"/>`,
  "repasse-arrival-account": `<path d="M6 8v16l26 14M32 8v30M58 8v16L32 38M16 42h32v16H16Z" class="ai-tint"/><path d="M32 38v12m-5-6 5 6 5-6"/><circle cx="6" cy="8" r="4" class="ai-fill"/><circle cx="32" cy="8" r="4" class="ai-accent"/><circle cx="58" cy="8" r="4" class="ai-fill"/>`,
  first: `
    <path d="M32 53V29M32 38C16 40 12 29 13 22c13-1 20 5 19 16Z" class="ai-tint"/>
    <path d="M32 29C31 16 40 11 51 13c0 11-7 18-19 16Z" class="ai-fill"/>
    <path d="M20 54h24M12 8v8M8 12h8M48 39v8M44 43h8" class="ai-highlight"/>
  `,
  ten: `
    <path d="M10 51c0-14 13-14 13-24S40 16 51 8" stroke-dasharray="3 5"/>
    <ellipse cx="12" cy="48" rx="7" ry="4" class="ai-tint"/>
    <ellipse cx="24" cy="31" rx="7" ry="4" class="ai-tint"/>
    <ellipse cx="39" cy="20" rx="7" ry="4" class="ai-fill"/>
    <path d="m48 7 4 4 4-4-4-4Z" class="ai-accent"/>
  `,
  fifty: `
    <circle cx="32" cy="32" r="23"/>
    <path d="m22 42 5-16 15-4-5 16Z" class="ai-tint"/>
    <path d="m27 26 10 12 5-16Z" class="ai-fill"/>
    <path d="M32 4v9M32 51v9M4 32h9M51 32h9"/>
    <circle cx="32" cy="32" r="3" class="ai-accent"/>
  `,
  hundred: `
    <path d="M32 7 55 22v22L32 58 9 44V22Z" class="ai-tint"/>
    <path d="m9 22 23 14 23-14M32 7v29m0 0v22M9 44l23-8 23 8"/>
    <path d="m32 18 11 7-11 7-11-7Z" class="ai-accent"/>
  `,
  hard: `
    <path d="m5 53 19-36 11 20 7-13 17 29Z" class="ai-tint"/>
    <path d="m17 31 7-14 7 14-7-4Zm19 4 6-11 6 11-6-3Z" class="ai-paper"/>
    <path d="M9 53h46M39 9h12m-6-6v12" class="ai-highlight"/>
  `,
  "all-games": `
    <path d="M32 57V27M32 43 15 32M32 35l17-11"/>
    <path d="M31 29C20 20 22 9 32 5c10 6 11 16-1 24ZM18 35C7 36 3 28 7 19c11 0 17 8 11 16ZM44 29c-4-11 2-19 14-19 4 11-3 19-14 19Z" class="ai-tint"/>
    <path d="M24 57h16M10 49l6-5 6 5M42 49l6-5 6 5"/>
  `,
  campaign: `
    <path d="M10 12h18q4 0 4 4v40q-3-5-8-5H10ZM54 12H36q-4 0-4 4v40q3-5 8-5h14Z" class="ai-tint"/>
    <path d="M16 22h10M16 30h10M38 22h10M38 30h10"/>
    <path d="M41 8h8v35l-4-4-4 4Z" class="ai-accent"/>
  `,
  tiers: `
    <path d="M7 54V40h10V29h10V18h10V7h20v47Z" class="ai-tint"/>
    <path d="M17 54V40h10V29h10V18h20M27 54V40h10V29h20M37 54V40h20"/>
    <path d="m45 9 3 3 5-5" class="ai-highlight"/>
  `,
  half: `
    <path d="m8 25 24-17 24 17v29H8ZM8 25h48M32 8v46"/>
    <path d="M32 25h24v29H32Z" class="ai-tint"/>
    <path d="M20 52V38m0 5c-8 0-10-5-9-10 7 0 11 4 9 10Zm0-4c-1-8 5-12 11-10-1 6-5 10-11 10Z" class="ai-fill"/>
    <path d="M39 34h10M39 42h10"/>
  `,
  collection: `
    <path d="M6 14h52v43H6ZM6 35h52M27 14v43M45 14v43M6 8h52"/>
    <path d="M15 21v9m0-5c-5 0-7-3-6-6 4 0 7 2 6 6Zm0-1c0-5 4-7 8-6 0 4-3 6-8 6Z" class="ai-fill"/>
    <path d="M34 19h5m-4 0v6l-4 6h12l-5-6v-6" class="ai-tint"/>
    <circle cx="36" cy="45" r="5" class="ai-accent"/>
    <path d="m11 48 7-8 6 8M50 21v9M50 40v10"/>
  `,
  "light-color-gates": `
    <path d="M27 8h14v48H27ZM31 13h6v38h-6" class="ai-tint"/>
    <path d="M5 23h49m-6-5 6 5-6 5M5 41h17m-7-5 7 5-7 5"/>
    <circle cx="5" cy="23" r="3" class="ai-accent"/>
    <circle cx="5" cy="41" r="3" class="ai-fill"/>
    <path d="m48 39 9 9m0-9-9 9M31 14l3-3 3 3"/>
  `,
  "light-three-colors": `
    <path d="M9 13h16v13h25M9 32h10v13h31M9 51h29V12h12"/>
    <circle cx="9" cy="13" r="4" class="ai-fill"/>
    <circle cx="9" cy="32" r="4" class="ai-accent"/>
    <circle cx="9" cy="51" r="4" class="ai-tint"/>
    <circle cx="54" cy="12" r="4" class="ai-tint"/>
    <circle cx="54" cy="26" r="4" class="ai-fill"/>
    <circle cx="54" cy="45" r="4" class="ai-accent"/>
    <path d="m20 20 10 10m3-23 10 10m-29 23 10 10"/>
  `,
  "cut-hollow-shape": `
    <path d="M9 10h46v44H9Zm15 14v16h16V24Z" fill-rule="evenodd" class="ai-tint"/>
    <path d="M5 59 59 5" stroke-dasharray="4 4"/>
    <path d="M10 19h7M10 27h7M10 35h7M47 29h7M47 37h7M47 45h7"/>
    <circle cx="32" cy="32" r="3" class="ai-accent"/>
  `,
  "cut-wave": `
    <path d="M7 36C14 8 23 8 31 32S48 56 57 26v29H7Z" class="ai-tint"/>
    <path d="M5 34h54M32 6v52" stroke-dasharray="4 4"/>
    <path d="M26 10h12M26 53h12"/>
    <circle cx="32" cy="34" r="4" class="ai-accent"/>
  `,
  "elo-distance": `
    <path d="M12 19h40M12 26v8M52 26v8M9 43h46v12H9Z" class="ai-tint"/>
    <circle cx="12" cy="19" r="7" class="ai-fill"/>
    <circle cx="52" cy="19" r="7" class="ai-accent"/>
    <path d="M18 43v7M25 43v4M32 43v7M39 43v4M46 43v7"/>
  `,
  "elo-exclusive": `
    <path d="M8 32h12V13h24v19h12M20 32v19h24V32"/>
    <circle cx="8" cy="32" r="5" class="ai-tint"/>
    <circle cx="56" cy="32" r="5" class="ai-tint"/>
    <path d="m27 12 4 4 7-8" class="ai-highlight"/>
    <path d="m27 46 10 10m0-10L27 56"/>
  `,
  "prumo-asymmetric": `
    <path d="M7 12h15v12h16V12h19v25H7Z" class="ai-tint"/>
    <path d="M7 24h15M38 24h19M47 12v25"/>
    <path d="m32 38-10 17h20Z" class="ai-accent"/>
    <path d="M13 57h38M32 28v8" stroke-dasharray="2 3"/>
  `,
  "prumo-corridor": `
    <path d="M7 8h18v18H7ZM39 38h18v18H39Z" class="ai-tint"/>
    <path d="M7 38h18v18H7ZM39 8h18v18H39Z" class="ai-fill"/>
    <path d="M7 32h50M25 24v16M39 24v16"/>
    <path d="m28 31 4 4 4-4M32 21v13" class="ai-highlight"/>
  `,
  "pacto-unpaired": `
    <circle cx="10" cy="15" r="6" class="ai-tint"/>
    <circle cx="10" cy="48" r="6" class="ai-tint"/>
    <path d="m24 9 6 6-6 6-6-6Zm0 33 6 6-6 6-6-6Z" class="ai-accent"/>
    <rect x="34" y="9" width="12" height="12" rx="2" class="ai-fill"/>
    <rect x="34" y="42" width="12" height="12" rx="2" class="ai-fill"/>
    <path d="m54 9 7 12H47Zm0 33 7 12H47Z" class="ai-tint"/>
    <path d="M10 28v6M24 28v6M40 28v6M54 28v6" stroke-dasharray="1 4"/>
  `,
  "pacto-blank-row": `
    <rect x="8" y="8" width="48" height="48" rx="5"/>
    <path d="M8 24h48v16H8Z" class="ai-tint"/>
    <path d="M24 8v16m0 16v16M40 8v16m0 16v16M15 32h34" stroke-dasharray="3 4"/>
    <circle cx="16" cy="16" r="4" class="ai-fill"/>
    <path d="m48 44 4 4-4 4-4-4Z" class="ai-accent"/>
  `,
  "sintonia-remote-switch": `
    <rect x="5" y="24" width="22" height="31" rx="4" class="ai-tint"/>
    <rect x="37" y="24" width="22" height="31" rx="4" class="ai-tint"/>
    <circle cx="16" cy="41" r="6" class="ai-accent"/>
    <path d="M43 34h10M43 42h10M43 50h10M16 19V9h32v10m-5-5 5 5 5-5"/>
  `,
  "sintonia-ice": `
    <rect x="8" y="13" width="21" height="21" rx="6" class="ai-tint"/>
    <path d="M13 24h11m-4-4 4 4-4 4M6 41h43m-6-5 6 5-6 5M10 51h26"/>
    <path d="M48 9v20m-9-15 18 10m-18 0 18-10M43 11l5 4 5-4M43 27l5-4 5 4" class="ai-highlight"/>
    <path d="M54 44v12M48 50h12"/>
  `,
  "repasse-four-directions": `
    <circle cx="32" cy="32" r="10" class="ai-tint"/>
    <path d="M32 21V5m-5 6 5-6 5 6M32 43v16m-5-6 5 6 5-6M21 32H5m6-5-6 5 6 5M43 32h16m-6-5 6 5-6 5"/>
    <circle cx="32" cy="32" r="3" class="ai-accent"/>
  `,
  "repasse-handoff": `
    <rect x="5" y="29" width="18" height="27" rx="4" class="ai-tint"/>
    <rect x="41" y="29" width="18" height="27" rx="4" class="ai-fill"/>
    <path d="M14 23V12h36v11m-6-6 6 6 6-6"/>
    <rect x="26" y="31" width="12" height="6" rx="3" class="ai-accent"/>
    <path d="M12 41h5M47 41h6m-3-3v6M23 45h17m-6-5 6 5-6 5"/>
  `,
  "orbita-gears": `
    <circle cx="23" cy="28" r="15" class="ai-tint"/>
    <circle cx="42" cy="39" r="15" class="ai-tint"/>
    <circle cx="23" cy="28" r="6"/>
    <circle cx="42" cy="39" r="6"/>
    <path d="M23 8v5M8 15l5 4M3 28h5M7 42l5-4M42 54v6M57 39h5M52 23l-4 5M52 55l-4-5M23 27l8 7"/>
    <path d="m18 7 5-3 5 3m18 54-5 2-4-3" class="ai-highlight"/>
  `,
  "orbita-sensor": `
    <circle cx="28" cy="27" r="20"/>
    <circle cx="28" cy="27" r="11" class="ai-tint"/>
    <circle cx="28" cy="7" r="5" class="ai-accent"/>
    <path d="M9 46v10h30M14 51v10M22 51v10M30 51v10"/>
    <rect x="43" y="40" width="15" height="16" rx="3" class="ai-tint"/>
    <path d="M47 40v-7q0-8 10-5M50 46v4M45 21l7 7m-1-7 1 7-7-1"/>
  `,
  "divisa-no-contact": `
    <path d="M7 11h20v14H16v15H7ZM57 53H37V39h11V24h9Z" class="ai-tint"/>
    <path d="m35 7-6 15 8 13-7 22" stroke-dasharray="4 4"/>
    <circle cx="17" cy="19" r="3" class="ai-fill"/>
    <path d="m46 43 4 4-4 4-4-4Z" class="ai-accent"/>
  `,
  "divisa-four-territories": `
    <rect x="6" y="6" width="52" height="52" rx="5"/>
    <path d="M6 6h26v16H18v15H6ZM58 6v31H43V22H32V6ZM6 37h12V22h14v36H6ZM58 58H32V22h11v15h15Z" class="ai-tint"/>
    <circle cx="15" cy="15" r="4" class="ai-fill"/>
    <circle cx="47" cy="15" r="4" class="ai-accent"/>
    <circle cx="19" cy="47" r="4" class="ai-accent"/>
    <circle cx="46" cy="47" r="4" class="ai-fill"/>
  `,
  "pulso-three-intervals": `
    <path d="M6 13h52M6 32h52M6 51h52"/>
    <circle cx="23" cy="13" r="4" class="ai-fill"/><circle cx="32" cy="13" r="4" class="ai-fill"/><circle cx="41" cy="13" r="4" class="ai-fill"/>
    <circle cx="15" cy="32" r="4" class="ai-accent"/><circle cx="32" cy="32" r="4" class="ai-accent"/><circle cx="49" cy="32" r="4" class="ai-accent"/>
    <circle cx="7" cy="51" r="4" class="ai-tint"/><circle cx="32" cy="51" r="4" class="ai-tint"/><circle cx="57" cy="51" r="4" class="ai-tint"/>
  `,
  "pulso-wide-beat": `
    <path d="M7 31h50M9 18v-6h46v6M9 45v7h46v-7"/>
    <circle cx="8" cy="31" r="6" class="ai-tint"/>
    <circle cx="32" cy="31" r="6" class="ai-accent"/>
    <circle cx="56" cy="31" r="6" class="ai-tint"/>
    <path d="M20 27v8M44 27v8" stroke-dasharray="1 4"/>
  `,
  "foz-long-course": `
    <path d="M10 7v14h19v15h24v21" stroke-width="10" class="ai-highlight"/>
    <path d="M10 7v14h19v15h24v21"/>
    <circle cx="10" cy="7" r="4" class="ai-tint"/><circle cx="10" cy="21" r="4" class="ai-tint"/><circle cx="29" cy="21" r="4" class="ai-tint"/><circle cx="29" cy="36" r="4" class="ai-tint"/><circle cx="42" cy="36" r="4" class="ai-tint"/><circle cx="53" cy="43" r="4" class="ai-tint"/><circle cx="53" cy="57" r="4" class="ai-accent"/>
  `,
  "foz-confluence": `
    <path d="M9 9v16q0 11 23 11M32 6v48M55 9v16q0 11-23 11" stroke-width="5"/>
    <path d="M7 55q6-4 12 0t12 0t12 0t12 0"/>
    <circle cx="9" cy="9" r="4" class="ai-tint"/><circle cx="32" cy="6" r="4" class="ai-tint"/><circle cx="55" cy="9" r="4" class="ai-tint"/>
    <path d="m26 44 6 7 6-7" class="ai-highlight"/>
  `,
  "refugio-interior": `
    <rect x="6" y="6" width="52" height="52" rx="5"/>
    <path d="M18 6v12H6M46 6v12h12M6 46h12v12M58 46H46v12"/>
    <path d="m18 31 14-13 14 13v15H18Z" class="ai-tint"/>
    <path d="M28 46V34h8v12" class="ai-accent"/>
  `,
  "refugio-four-markers": `
    <path d="M7 7h50v50H7ZM32 7v50M7 32h50"/>
    <path d="m14 24 6-12 6 12ZM39 18l6-6 6 6-6 6Z" class="ai-tint"/>
    <circle cx="20" cy="45" r="6" class="ai-accent"/>
    <path d="M39 39h12v12H39Z" class="ai-fill"/>
  `,
  "mirante-four-witnesses": `
    <rect x="19" y="19" width="26" height="26" rx="4" class="ai-tint"/>
    <path d="M19 9q13-12 26 0-13 12-26 0ZM19 55q13-12 26 0-13 12-26 0ZM9 19q-12 13 0 26 12-13 0-26ZM55 19q-12 13 0 26 12-13 0-26Z"/>
    <circle cx="32" cy="9" r="3" class="ai-fill"/><circle cx="32" cy="55" r="3" class="ai-fill"/><circle cx="9" cy="32" r="3" class="ai-fill"/><circle cx="55" cy="32" r="3" class="ai-fill"/>
    <circle cx="32" cy="32" r="5" class="ai-accent"/>
  `,
  "mirante-witness-rule": `
    <path d="M5 14q12-12 24 0-12 12-24 0ZM35 14q12-12 24 0-12 12-24 0Z"/>
    <circle cx="17" cy="14" r="4" class="ai-fill"/><circle cx="47" cy="14" r="4" class="ai-accent"/>
    <path d="m17 24 15 17 15-17" stroke-dasharray="3 4"/>
    <rect x="24" y="41" width="16" height="16" rx="3" class="ai-tint"/>
    <path d="m28 49 3 3 6-7"/>
  `,
  "renovo-unequal-arms": `
    <path d="M12 8v43h44" stroke-width="8"/>
    <path d="M12 8v43h44" stroke="var(--achievement-tint, #e4eadb)" stroke-width="3"/>
    <path d="M12 28C2 23 3 13 12 11c8 4 10 12 0 17ZM39 51c-1-10 6-15 14-12 1 9-5 15-14 12Z" class="ai-tint"/>
    <path d="M22 10v22m-4-16 4-6 4 6M25 59h29"/>
  `,
  "renovo-four-turns": `
    <path d="M7 25V8h18M39 8h18v17M57 39v18H39M25 57H7V39" stroke-width="5"/>
    <path d="M16 16h9v9M48 16v9h-9M48 48h-9v-9M16 48v-9h9"/>
    <path d="M25 34c0-11 11-14 17-10 0 10-8 16-17 10Z" class="ai-tint"/>
    <path d="m25 40 10-11"/>
  `,
  "broto-double-harvest": `
    <path d="M19 52V27M45 52V27M8 54h48"/>
    <path d="M19 38C8 39 5 32 7 27c8-1 13 4 12 11ZM45 38c11 1 14-6 12-11-8-1-13 4-12 11Z" class="ai-tint"/>
    <path d="M19 7q7 0 7 7 7 0 7 7-4 8-14 7-10 1-14-7 0-7 7-7 0-7 7-7ZM45 7q7 0 7 7 7 0 7 7-4 8-14 7-10 1-14-7 0-7 7-7 0-7 7-7Z" class="ai-tint"/>
    <circle cx="19" cy="20" r="4" class="ai-accent"/><circle cx="45" cy="20" r="4" class="ai-accent"/>
  `,
  "broto-four-winds": `
    <path d="M32 10v10M32 44v10M10 32h10M44 32h10M28 14l4-4 4 4M28 50l4 4 4-4M14 28l-4 4 4 4M50 28l4 4-4 4"/>
    <path d="M31 39V29m0 5c-9 0-12-7-9-12 8 0 12 5 9 12Zm0-5c-1-9 7-13 13-10 0 7-5 11-13 10Z" class="ai-tint"/>
    <circle cx="32" cy="32" r="22" stroke-dasharray="2 7"/>
  `,
  "cerco-isolate": `
    <path d="M9 8h46v10H9ZM9 46h46v10H9ZM8 23h10v18H8ZM46 23h10v18H46Z" class="ai-tint"/>
    <rect x="23" y="23" width="18" height="18" rx="5" class="ai-fill"/>
    <circle cx="32" cy="32" r="4" class="ai-accent"/>
    <path d="M14 8v10M24 8v10M34 8v10M44 8v10M14 46v10M24 46v10M34 46v10M44 46v10"/>
  `,
  "cerco-last-opening": `
    <path d="M7 7h50v50H7ZM7 22h37M7 42h37M22 7v15M22 42v15M44 7v15M44 42v15" class="ai-tint"/>
    <rect x="12" y="26" width="13" height="13" rx="4" class="ai-fill"/>
    <path d="M28 32h30m-7-6 7 6-7 6"/>
    <path d="m44 27 5 5-5 5" class="ai-highlight"/>
  `,
  "desvio-narrow-path": `
    <path d="M7 7h50v50H7ZM7 22h50M7 42h50M22 7v50M42 7v50"/>
    <path d="M8 8h14v14H8ZM42 8h14v14H42ZM8 42h14v14H8ZM42 42h14v14H42Z" class="ai-tint"/>
    <circle cx="32" cy="32" r="6" class="ai-fill"/>
    <path d="M32 25V9m-5 6 5-6 5 6M28 48h8M12 28l7 7m0-7-7 7M46 28l7 7m0-7-7 7"/>
  `,
  "desvio-early-trap": `
    <rect x="7" y="7" width="50" height="50" rx="4"/>
    <path d="M7 22h50M7 42h50M22 7v50M42 7v50"/>
    <path d="M7 22h50v20H7Z" class="ai-tint"/>
    <circle cx="32" cy="32" r="6" class="ai-accent"/>
    <path d="m11 28 7 8m0-8-7 8m35-8 7 8m0-8-7 8"/>
    <circle cx="14" cy="14" r="2"/><circle cx="50" cy="50" r="2"/>
  `,
  "enlace-corrente-acesa": `
    <path d="M9 45V28h23V12m0 16h23v17"/>
    <circle cx="9" cy="45" r="6" class="ai-tint"/>
    <circle cx="32" cy="12" r="6" class="ai-accent"/>
    <circle cx="55" cy="45" r="6" class="ai-tint"/>
    <path d="M5 55h8M28 3h8M51 55h8M22 22l-4-4M42 22l4-4" class="ai-highlight"/>
  `,
  "enlace-travessia": `
    <path d="M7 8v48M57 8v48M7 42h14V21h22v21h14"/>
    <circle cx="7" cy="42" r="5" class="ai-accent"/>
    <circle cx="21" cy="21" r="5" class="ai-tint"/>
    <circle cx="43" cy="21" r="5" class="ai-tint"/>
    <circle cx="57" cy="42" r="5" class="ai-accent"/>
    <path d="m28 52 5 4 5-4"/>
  `,
  "vazante-comboio-misto": `
    <path d="M4 22h24l-5 10H10ZM36 22h24l-5 10H42Z" class="ai-tint"/>
    <circle cx="16" cy="16" r="5" class="ai-fill"/>
    <path d="m48 11 5 5-5 5-5-5Z" class="ai-accent"/>
    <path d="M28 27h8M5 40q6-4 12 0t12 0t12 0t12 0M9 49h44m-7-5 7 5-7 5"/>
  `,
  "vazante-tres-barcos": `
    <path d="M4 18h16l-4 8H8ZM24 18h16l-4 8h-8ZM44 18h16l-4 8h-8Z" class="ai-tint"/>
    <path d="M20 22h4M40 22h4M8 36q5-4 10 0t10 0t10 0M6 46h40m-6-5 6 5-6 5M53 34v21M49 55h12"/>
    <circle cx="12" cy="12" r="3" class="ai-fill"/>
    <circle cx="32" cy="12" r="3" class="ai-accent"/>
    <circle cx="52" cy="12" r="3" class="ai-fill"/>
  `,
  "mosaico-dupla-assinatura": `
    <rect x="7" y="12" width="50" height="40" rx="5"/>
    <path d="M7 32h50M23 12v40M41 12v40"/>
    <path d="m23 24 8 8-8 8-8-8Zm18 0 8 8-8 8-8-8Z" class="ai-accent"/>
    <path d="m20 32 2 2 4-4m12 2 2 2 4-4"/>
  `,
  "mosaico-unanimidade": `
    <rect x="9" y="9" width="46" height="46" rx="6" class="ai-tint"/>
    <path d="M32 9v46M9 32h46"/>
    <path d="M32 32H18a14 14 0 0 1 14-14Zm0 0V18a14 14 0 0 1 14 14Zm0 0h14a14 14 0 0 1-14 14Zm0 0v14a14 14 0 0 1-14-14Z" class="ai-fill"/>
    <circle cx="32" cy="32" r="6" class="ai-accent"/>
  `,
  "quinhao-fruto-que-faltava": `
    <path d="M8 34h48l-6 20H14ZM17 34q0-22 15-22t15 22"/>
    <circle cx="21" cy="37" r="6" class="ai-tint"/>
    <path d="m39 31 7 7-7 7-7-7Z" class="ai-accent"/>
    <path d="M26 22c-1-7 9-8 12-3 3 7-9 12-12 3Z" class="ai-fill"/>
    <path d="M6 10h14m-5-5 5 5-5 5M32 14v-5"/>
  `,
  "quinhao-oferta-diversa": `
    <path d="M4 35h16l-3 14H7ZM24 21h16l-3 14H27ZM44 35h16l-3 14H47Z" class="ai-tint"/>
    <circle cx="12" cy="29" r="5" class="ai-fill"/>
    <path d="m32 9 5 5-5 5-5-5Z" class="ai-accent"/>
    <path d="M48 30c-3-7 5-11 9-7 3 6-3 12-9 7Z" class="ai-fill"/>
    <path d="M11 55q21 8 42 0M12 15l9-7m22 0 9 7"/>
  `,
  "estalo-cadeia-longa": `
    <path d="M11 15h21v18h21v17"/>
    <path d="M5 10q12-5 12 8-12 5-12-8ZM26 10q12-5 12 8-12 5-12-8ZM26 28q12-5 12 8-12 5-12-8ZM47 28q12-5 12 8-12 5-12-8ZM47 46q12-5 12 8-12 5-12-8Z" class="ai-tint"/>
    <path d="m10 12 4 3-4 3m21-6 3 3-3 3m0 12 3 3-3 3m18-6 4 3-4 3m0 12 4 3-4 3"/>
  `,
  "estalo-cadeia-limpa": `
    <path d="M8 46 23 31l15 0 17-17"/>
    <path d="M4 48q-1-17 17-18 1 17-17 18ZM23 33q-1-17 17-18 1 17-17 18ZM41 18q-1-15 16-15 1 15-16 15Z" class="ai-tint"/>
    <path d="m8 42 5-5m15-10 5-5m13-10 5-5M36 49l6 6 13-16" class="ai-highlight"/>
  `,
  "dobra-distrito-reunido": `
    <path d="m8 14 15-6 18 6 15-6v42l-15 6-18-6-15 6ZM23 8v42M41 14v42" class="ai-tint"/>
    <path d="M8 35h15l18-4h15M23 29l18 2"/>
    <path d="M31 23v21m0-21h13l-4 5 4 5H31" class="ai-accent"/>
  `,
  "dobra-virada-final": `
    <path d="M9 14h46v39H9ZM9 14l23 20L55 14M32 34v19" class="ai-tint"/>
    <path d="M15 8q18-11 35 3m-8-1 8 1-2-8M18 45l6-6 7 4 12-10m-1 7 1-7-7 1"/>
    <circle cx="43" cy="33" r="4" class="ai-accent"/>
  `,
  "acorde-par-e-silencio": `
    <path d="M8 29c4-5 0-12 7-16 7 4 3 11 7 16l2 4H6Zm26 0c4-5 0-12 7-16 7 4 3 11 7 16l2 4H32Z" class="ai-tint"/>
    <path d="M12 38h6M38 38h6M15 9V5M41 9V5M20 48h14M28 43l6 5-6 5M46 45l11 11m0-11L46 56"/>
  `,
  "acorde-tres-vozes": `
    <path d="M5 25q5-5 5-11t6 0q0 6 5 11ZM24 25q5-5 5-11t6 0q0 6 5 11ZM43 25q5-5 5-11t6 0q0 6 5 11ZM5 48q5-5 5-11t6 0q0 6 5 11ZM24 48q5-5 5-11t6 0q0 6 5 11ZM43 48q5-5 5-11t6 0q0 6 5 11Z" class="ai-tint"/>
    <circle cx="13" cy="21" r="2" class="ai-fill"/><circle cx="13" cy="44" r="2" class="ai-fill"/>
    <path d="m32 17 3 3-3 3-3-3Zm0 23 3 3-3 3-3-3Z" class="ai-accent"/>
    <path d="m48 23 6-6m-6 29 6-6M10 53h6M29 53h6M48 53h6"/>
  `,
  "lastro-volta-ao-centro": `
    <path d="M32 15v38M23 55h18M7 23h50M15 23 8 40h14Zm34 0-7 17h14Z" class="ai-tint"/>
    <circle cx="32" cy="23" r="6" class="ai-accent"/>
    <path d="M9 10h14m-5-5 5 5-5 5M55 10H41m5-5-5 5 5 5"/>
  `,
  "lastro-ultimo-ajuste": `
    <path d="M8 45h48M8 40v10M22 40v10M36 40v10M50 40v10M8 55h48"/>
    <path d="M43 21h14l4 18H39Z" class="ai-tint"/>
    <path d="M47 21v-5h6v5M7 25h27m-7-6 7 6-7 6M50 9V3h10l-3 3 3 3Z" class="ai-accent"/>
  `,
};

export const ACHIEVEMENT_ICON_IDS = Object.freeze(Object.keys(ICON_DRAWINGS));

// A geometria usa a mesma prancheta de 128 unidades da opção C aprovada.
// O grupo externo reduz tudo pela metade sem alterar o espaço ocupado no layout.
function rosetteOutline(centerY, outerRadius, innerRadius) {
  const points = Array.from({ length: 32 }, (_, index) => {
    const angle = -Math.PI / 2 + index * Math.PI / 16;
    const radius = index % 2 === 0 ? outerRadius : innerRadius;
    const x = (64 + radius * Math.cos(angle)).toFixed(2);
    const y = (centerY + radius * Math.sin(angle)).toFixed(2);
    return `${x},${y}`;
  });
  return `M${points.join(" L")}Z`;
}

function rosetteRays() {
  return Array.from({ length: 17 }, (_, index) => {
    const angle = index * 22 * Math.PI / 180;
    const point = (radius) =>
      `${(64 + radius * Math.cos(angle)).toFixed(2)} ${(51 + radius * Math.sin(angle)).toFixed(2)}`;
    return `M${point(41)} L${point(46)}`;
  }).join(" ");
}

// Calculada uma única vez: não depende do progresso nem modifica o pictograma.
const ROSETTE_FRAME = `
  <g class="ai-rosette" stroke="var(--medal-edge)" stroke-width="1.1">
    <path d="M35 74 29 120 46 111 57 124 62 87Z" fill="var(--medal-blue)"/>
    <path d="M67 83 75 124 86 111 104 120 94 73Z" fill="var(--medal-green)"/>
    <path d="M38 94 35 110M88 94 96 110" stroke="var(--medal-gold)" stroke-width="2"/>
    <path d="${rosetteOutline(53, 50, 43)}" fill="var(--medal-edge)" stroke="none"/>
    <path d="${rosetteOutline(51, 50, 43)}" fill="var(--medal-gold)" stroke-width="1"/>
    <path d="${rosetteOutline(51, 44, 39)}" fill="var(--medal-mid)" stroke="var(--medal-pale)" stroke-width="0.6"/>
    <circle cx="64" cy="51" r="36" fill="var(--medal-blue)" stroke-width="0.8"/>
    <circle cx="64" cy="51" r="32" fill="var(--medal-pale)" stroke="var(--medal-gold)" stroke-width="1.5"/>
    <path d="${rosetteRays()}" stroke-width="0.8"/>
    <g fill="var(--medal-gold)" stroke="none">
      <circle cx="64" cy="16" r="1.5"/>
      <circle cx="29" cy="51" r="1.5"/>
      <circle cx="99" cy="51" r="1.5"/>
      <circle cx="64" cy="86" r="1.5"/>
    </g>
  </g>
`;

export function renderAchievementIcon(id) {
  const drawing = ICON_DRAWINGS[id] ?? ICON_DRAWINGS.first;

  return `<svg class="achievement-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <g transform="scale(0.5)">
      ${ROSETTE_FRAME}
      <g class="ai-pictogram" transform="translate(40 27) scale(0.75)" stroke-width="3.1">${drawing}</g>
    </g>
  </svg>`;
}
