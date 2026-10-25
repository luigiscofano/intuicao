// V5 authorization/identity/history gate, pinned before angular redesign.
// Pure runtime files and previous v4 artifacts must remain byte-for-byte intact.
// Tests use only synthetic in-memory storage. Never read real browser storage.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {lightLevels} from '../dist/light-levels.mjs';
import {createLightCampaignProgress, LIGHT_CAMPAIGN_PROGRESS_KEY} from '../dist/light-campaign-progress.mjs';
import {createAnswerProgress} from '../dist/answer-progress.mjs';
import {originalLevelState, validOriginalSnapshot} from '../dist/original-json.mjs';
import {validateRecord} from './light-v4-record-validation.mjs';
import {readJSON, printReport, isMain, expectedBand} from './light-v4-artifacts.mjs';
import {artifactURL} from './light-v5-incidence-tests.mjs';

const sha=value=>crypto.createHash('sha256').update(value).digest('hex');
const jsonSHA=value=>sha(JSON.stringify(value));
const puzzleFields=['objects','sources','targets','portals','solution','sourceAngle','target','requiredBounces'];
export const puzzleFingerprint=level=>jsonSHA(Object.fromEntries(puzzleFields.map(key=>[key,level[key]])));
const oldNumber=level=>level.campaignNumber??level.number;
export const BASELINE_COMMIT="7e99fc3a1bc2f6a1c1eb8791826bbe08fb6fe1a3";
const BASELINE_PREVIOUS_DEFINITIONS="2b9e2909e38d8764e37b42cd381168a385792892c48d551f3debe7fb8057ae72";
const BASELINE_PREVIOUS_PUZZLES="40baee48fa14128668c5e9255922e25b560dd8357905ad0773025e81e6f55eb4";
const BASELINE_LEGACY_DEFINITIONS="e2ee59b46675b93634e31091312e8608be8d832b311026b56bc033268219e1ea";
const PROTECTED_FILES={
  "dist/CONTROLES-DIRETOS.md": "9c1dfc24622cfbc5d99e566a9d4f4c307049e27fb3c9d7240ef543cebae972e2",
  "dist/CORTE-V2-E-CATALOGO-800.md": "350feace0b7dea794fd2221f9be30ca28f570197566e7d7e11a4ded32e2a2842",
  "dist/ELO-CAMPANHA-V3.md": "dc4a4659025875646575e90add7fd14053f161bcbe51cd51c9c2df74f2a3f8d2",
  "dist/ENDLESS-GERADORES-COLECAO.md": "fb8e9c220866b196f5d7c5cb8f03bbfd51af6fc7c43b63ab26a853032ff62f1d",
  "dist/ENDLESS.md": "67b881a3512847ee326aea7f14c4979b54c8489078c21873e85805b8fe9d2dc4",
  "dist/EXPANSAO.md": "44d3ff1e07443940e6d6e4811f578b2f976bfba7093c592c9f9f65290b6667bb",
  "dist/IMPORTAR-NIVEIS-JSON.md": "a33123db558eadf2089d945b6b1d004076aa056b5e2d45243d2e5da44404f0d9",
  "dist/INTERACAO-DIRETA-MATRIZ.md": "05ed5fadbf4e2b3394aa46f754aca6378b0d0559405b6310c81a0ece475eeeed",
  "dist/QA-ATALHOS-NIVEIS.md": "886b9552644133f4b8d2f302109a9cacd923fa2f21f68ba6910ceb29e83d9204",
  "dist/QA-CHECAR-COLECAO.md": "c99b0e827ef779f5fd732fd23c846dbd526686b852e7ca4617020c1ac35f9db6",
  "dist/QA-ENDLESS.md": "fb34320d7956122698e61448286a15cc95feedd0c03a274b0f1cd7f5cee58daa",
  "dist/QA-PACTO-CHECAR.md": "4a49dad1f69d86f3f061b50ebbe8c5692912461eaf44acaef8e8c9ab46ea5dd2",
  "dist/QA-PACTO-HACHURAS.md": "218326899cb848f6ffc6b18ac1815d059e02ef6b5b74f3a15a036962299d4f0f",
  "dist/QA-REFLEXOS-V3.md": "8f0407d1eddff3e1b2b60fe12e3a6873c9224cc98230936c3009a8bea21681cc",
  "dist/REFLEXOS-20.md": "4d19843a4a3c525449941afecea399c974920da71f24a408e2fcadc305c8d85a",
  "dist/REFLEXOS-V3.md": "1bb9920630c519a9ebf2900c34593fffc4ed096869505a542d07b3e9bff3be48",
  "dist/VALIDACAO-EXPANSAO.md": "9ae13e38b87f7af83eaacd7238db02689e4cd0fb99bbe3c68ba9898e5817c765",
  "dist/about-dialog.css": "1f4dcf40920819a7d880778b5fe17362de541ff9ae884d771abd7f94e7abdb75",
  "dist/about-dialog.mjs": "2b3565ac1bf1223c12e912fe800a30e12e31e374126d92b0c3d4eee72ecc8cf0",
  "dist/answer-progress.mjs": "28c8a0bfa2c80f95aaf284338b7db40117bc4674ced9c06c43ea156e101be555",
  "dist/app.mjs": "062548eb68c98432c4941586dc1de2fc954528888856eb9021a7d23eb2f15956",
  "dist/collection-json-worker.mjs": "75d9c0c78cf7ce61af12dbffeabdad999be827acebe101ea219d8c801ede3698",
  "dist/collection-json.mjs": "06fefe1d69acf9e5117229e8df33f088e3ba1cd8ccf256466b68fd4b294b08a3",
  "dist/collection-state.mjs": "d34aa0f389f11e7ffe86bcc09e5358317ada6217146ec716f22a4e5f8bc95aa7",
  "dist/collection-tutorials.mjs": "9b17dbb651d364e9947309be5d158a1f394aacf6fe7ca8ccaeeed1989fcfb590",
  "dist/collection-ui.mjs": "c87bc35cfc41bdd0b5d0828b265d0737c814693fec5e2b435664f3a324f958c8",
  "dist/curves.mjs": "1dd3b6d8a3efb21b19e0a2921ee9cb9a025485de574f0620f187bd755c11948e",
  "dist/decor-piles.mjs": "32bd9a1183ad32091a23ffcbefbdeecea566a2d8bee037c0b8f18bf2205ccc5a",
  "dist/desvio-hints.mjs": "6cbc77112cf6c5d42713b71da358df96ec63de52b32e5b861f52d5552c3d1e15",
  "dist/desvio.mjs": "b72245631427bbe537e622b902a1f74968b34762621574884d26be319edc52e2",
  "dist/development/reflexos-v4/README.md": "9d2e6dca7cc34291cfd620394d3ae7dc1d283c5c0e7682b28cfc3e0acc77ce05",
  "dist/development/reflexos-v4/build-manifest.json": "a23219e72bdd1260924245d5a73e04a7a492d4694e8241f04e2c530628189832",
  "dist/development/reflexos-v4/distribution.json": "a6ecfbe87fa987b720ad0b1d05004d0873ab4a0925c40920f4edf890819d1e2e",
  "dist/development/reflexos-v4/editorial-decisions.json": "9789eac965d9447837e36680fee2878af52fc5fed3986e24dc0c6009f41cffc8",
  "dist/development/reflexos-v4/evidence-records.json.gz": "1cbc3295e0294d7d579452789a5e17940e024f35aee893db342ff1de5d71be27",
  "dist/development/reflexos-v4/independent-editorial-review.json": "7f58036e33838bcb6198dc633fbc089b228e00787e19702679b3814c8f16b8d5",
  "dist/development/reflexos-v4/legacy-200.json": "45753977310d13c02b86bb7b8aea6e37038c2a6bd516fda7f89dab60f0fb5a10",
  "dist/development/reflexos-v4/legacy-map.json": "e5dc6102765681da54cb9a103b258ce4ed46dff2bfb5f37a5b47b814914fb189",
  "dist/development/reflexos-v4/preservation-report.json": "0d8e367d4c0a460abadce91b85925352ee25c27f8784afa4a029b58a95fbf0ac",
  "dist/development/reflexos-v4/progress-validation.json": "716c9fd1cb41339b442592323c29db749b69998fe25e4ae18b83c3720c3a0596",
  "dist/development/reflexos-v4/records.json": "f54a4bc0eb2d51936041da85b08f255bd60e94d7f020584f5439884e6a84360c",
  "dist/development/reflexos-v4/regression-report.json": "2950a77f01e36d9e458169a660a0adf24c3d0a0c8f3b0bf3a8aaaca7f886e879",
  "dist/development/reflexos-v4/replay-results.json.gz": "885c01996623b55c0e5ad4632469c5398305fa936dd0c4bb75b368b681c59783",
  "dist/development/reflexos-v4/selection.json": "998152d701d9228ea21647518c147533babdda34ee52bcc63da0ac55c9a6177a",
  "dist/development/reflexos-v4/single-filter-review.json": "e5df2a11bee0bb6ce30f2df3f7e0813114710b98fc0d68813a63e8af565d7063",
  "dist/development/reflexos-v4/ui-validation.json": "b438183ab6f024aae2ae72405c71b402e0f4f2ec6bf7c1099365c8d6edbcf74b",
  "dist/development/reflexos-v4/validation-report.json": "611bd1b5ced9f53d34cbd7efce2fbf27ed489ef395421a8f8a3375a2c1b43fcb",
  "dist/direct-actions.mjs": "60f8c4e1ea98098630fea01a90a18176b173bb32ad429cd82dd3fcc9d01cd69e",
  "dist/direct-hints.mjs": "3549757289de587dff296393dbbc12144491a5cd3b620f54746b1060d7f3bcb9",
  "dist/direct-input.mjs": "06d1b69b3498747d6fe083d038cf8140dccb3d28d87ff7877baa195ea954362c",
  "dist/elo-campaign-answers.mjs": "23391104b128a0cfbc25dffd57317ae51d922e1454c7adfc0fab95de73513b49",
  "dist/elo-campaign.mjs": "df90fd2d0d7e6edea676294afef9827a7caddde965c2fc17f68ce81e60e7fc78",
  "dist/elo-presentation.mjs": "039ddc4deef1af32e9c8ea034808f816a8e359ff5709847449e2a35a5413c34b",
  "dist/elo-progress.mjs": "72cab58f9613f5892bb1663eda406329db6bd4a8b1b72a081929ebd929730433",
  "dist/elo-rules.mjs": "af5e6278aa156d9652d1a4462c05fa083f8b0926bb6113a0c8502ca339425e3f",
  "dist/endless-collection.mjs": "b07a3717a1f317e1b937ff7dff2d1d7686b22097fe90acabd31b166e1c0eac4c",
  "dist/endless-original.mjs": "ea846684591a04edcc89e741b7f1cce424cd447c1289a1d390ce346ad2da9183",
  "dist/endless.css": "394dfe79012c21a25bb7ffb14b9410c475af4d074181da1dadf61a7ae1f99415",
  "dist/game-info-content.mjs": "e5ac25dca1f5a20c5546d0374991205957fb8ac941667ff9b7ca3856998c42b4",
  "dist/game-info.css": "d8ed3d872fca93383f506fa0cd0464abe5f5176f32eaca17582c978c08f3b42f",
  "dist/game-info.mjs": "29a567ffa0382ecafcb5f4b8443289a5b8143e61e7c027f7189901e4f8e5ee56",
  "dist/game-nav-scroll.mjs": "ebebf42b7199dbf3fbf73890a13b48216c0439e74113d8c8b5f19eb1bbd63142",
  "dist/geometry-answers.mjs": "62904678fbda8d3045074dc3a8aa9cdf7c84a9ddcf7214adbcb49ebbd093e45f",
  "dist/geometry-check-worker.mjs": "f603569fdce94324d16c0bccbf01ec7bc893b5c67a02725b88d4bce8758f25ff",
  "dist/geometry-check.mjs": "9ae6137bf2ab1d0262a721cbd1cd28ba482e248a6ba93258d8aefa963519b080",
  "dist/geometry-games.mjs": "aeef1e21215f88eecf7763510542924c9fbf935a24814d7cc7d8f370ba545929",
  "dist/geometry-levels.mjs": "592caafcc9f4c5ea5604fcd466c52c60536085cfde570cd2d7c6da95c956300a",
  "dist/index.html": "19cfc9252a2a650178cbf567ce1a4ce998f1854119899e811bf8c76056dc9c0c",
  "dist/json-examples/cut.json": "a3ca12a60a1ada6b79a6ac8bbad861e03e3e6414e1c4875fc877c712fa3dd59d",
  "dist/json-examples/desvio.json": "7c0df3cb674026140027bdb699fb58b2965db79d90c23f47e5b1820bbd9f845e",
  "dist/json-examples/elo.json": "636b1ee77efb0b5245007186646a83f5a18cc43490165ef0fa9bd92a592a3923",
  "dist/json-examples/light.json": "a962668d05ba66cb7aa890ffc3706a8ea96356b0c3687f4181db20b9aded1479",
  "dist/json-examples/pacto.json": "c7662a528096071ce146627be34f5cfb753616bf88880dc28136bb31eec69548",
  "dist/json-examples/prumo.json": "3e8ad83c3238cc5f1ccb9f444ac62d6a7416e72056344fc3a8443c54d136fbef",
  "dist/level-json-common.mjs": "0832471b15dab7f436504e7ff5b691e5197fe95f3adbb86bc30ecaaa24ab150d",
  "dist/levels.mjs": "94c91747c87c350aeb35aaf0db98ea28d0dfe46b734a9f7b8c75664a5cae7abd",
  "dist/light-campaign-progress.mjs": "2233326d2910c14f1b1f652e9fff388c6c9ecc92645d2aec8a300305182b949c",
  "dist/light-render.mjs": "c4648d9d0bbbfc05e1e365b206df5d3b3c03858bd64ba35a1bad4e9d11318953",
  "dist/light-world-render.mjs": "098ad0b7292157d209f59eccf3954ed1e83b6f9f12fefd8330131b8bc3d5611d",
  "dist/light-world.mjs": "120cd6cebe51cc59e6bbd346b1ecbb6455275a1bd9ec1ccd25c793c77ef44774",
  "dist/logo.css": "0cbf900df9888694e982b4cf5676fc80367ff15d69fd2da69d73a4de4e4a9897",
  "dist/math.mjs": "8222cbd8d6bf09c26c74d06bf12d1bc398c76b5afadbc98cb5a32fab23d5b096",
  "dist/middle-confirm.mjs": "5e4a14bda494f7ff8087919cd0357766bc5f2d81b50cb26c246cca60796ee469",
  "dist/original-answers.mjs": "2eb86f19f1cb06708245990903106a0bb6096ac016f2cd10ae47e465d214464c",
  "dist/original-hints.mjs": "5b30652b0324e8826bf307e834987fbb1beb0a29c15e40538e3982373e2e0cc7",
  "dist/original-json.mjs": "8cacc01a85082025dc94ab31ee8a0a14cf0687646971627feb5fb8097fe8d6b7",
  "dist/pacto-check.mjs": "279d17a03112fa90ddf64219d165e6a55c528dbb766e26ca10d663521a537940",
  "dist/pacto-feedback.mjs": "9b05cc740854185503d77860681aaaa8dd4fa1dfa5d2066568c63c7d6d981520",
  "dist/platform-assets/active-flower.svg": "6f68f0aba69d63be53952963ba3074e182d9d45d085c3eae354bce208fc0baf7",
  "dist/platform-assets/content-frame-curve-left.svg": "d28d972590f8d3fda45de0361540a4ee091a4ad8387bec78e74e62d60977f096",
  "dist/platform-assets/content-frame-curve-right.svg": "7f5cdcf4a1ce03a34640686a65cccd58e3cb6d7c3bf986b7b3aaec21fd5afda4",
  "dist/platform-assets/continuous-crown-left.svg": "9ff9932b4b1fd4fee06dec320ccf43c448ea0083bc0ccb20d50eb6d079921c71",
  "dist/platform-assets/continuous-crown-right.svg": "739af451e3edcdd1436f7cee12232888bf17bf01ca87e77a28fc7c47abd00bb9",
  "dist/platform-assets/continuous-root-left.svg": "d6423c3c635f9cf9672c6ba26ede53cfc69b266119ef36e37e59bd07716f6d30",
  "dist/platform-assets/continuous-root-right.svg": "9982e07b9b369878ce7a5316c1ada8235e774a4896d112dbc101223efca59753",
  "dist/platform-assets/flower-green-original.png": "4651cd8603999ad9ff6abb6ada2b8bd83c721719f8df899a83504a4cec8b42df",
  "dist/platform-assets/flower-white-original.png": "29f33ef8990e5bda53f566ab687b8336e84de0d95523cf7235031dd0852a35fc",
  "dist/platform-assets/foliage-shape-1.svg": "d53f19c6e44566d5422bcd2c0291873271b676fd90d1e100ffbaecbcb641c07b",
  "dist/platform-assets/foliage-shape-2.svg": "8dfcb8e0a0accd08bced603f82b78aeb9921d5831a945643f5825cd52b0145ce",
  "dist/platform-assets/foliage-shape-3.svg": "844787cce027929a6f5e3ae5ca4f94a65edc775a2c80ffe2aa56a4c0d7a6b148",
  "dist/platform-assets/foliage-shape-4.svg": "9cd3707869872bdea902302de78ecd1c19198029196239c9c31bf357a4476a85",
  "dist/platform-assets/foliage-shape-5.svg": "4b4d19839d021a2ff5099969ae53205e9f68eb84c452177af32e79feae4c5500",
  "dist/platform-assets/header-tree-frame.svg": "2905f656215c19c7c95ddae3357e02886aed8f8262e922ff23f0cecf19aaeaa9",
  "dist/platform-assets/hero-frame-curve-left.svg": "0507968edf0b6a89f47a5c135b46f3c10546af3dca489d6f3bfdb9b7dd4300f7",
  "dist/platform-assets/hero-frame-curve-right.svg": "9fbaa2bb48e821658d37cd0e57548fd09432801000991dfe36a3e33e7ea6da31",
  "dist/platform-assets/intuicao-logo-original.png": "4a82a6005a4003ccda9f415e38907d810163da5ec368174720c80da5d111e14a",
  "dist/platform-assets/intuicao-pixel.woff": "d2b25bb285a654f02951b64a2beff2c7653879e3adcee7409738ee571e06d31b",
  "dist/platform-assets/leaf-clay.svg": "3f32557c3a6db1e04b99a9d9488e56407ba64e2a8e2db1a89c28881e1b73ba7c",
  "dist/platform-assets/leaf-floor.svg": "509ecc448f4edaddc19269af8ed617e890b3d9fc8a9a32caae69a7814d11c932",
  "dist/platform-assets/leaf-honey.svg": "237cb11e348821e01beb1702869d88bfeab91c8b24ade953e12518189cd619ae",
  "dist/platform-assets/leaf-pile-growth-1.svg": "6334088dd9dccc3d0dab5fa2f4dd6d7c54e7c57003303c6b62ad46a078112eb4",
  "dist/platform-assets/leaf-pile-growth-2.svg": "4230c60ba7d8a6b87a7ec21d95ce9c4c7a0fbdab748e4516986b83bdc910834d",
  "dist/platform-assets/leaf-pile-growth-3.svg": "18db105c1c2a9a2e8cfd2d32a5c98e6e36a243616f7434f0823eb01bd7abb173",
  "dist/platform-assets/leaf-pile-growth-4.svg": "0ec8ecc635f9d30fba75f9151ce46955b0a0a2aeb2e2a526d1775f88a558e64e",
  "dist/platform-assets/leaf-pile-growth-5.svg": "10a58e0639f8cd0b9321a57256152e6847bb27d20bbd489bf99e25fb1a3118a6",
  "dist/platform-assets/leaf-pile-growth-6.svg": "87dc72f80590d332fadcffe3fd3af35cd5a198f36672f85380d8ad10b587cbda",
  "dist/platform-assets/leaf-piles-base.svg": "57def29bfb6431000501d7ee476dd0d81995e693c302e8ac85cc9f7be5b6c164",
  "dist/platform-assets/leaf-sage.svg": "e11a9be7b5fe4897737082c28af3105ecb837e076dad89ab4c4def17cfca5e24",
  "dist/platform-assets/leaf-seal.svg": "783ebad5b01919a1cbbe361645983c7099b2f6d7b58449ca92cc6ecb54ff621e",
  "dist/platform-assets/leaf.svg": "317117d843319247662c7e977bc75a6eda8556c48a0eaef4e598a3650a2edca1",
  "dist/platform-assets/paper-marks.svg": "4fca27f70866cc7bb85bf5325f8d0f5271fdd21982eda9055b40bb3fb527e534",
  "dist/platform-assets/quiet-garden.svg": "6af3f9a28fcdb81112855a325d2c00ab0362f20b7d9a15028f3e4265f2e6926e",
  "dist/platform-assets/soft-crown-left.svg": "9116fdd70cd5a33f4b21c322eeb36634d4a3d07a0b2c9263284bb36a30c7d3ff",
  "dist/platform-assets/soft-crown-right.svg": "4ada816ca1ca7372d0bfd53e27e223c9345198bda2923d7857155623cba17e6c",
  "dist/platform-assets/tree-canopy-diverse.svg": "7103957ba26b5c44f3c91c83dc69ed53e795e7fb2950191ae20a01924183b893",
  "dist/platform-assets/tree-canopy-natural-filled.svg": "518a4dadae57d5dd59114ea4821654ea33b5e31d8a59ab090bd61edb01e8abb8",
  "dist/platform-assets/tree-canopy-pixel.svg": "2b14f54bfa476ce509656456a8f81855126e71bbf0d762e82f303913968fb44f",
  "dist/platform-assets/tree-canopy-softedge-fine.svg": "656e22b5e13ce6902e0b286645bdb69452427749e70ba8e1914d39d1babd8e81",
  "dist/platform-assets/tree-canopy-softedge.svg": "cc2638e55c567b4f1b1f83446cc2e42260d60d508b656c60cbbf0f6c224f8753",
  "dist/platform-assets/tree-canopy-varied.svg": "05a4c7ccd8b12489224fcb5c6d1345c82de4165a253641e7ebf0c1ba0421dbf8",
  "dist/platform-assets/tree-canopy.svg": "3b3ef825dfb5b488609d912e617eafd731c3e5978cf3e38fff91ee00a6896fc9",
  "dist/platform.css": "b0c201e7d95ce553e928a3fb2855b3a14ba103fa2a8e58aa53563e1f9b312682",
  "dist/restart-confirmation.mjs": "eee542641a07ef0e49c05e57cfd04a34c70a111a59d5c4f5bcc9aa67a5c7b941",
  "dist/result-motion.mjs": "dc93148badfb32d39bcf4220f5b7913a96900cb6aaa76028ccfccbb3cd06f06f",
  "dist/rules-context.mjs": "611dab72638b02a97122074100902f2a875989595a7d1669cacde04f71dbc67e",
  "dist/rules-sidebar.css": "64a3f7dba6b02c39bc57fca7fae6544984d9e6adc0a50c4e86011a52cedffe80",
  "dist/style.css": "e3af2684f136f737ba207837c8a261109fd85735373aed0700e37a6cbd0e28bd",
  "dist/symbol-games.mjs": "ff5b6830ca4cb1ebaeb55de68f0ea84303a8393826345dfccf8b936b49b8d122",
  "dist/symbol-levels.mjs": "13d931b4c162c927f71dc2e7389a99b78aca02aeca80657fb3464e1adc8214ca"
};

export function testProtectedBytes() {
 for(const [name,expected]of Object.entries(PROTECTED_FILES))assert.equal(sha(fs.readFileSync(new URL('../'+name,import.meta.url))),expected,'Protected baseline bytes changed: '+name);
 const source=fs.readFileSync(new URL('../dist/light-levels.mjs',import.meta.url),'utf8');
 const dataOnly=source.replace(/^\s*(?:\/\/[^\n]*(?:\n|$)|\/\*[\s\S]*?\*\/)\s*/g,'');
 const match=dataOnly.match(/^export const lightLevels\s*=\s*([\s\S]*?);?\s*$/);
 assert.ok(match,'Runtime module must be only a data export, not a progress migration or executable wrapper.');
 assert.deepEqual(JSON.parse(match[1].replace(/;\s*$/,'')),lightLevels,'Runtime export differs from the data-only JSON definition.');
 return {passed:true,baseCommit:BASELINE_COMMIT,protectedFiles:Object.keys(PROTECTED_FILES).length,protectedCategories:['ray engine and math/tolerances','controls and input','app and ID-keyed progress','renderers/CSS/HTML','platform assets/fonts','all other games and their content','previous v4 development evidence'],dataOnlyRuntime:true};
}

export function assertArchivedDefinitions(previous,legacy) {
 assert.equal(previous.length,500);assert.equal(legacy.length,200);
 assert.equal(new Set(previous.map(l=>l.id)).size,500,'Previous archive IDs must be distinct.');
 assert.equal(new Set(legacy.map(l=>l.id)).size,200,'Original archive IDs must be distinct.');
 assert.equal(jsonSHA(previous),BASELINE_PREVIOUS_DEFINITIONS,'previous-500.json must preserve every field of all baseline definitions exactly.');
 assert.equal(jsonSHA(previous.map(l=>({id:l.id,oldNumber:oldNumber(l),puzzleHash:puzzleFingerprint(l)}))),BASELINE_PREVIOUS_PUZZLES,'Previous campaign identity/number/puzzle digest changed.');
 assert.equal(jsonSHA(legacy),BASELINE_LEGACY_DEFINITIONS,'legacy-200.json must preserve the exact original archive.');
}

export function assertIdentityMapping(previous,current,mapping,{legacy=[]}={}) {
 assert.equal(current.length,previous.length);assert.equal(mapping.length,previous.length);
 const currentById=new Map(current.map(l=>[l.id,l])),oldById=new Map(previous.map(l=>[l.id,l])),mapById=new Map(mapping.map(m=>[m.id,m]));
 assert.equal(currentById.size,current.length,'Duplicate runtime identities.');assert.equal(mapById.size,previous.length,'Duplicate mapping identities.');
 for(const row of mapping)assert.ok(oldById.has(row.id),'Unknown previous ID in identity map: '+row.id);
 const archivedById=new Map([...legacy,...previous].map(l=>[l.id,l]));
 let retained=0,replaced=0;
 for(const [i,level]of current.entries()){
  assert.equal(typeof level.id,'string');assert.ok(level.id.length>0&&level.id.length<=200);
  const old=previous[i],samePuzzle=puzzleFingerprint(level)===puzzleFingerprint(old);
  assert.equal(oldNumber(level),i+1,'Current numbering must stay stable.');
  if(archivedById.has(level.id))assert.equal(puzzleFingerprint(level),puzzleFingerprint(archivedById.get(level.id)),'A retained old ID identifies changed puzzle content: '+level.id);
  else assert.match(level.id,/^light-v5-/,'Changed content must receive a new v5 identity: '+level.id);
  if(samePuzzle)assert.equal(level.id,old.id,'Unchanged same-slot content must retain its identity/history.');
  else {assert.notEqual(level.id,old.id,'Changed same-slot content must not reuse the old identity.');assert.match(level.id,/^light-v5-/,'Every redesigned slot must receive a new v5 identity.');}
 }
 for(const old of previous){
  const row=mapById.get(old.id),retainedLevel=currentById.get(old.id),slot=current[oldNumber(old)-1];
  assert.ok(row,'Missing previous mapping: '+old.id);assert.equal(row.oldNumber,oldNumber(old));assert.equal(row.puzzleHash,puzzleFingerprint(old));
  assert.ok(typeof row.treatment==='string'&&row.treatment.trim().length>20,'Each previous identity requires an explicit preservation/redesign treatment.');
  if(retainedLevel){
   retained++;assert.equal(oldNumber(retainedLevel),oldNumber(old),'V5 does not reassign old numbers.');assert.equal(row.newNumber,oldNumber(retainedLevel));assert.equal(row.replacementId,null,'Retained identity cannot name a replacement.');
  }else{
   replaced++;assert.equal(row.newNumber,null,'Retired ID must not be mapped to a new level number.');assert.equal(row.replacementId,slot.id,'Replacement must identify the actual redesigned slot.');assert.ok(!oldById.has(row.replacementId),'Redesigned content cannot appropriate another previous identity.');
  }
 }
 return {retainedPreviousIds:retained,replacedPreviousIds:replaced};
}

export function testSyntheticHistory(previous,current) {
 const DRAFTS='intuicao.campaign.original.v1',ANSWERS='intuicao.answers.v1';
 const oldIds=new Set(previous.map(l=>l.id)),drafts={},answers={};
 previous.forEach((level,i)=>{
  const state=originalLevelState({...level,game:'light'}),mirror=state.objects.find(o=>o.type==='mirror');
  if(mirror)mirror.angle=Math.max(-90,Math.min(90,mirror.angle+(i%2?0.5:-0.5)));
  assert.equal(validOriginalSnapshot({...level,game:'light'},state),true,'Synthetic old draft must be valid: '+level.id);
  drafts['light:'+level.id]={state,cutMode:'basic',cutDrafts:{basic:null,advanced:null}};
  answers['light:'+level.id]={failures:(i%7)+1,assisted:i%3===0};
 });
 drafts['cut:preserve-cut-sentinel']={state:{keep:'cut draft'}};answers['cut:preserve-cut-sentinel']={failures:11,assisted:true};
 const otherStores=new Map([
  [DRAFTS,JSON.stringify(drafts)],[ANSWERS,JSON.stringify(answers)],
  ['intuicao.endless.original.v1',JSON.stringify({light:{seed:54321,count:17,failures:3},cut:{seed:4,count:9}})],
  ['intuicao.custom.original.v1',JSON.stringify({'custom-sentinel':{keep:'custom'}})],
  ['intuicao.collection.v1',JSON.stringify({keep:'other games'})],['intuicao.advanced-hidden','true']
 ]);
 const stored=new Map(otherStores),writes=[],reads=[];
 const originalRaw=JSON.stringify({version:1,completedIds:[...oldIds],lastLevelId:previous.at(-1).id,unknown:{keep:'future-compatible metadata'}});
 stored.set(LIGHT_CAMPAIGN_PROGRESS_KEY,originalRaw);
 const storage={getItem:key=>{reads.push(key);return stored.get(key)??null;},setItem:(key,value)=>{writes.push({key,value});stored.set(key,value);}};
 const progress=createLightCampaignProgress(storage),failureProgress=createAnswerProgress(storage),before=progress.snapshot();
 assert.deepEqual(before.completedIds,oldIds);assert.equal(before.lastLevelId,previous.at(-1).id);assert.equal(writes.length,0,'Loading previous history must not rewrite storage.');
 const newLevels=current.filter(l=>!oldIds.has(l.id));
 for(const level of current){
  const key='light:'+level.id;
  assert.equal(before.completedIds.has(level.id),oldIds.has(level.id),'A new identity inherited completion from its display number.');
  assert.deepEqual(failureProgress.get(key),oldIds.has(level.id)?answers[key]:{failures:0,assisted:false},'Failure/assistance migrated to a different puzzle.');
  const draft=JSON.parse(stored.get(DRAFTS))[key];
  if(oldIds.has(level.id))assert.equal(validOriginalSnapshot({...level,game:'light'},draft.state),true,'Retained old identity lost its compatible draft.');
  else assert.equal(draft,undefined,'A new identity inherited an old draft.');
 }
 assert.equal(writes.length,0,'Read-only inspection must not rewrite saves.');
 if(newLevels.length){
  const first=newLevels[0];assert.equal(progress.visit(first.id),true);assert.equal(progress.complete(first.id),true);
  const reloaded=createLightCampaignProgress(storage).snapshot();
  for(const id of oldIds)assert.ok(reloaded.completedIds.has(id),'Saving a new completion erased retired history.');
  assert.equal(reloaded.completedIds.size,oldIds.size+1);assert.equal(reloaded.lastLevelId,first.id);
  for(const l of newLevels.slice(1))assert.equal(reloaded.completedIds.has(l.id),false,'One completion transferred to another new identity.');
  assert.deepEqual(JSON.parse(stored.get(LIGHT_CAMPAIGN_PROGRESS_KEY)).unknown,{keep:'future-compatible metadata'});
  const count=writes.length;progress.visit(first.id);progress.complete(first.id);assert.equal(writes.length,count,'Duplicate renders must remain idempotent.');
 }
 for(const [key,raw]of otherStores)assert.equal(stored.get(key),raw,'Progress changed an unrelated store: '+key);
 assert.ok(writes.every(w=>w.key===LIGHT_CAMPAIGN_PROGRESS_KEY),'Progress wrote outside its own key.');
 if(newLevels.length){
  const key='light:'+newLevels[0].id;assert.deepEqual(failureProgress.fail(key),{failures:1,assisted:false});
  const after=JSON.parse(stored.get(ANSWERS));
  for(const [id,value]of Object.entries(answers))assert.deepEqual(after[id],value,'New failure reset an old record: '+id);
  for(const l of newLevels.slice(1))assert.deepEqual(failureProgress.get('light:'+l.id),{failures:0,assisted:false});
 }
 assert.equal(stored.get(DRAFTS),otherStores.get(DRAFTS),'All old drafts must remain exact even for retired IDs.');
 for(const [key,raw]of otherStores)if(key!==ANSWERS)assert.equal(stored.get(key),raw);
 return {passed:true,oldCompletedIds:oldIds.size,oldDrafts:previous.length,oldFailureRecords:previous.length,newIdentities:newLevels.length,readOnlyLoad:true,retiredHistoryRetained:true,noCompletionTransfer:true,noDraftTransfer:true,noFailureTransfer:true,noGlobalReset:true,realStorageAccessed:false};
}

export function runPreservationSelfTests() {
 const base={id:'light-v4-fixture',number:1,campaignNumber:1,objects:[{type:'mirror',x:300,y:230,length:124.8,angle:-30}],sources:[{x:100,y:230,angle:0,color:'gold'}],targets:[{x:300,y:380,radius:22,color:'gold'}],portals:[],solution:[45],sourceAngle:0,target:{x:300,y:380,radius:22,color:'gold'},requiredBounces:1};
 const previous=[base],same=structuredClone(base),changed={...structuredClone(base),id:'light-v5-fixture',solution:[44]};
 const retained=[{id:base.id,oldNumber:1,newNumber:1,puzzleHash:puzzleFingerprint(base),replacementId:null,treatment:'The identical puzzle and identity are explicitly retained.'}];
 assertIdentityMapping(previous,[same],retained);
 const replaced=[{...retained[0],newNumber:null,replacementId:changed.id,treatment:'The previous identity is archived while redesigned content receives a new ID.'}];
 assertIdentityMapping(previous,[changed],replaced);
 assert.throws(()=>assertIdentityMapping(previous,[{...changed,id:base.id}],retained),/changed puzzle content/);
 assert.throws(()=>assertIdentityMapping(previous,[{...same,id:'light-v5-unnecessary'}],replaced),/retain its identity/);
 assert.throws(()=>assertIdentityMapping(previous,[changed],[{...replaced[0],replacementId:'light-v5-wrong'}]),/actual redesigned slot/);
 const history=testSyntheticHistory(previous,[changed]);
 return {passed:true,checks:['unchanged ID exact puzzle hash','changed content new ID','unchanged content retains ID','explicit correct replacement mapping','old completion/draft/failure preservation','new identity inherits no completion/draft/failures','no reset or real storage'],history};
}

export function testV5Preservation({
 records=readJSON(artifactURL('records.json')),
 evidence=readJSON(artifactURL('evidence-records.json.gz')),
 replay=readJSON(artifactURL('replay-results.json.gz')),
 selection=readJSON(artifactURL('selection.json')),
 previous=readJSON(artifactURL('previous-500.json')),
 mapping=readJSON(artifactURL('previous-500-map.json')),
 legacy=readJSON(artifactURL('legacy-200.json')),
 runtimeLevels=lightLevels
}={}) {
 const selfTests=runPreservationSelfTests(),protectedBytes=testProtectedBytes();
 for(const [name,array,count]of [['records',records,500],['evidence',evidence,500],['replay',replay,500],['selection',selection,500],['runtime',runtimeLevels,500],['previous',previous,500],['mapping',mapping,500],['legacy',legacy,200]]){
  assert.ok(Array.isArray(array),name+' must be an array.');assert.equal(array.length,count,name+' count mismatch.');
 }
 assertArchivedDefinitions(previous,legacy);
 const identity=assertIdentityMapping(previous,runtimeLevels,mapping,{legacy}),freshReplay=[];
 for(const [i,record]of evidence.entries()){
  const level=record.level,entry=selection[i],brief=records[i];
  assert.deepEqual(runtimeLevels[i],level,'Evidence/runtime mismatch at '+(i+1));assert.deepEqual(brief.level,level,'Compact records/evidence mismatch at '+(i+1));
  assert.equal(entry.id,level.id);assert.equal(entry.band,expectedBand(i));assert.equal(level.campaignBand,entry.band);assert.equal(level.number,i+1);assert.equal(level.campaignNumber,i+1);
  assert.equal(entry.review?.approved,true,'Explicit editorial approval missing: '+level.id);assert.ok(entry.review.reason?.trim().length>25,'Substantive editorial reason missing: '+level.id);assert.deepEqual(record.editorial.review,entry.review);
  assert.equal(record.developmentFingerprint,puzzleFingerprint(level),'Stale evidence puzzle fingerprint: '+level.id);assert.equal(brief.developmentFingerprint,puzzleFingerprint(level),'Stale compact fingerprint: '+level.id);
  assert.deepEqual(brief.cases.map(c=>({id:c.id,angles:c.angles,expectedStatus:c.expectedStatus,sourceIndices:c.sourceIndices})),record.cases.map(c=>({id:c.id,angles:c.angles,expectedStatus:c.expectedStatus,sourceIndices:c.sourceIndices})),'Compact/evidence case catalogue mismatch.');
  const fresh=validateRecord(record);assert.equal(fresh.passed,true,'Fresh record validation failed for '+level.id+': '+fresh.errors.join(', '));
  assert.deepEqual(replay[i],JSON.parse(JSON.stringify(fresh)),'Cached replay is stale or incomplete: '+level.id);freshReplay.push(fresh);
 }
 const history=testSyntheticHistory(previous,runtimeLevels);
 return {passed:true,baselineCommit:BASELINE_COMMIT,protectedBytes,definitions:runtimeLevels.length,archivedPreviousDefinitions:previous.length,archivedOriginalDefinitions:legacy.length,...identity,history,selfTests,replay:{records:freshReplay.length,passed:freshReplay.filter(r=>r.passed).length,individualHalfDegreeTests:freshReplay.reduce((n,r)=>n+r.individualPerturbations,0),simultaneousCorners:freshReplay.reduce((n,r)=>n+r.simultaneousCorners,0),allCornersExhaustive:freshReplay.every(r=>r.cornersExhaustive)},baselinePreviousDefinitionHash:BASELINE_PREVIOUS_DEFINITIONS,baselineLegacyDefinitionHash:BASELINE_LEGACY_DEFINITIONS,limitations:['Exact protected byte hashes, identities and compiler puzzle-field fingerprints, not a human difficulty or continuous-angle uniqueness claim.','Only explicit in-memory storage is used. No browser or real user storage is accessed.','Numbering and presentation may describe redesigned content, but never move progress to its replacement identity.']};
}

if(isMain(import.meta.url)) {
 try {printReport(process.argv[2]==='--self-test'?runPreservationSelfTests():testV5Preservation(),process.argv[2]==='--self-test'?process.argv[3]:process.argv[2]);}
 catch(error){printReport({passed:false,pending:error.code==='ENOENT',error:error.message,limits:'Missing final artifacts are pending, never a successful skip. Real user storage is never accessed.'});process.exitCode=1;}
}
