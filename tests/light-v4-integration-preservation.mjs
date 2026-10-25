// Exact authorization boundary for the campaign integration only.
// Baseline is the task's supplied revision, not newly accepted engine/UI hashes.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const sha=value=>crypto.createHash('sha256').update(value).digest('hex');
const baseline="50d2d4338a37b52187cb2aed39449a3842ff2e8e",appHash="3f21520e9251b5558f044a64578a8c02cb3e92e0a7aa57397f1c8dde3b01cb69";
const authorizedBlocks=[
  {
    "before": "import {lightLevels,cutLevels} from './levels.mjs';\nimport {createAnswerProgress} from './answer-progress.mjs';\nimport {getOriginalAnswer} from './original-answers.mjs';\nimport {buildOriginalHint} from './original-hints.mjs';\n",
    "after": "import {lightLevels,cutLevels} from './levels.mjs';\nimport {createAnswerProgress} from './answer-progress.mjs';\nimport {createLightCampaignProgress} from './light-campaign-progress.mjs';\nimport {getOriginalAnswer} from './original-answers.mjs';\nimport {buildOriginalHint} from './original-hints.mjs';\n"
  },
  {
    "before": "}\nconst completed=new Set();const lastLevel={light:null,cut:null};\nfunction showSelection(){finishOriginalGesture(false);endDrag();saveCampaign();saveCustom();campaignActive=null;customLevel=null;customId='';customImportRevision++;customStorage.hidden=true;customExport.hidden=true;resetOriginalHint();saveEndless();free=false;endlessPanel.hidden=true;restartConfirmation.dismiss();restartRevision++;placementMessage='';pendingSlot=null;invalidate();drag=null;document.querySelector('.lab').hidden=true;$('selection').hidden=false;document.querySelectorAll('[data-game]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.game===game)));$('selection-title').textContent={light:'Reflexos ·',cut:'Corte certo ·'}[game];let html='';for(let k=0;k<catalogue[game].length;k+=10){if(game==='light')html+=`<h3 class=\"stage-heading\">${catalogue.light[k].stage} · ${catalogue.light[k].stageName}</h3>`;if(game==='cut')html+=`<h3 class=\"stage-heading\">${['1 · Uma direção por vez','2 · Parábolas e vazios','3 · Ondas e recortes','4 · Curvas em S','5 · Silhuetas irregulares','6 · Vazios maiores','7 · Bordas abertas','8 · Recortes combinados','9 · Área que resta','10 · Síntese de formas'][k/10]}</h3>`;html+='<div class=\"level-group\">'+catalogue[game].slice(k,k+10).map((l,j)=>{const i=k+j,done=completed.has(game+i),assisted=answerProgress.get(`${game}:${l.id??i}`).assisted,current=lastLevel[game]===i;return `<button class=\"level-tile ${done?'done':''}\" data-level=\"${i}\" aria-current=\"${current}\" aria-label=\"Nível ${i+1}: ${l.name}${done?', concluído':''}${assisted?', assistido por gabarito':''}${current?', atual':''}\"><span>${i+1}</span><small>${done?(assisted?'✓ com gabarito':'✓ concluído'):assisted?'com gabarito':current?'atual':'explorar'}</small></button>`;}).join('')+'</div>';}$('level-grid').innerHTML=html;$('level-grid').querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{level=Number(b.dataset.level);free=false;start();});renderOriginalImport();$('selection-title').focus();}\n\nlet phase='editing',evaluation=null,frame=0,animationToken=0,revealed=[],lightDistance=0,lightFired=[];\n",
    "after": "}\nconst completed=new Set();const lastLevel={light:null,cut:null};\nconst lightCampaignProgress=createLightCampaignProgress();\nconst lightCampaignBands=[['basic','Básico',1,200],['intermediate','Intermediário',201,300],['advanced','Avançado',301,400],['master','Mestre',401,500]];\nconst lightCampaignNumber=(l,i)=>Number.isInteger(l.campaignNumber)&&l.campaignNumber>=1&&l.campaignNumber<=500?l.campaignNumber:i+1;\nfunction lightCampaignSelection(){\n const progress=lightCampaignProgress.snapshot();let html='';\n const entries=catalogue.light.map((l,i)=>({l,i,number:lightCampaignNumber(l,i)}));\n for(const [band,name,first,last] of lightCampaignBands){\n  const levels=entries.filter(({l,number})=>(l.campaignBand??lightCampaignBands.find(([, ,a,b])=>number>=a&&number<=b)?.[0])===band);\n  if(!levels.length)continue;\n  html+=`<h3 class=\"stage-heading\" data-campaign-band=\"${band}\">${name} · ${first}–${last}</h3>`;\n  let groupOpen=false,previousStage;\n  for(const {l,i,number} of levels){\n   const stage=band==='basic'&&l.stageName?`${l.stage==null?'':l.stage+' · '}${l.stageName}`:'';\n   if(!groupOpen||stage!==previousStage){\n    if(groupOpen)html+='</div>';\n    if(stage)html+=`<h4 class=\"stage-heading\">${stage}</h4>`;\n    html+=`<div class=\"level-group\" data-campaign-band=\"${band}\">`;groupOpen=true;previousStage=stage;\n   }\n   const done=progress.completedIds.has(l.id),assisted=answerProgress.get(`light:${l.id??i}`).assisted,current=progress.lastLevelId===l.id;\n   html+=`<button class=\"level-tile ${done?'done':''}\" data-level=\"${i}\" aria-current=\"${current}\" aria-label=\"Nível ${number}: ${l.name}${done?', concluído':''}${assisted?', assistido por gabarito':''}${current?', atual':''}\"><span>${number}</span><small>${done?(assisted?'✓ com gabarito':'✓ concluído'):assisted?'com gabarito':current?'atual':'explorar'}</small></button>`;\n  }\n  if(groupOpen)html+='</div>';\n }\n return html;\n}\nfunction showSelection(){finishOriginalGesture(false);endDrag();saveCampaign();saveCustom();campaignActive=null;customLevel=null;customId='';customImportRevision++;customStorage.hidden=true;customExport.hidden=true;resetOriginalHint();saveEndless();free=false;endlessPanel.hidden=true;restartConfirmation.dismiss();restartRevision++;placementMessage='';pendingSlot=null;invalidate();drag=null;document.querySelector('.lab').hidden=true;$('selection').hidden=false;document.querySelectorAll('[data-game]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.game===game)));$('selection-title').textContent={light:'Reflexos ·',cut:'Corte certo ·'}[game];let html=game==='light'?lightCampaignSelection():'';if(game!=='light')for(let k=0;k<catalogue[game].length;k+=10){if(game==='cut')html+=`<h3 class=\"stage-heading\">${['1 · Uma direção por vez','2 · Parábolas e vazios','3 · Ondas e recortes','4 · Curvas em S','5 · Silhuetas irregulares','6 · Vazios maiores','7 · Bordas abertas','8 · Recortes combinados','9 · Área que resta','10 · Síntese de formas'][k/10]}</h3>`;html+='<div class=\"level-group\">'+catalogue[game].slice(k,k+10).map((l,j)=>{const i=k+j,done=completed.has(game+i),assisted=answerProgress.get(`${game}:${l.id??i}`).assisted,current=lastLevel[game]===i;return `<button class=\"level-tile ${done?'done':''}\" data-level=\"${i}\" aria-current=\"${current}\" aria-label=\"Nível ${i+1}: ${l.name}${done?', concluído':''}${assisted?', assistido por gabarito':''}${current?', atual':''}\"><span>${i+1}</span><small>${done?(assisted?'✓ com gabarito':'✓ concluído'):assisted?'com gabarito':current?'atual':'explorar'}</small></button>`;}).join('')+'</div>';}$('level-grid').innerHTML=html;$('level-grid').querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{level=Number(b.dataset.level);free=false;start();});renderOriginalImport();$('selection-title').focus();}\n\nlet phase='editing',evaluation=null,frame=0,animationToken=0,revealed=[],lightDistance=0,lightFired=[];\n"
  },
  {
    "before": " resetOriginalHint();\n restartConfirmation.dismiss();restartRevision++;\n placementMessage='';pendingSlot=null;invalidate();drag=null;$('selection').hidden=true;document.querySelector('.lab').hidden=false;if(!free&&!customLevel)lastLevel[game]=level; selected=0; const l=currentLevel();campaignActive=!free&&!customLevel?{game,id:l.id??level}:null;\n if(free){try{endlessGenerated=generateOriginalEndless(game,endlessRun.seed,endlessRun.options);}catch(error){free=false;showSelection();$('selection-title').textContent='Não foi possível gerar este desafio. Abra o modo livre e tente outra configuração.';return;}state=structuredClone(endlessGenerated.initial);endlessRun.solved=false;cutMode='advanced';cutDrafts={basic:null,advanced:null};if(game==='light')selected=state.objects.findIndex(o=>o.type==='mirror');}\n if(game==='light'&&!free){state={objects:structuredClone(l.objects),target:{...l.target,radius:22},sourceAngle:l.sourceAngle??0,...(!free?{sources:structuredClone(l.sources),targets:structuredClone(l.targets),portals:structuredClone(l.portals??[])}:{})};selected=state.objects.findIndex(o=>o.type==='mirror');}\n",
    "after": " resetOriginalHint();\n restartConfirmation.dismiss();restartRevision++;\n placementMessage='';pendingSlot=null;invalidate();drag=null;$('selection').hidden=true;document.querySelector('.lab').hidden=false;if(!free&&!customLevel&&game!=='light')lastLevel[game]=level; selected=0; const l=currentLevel();campaignActive=!free&&!customLevel?{game,id:l.id??level}:null;\n if(campaignActive&&game==='light')lightCampaignProgress.visit(l.id);\n if(free){try{endlessGenerated=generateOriginalEndless(game,endlessRun.seed,endlessRun.options);}catch(error){free=false;showSelection();$('selection-title').textContent='Não foi possível gerar este desafio. Abra o modo livre e tente outra configuração.';return;}state=structuredClone(endlessGenerated.initial);endlessRun.solved=false;cutMode='advanced';cutDrafts={basic:null,advanced:null};if(game==='light')selected=state.objects.findIndex(o=>o.type==='mirror');}\n if(game==='light'&&!free){state={objects:structuredClone(l.objects),target:{...l.target,radius:22},sourceAngle:l.sourceAngle??0,...(!free?{sources:structuredClone(l.sources),targets:structuredClone(l.targets),portals:structuredClone(l.portals??[])}:{})};selected=state.objects.findIndex(o=>o.type==='mirror');}\n"
  },
  {
    "before": " $('game-kicker').textContent='EXPERIMENTO '+titles[game][0];$('game-title').textContent=customLevel?customLevel.name:titles[game][1];\n $('scene-title').textContent=titles[game][1];$('scene-desc').textContent=game==='light'?'Gire os espelhos pelas alças. Clique nas fontes, ou use Tab e Enter ou Espaço, para disparar um raio de cada vez. Confirmar todos dispara o conjunto. Editar limpa os rastros.':'Use os controles rotulados abaixo ou ao lado. Arraste os elementos ajustáveis; o teclado também funciona nos controles. Clique na rodinha do mouse sobre o tabuleiro para avaliar a resposta.';\n $('level').innerHTML=catalogue[game].map((l,i)=>`<option value=\"${i}\">${i+1}. ${l.name}</option>`).join('');$('level').value=level;$('level').disabled=free||!!customLevel;\n $('level-prev').hidden=free||!!customLevel;$('level-next').hidden=free||!!customLevel;$('level-prev').disabled=level===0;$('level-next').disabled=level===catalogue[game].length-1;\n $('confirm').title=game==='cut'?'Também pode avaliar clicando na rodinha do mouse sobre o tabuleiro.':'';\n $('stage-label').textContent=customLevel?'FASE PERSONALIZADA':free?`ENDLESS · DESAFIO ${endlessRun.count+1}`:`DESAFIO ${String(level+1).padStart(2,'0')} / ${String(catalogue[game].length).padStart(2,'0')}`;\n $('mission').textContent=game==='light'?(free?'Ajuste os espelhos para cada cor chegar ao seu alvo, sem cruzar outra cor. As posições são fixas. Acertar gera o próximo desafio.':'Gire os espelhos. Clique em cada fonte para disparar separadamente, ou em Confirmar todos. Os raios ficam no palco; editar limpa todos. Cada cor deve alcançar seu próprio alvo, sem cruzar outra cor. Os símbolos também identificam cada par. Alvos aceitam 22 unidades de tolerância; espelhos e paredes têm posições fixas.'):(free?`Deixe ${state.target}% da área preenchida no lado roxo. Tolerância: ±3 pontos percentuais. Acertar gera o próximo desafio.`:`Deixe ${state.target}% da área no lado roxo. Tolerância: ±3 pontos percentuais, incluindo o limite.`);\n if(game==='light'&&!free)$('mission').textContent+=' '+(currentLevel().wallPurpose??[]).join(' ');\n",
    "after": " $('game-kicker').textContent='EXPERIMENTO '+titles[game][0];$('game-title').textContent=customLevel?customLevel.name:titles[game][1];\n $('scene-title').textContent=titles[game][1];$('scene-desc').textContent=game==='light'?'Gire os espelhos pelas alças. Clique nas fontes, ou use Tab e Enter ou Espaço, para disparar um raio de cada vez. Confirmar todos dispara o conjunto. Editar limpa os rastros.':'Use os controles rotulados abaixo ou ao lado. Arraste os elementos ajustáveis; o teclado também funciona nos controles. Clique na rodinha do mouse sobre o tabuleiro para avaliar a resposta.';\n $('level').innerHTML=catalogue[game].map((l,i)=>`<option value=\"${i}\">${game==='light'?lightCampaignNumber(l,i):i+1}. ${l.name}</option>`).join('');$('level').value=level;$('level').disabled=free||!!customLevel;\n $('level-prev').hidden=free||!!customLevel;$('level-next').hidden=free||!!customLevel;$('level-prev').disabled=level===0;$('level-next').disabled=level===catalogue[game].length-1;\n $('confirm').title=game==='cut'?'Também pode avaliar clicando na rodinha do mouse sobre o tabuleiro.':'';\n $('stage-label').textContent=customLevel?'FASE PERSONALIZADA':free?`ENDLESS · DESAFIO ${endlessRun.count+1}`:`DESAFIO ${String(game==='light'?lightCampaignNumber(currentLevel(),level):level+1).padStart(2,'0')} / ${String(catalogue[game].length).padStart(2,'0')}`;\n $('mission').textContent=game==='light'?(free?'Ajuste os espelhos para cada cor chegar ao seu alvo, sem cruzar outra cor. As posições são fixas. Acertar gera o próximo desafio.':'Gire os espelhos. Clique em cada fonte para disparar separadamente, ou em Confirmar todos. Os raios ficam no palco; editar limpa todos. Cada cor deve alcançar seu próprio alvo, sem cruzar outra cor. Os símbolos também identificam cada par. Alvos aceitam 22 unidades de tolerância; espelhos e paredes têm posições fixas.'):(free?`Deixe ${state.target}% da área preenchida no lado roxo. Tolerância: ±3 pontos percentuais. Acertar gera o próximo desafio.`:`Deixe ${state.target}% da área no lado roxo. Tolerância: ±3 pontos percentuais, incluindo o limite.`);\n if(game==='light'&&!free)$('mission').textContent+=' '+(currentLevel().wallPurpose??[]).join(' ');\n"
  },
  {
    "before": " $('feedback').textContent=placementMessage||(phase==='result'?(success?'Vitória! ':'Ainda não. ')+message:message);\n $('feedback').classList.toggle('success',success);$('feedback').classList.toggle('sr-only',phase==='result'&&!success&&!placementMessage);\n if(success&&!free&&!customLevel)completed.add(game+level);\n $('next').disabled=phase!=='result'||!success;$('next').textContent=level===catalogue[game].length-1?'Voltar ao início ↺':'Próximo desafio →';\n}\n",
    "after": " $('feedback').textContent=placementMessage||(phase==='result'?(success?'Vitória! ':'Ainda não. ')+message:message);\n $('feedback').classList.toggle('success',success);$('feedback').classList.toggle('sr-only',phase==='result'&&!success&&!placementMessage);\n if(success&&!free&&!customLevel){if(game==='light')lightCampaignProgress.complete(currentLevel().id);else completed.add(game+level);}\n $('next').disabled=phase!=='result'||!success;$('next').textContent=level===catalogue[game].length-1?'Voltar ao início ↺':'Próximo desafio →';\n}\n"
  }
];
const protectedFiles={
  "dist/about-dialog.css": "1f4dcf40920819a7d880778b5fe17362de541ff9ae884d771abd7f94e7abdb75",
  "dist/about-dialog.mjs": "2b3565ac1bf1223c12e912fe800a30e12e31e374126d92b0c3d4eee72ecc8cf0",
  "dist/answer-progress.mjs": "28c8a0bfa2c80f95aaf284338b7db40117bc4674ced9c06c43ea156e101be555",
  "dist/collection-json-worker.mjs": "75d9c0c78cf7ce61af12dbffeabdad999be827acebe101ea219d8c801ede3698",
  "dist/collection-json.mjs": "06fefe1d69acf9e5117229e8df33f088e3ba1cd8ccf256466b68fd4b294b08a3",
  "dist/collection-state.mjs": "d34aa0f389f11e7ffe86bcc09e5358317ada6217146ec716f22a4e5f8bc95aa7",
  "dist/collection-tutorials.mjs": "9b17dbb651d364e9947309be5d158a1f394aacf6fe7ca8ccaeeed1989fcfb590",
  "dist/collection-ui.mjs": "c87bc35cfc41bdd0b5d0828b265d0737c814693fec5e2b435664f3a324f958c8",
  "dist/curves.mjs": "1dd3b6d8a3efb21b19e0a2921ee9cb9a025485de574f0620f187bd755c11948e",
  "dist/decor-piles.mjs": "32bd9a1183ad32091a23ffcbefbdeecea566a2d8bee037c0b8f18bf2205ccc5a",
  "dist/desvio-hints.mjs": "6cbc77112cf6c5d42713b71da358df96ec63de52b32e5b861f52d5552c3d1e15",
  "dist/desvio.mjs": "b72245631427bbe537e622b902a1f74968b34762621574884d26be319edc52e2",
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
  "dist/level-json-common.mjs": "0832471b15dab7f436504e7ff5b691e5197fe95f3adbb86bc30ecaaa24ab150d",
  "dist/levels.mjs": "94c91747c87c350aeb35aaf0db98ea28d0dfe46b734a9f7b8c75664a5cae7abd",
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
let app=fs.readFileSync(new URL('../dist/app.mjs',import.meta.url),'utf8');
for(const block of authorizedBlocks){
 assert.equal(app.split(block.after).length-1,1,'Expected each exact campaign-only change once');
 app=app.replace(block.after,block.before);
}
assert.equal(sha(app),appHash,'Outside the authorized campaign wiring, app.mjs must remain byte-identical');
for(const [file,hash] of Object.entries(protectedFiles))assert.equal(sha(fs.readFileSync(new URL('../'+file,import.meta.url))),hash,'Unchanged engine, controls, styling, sprites or other game: '+file);
console.log(`PASS exact campaign-only app patch against ${baseline}; ${Object.keys(protectedFiles).length} existing runtime/visual files untouched`);
