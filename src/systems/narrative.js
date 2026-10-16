/* Lightweight, skippable scene player for campaign dialogue. */
export function createNarrativeSystem({overlay,modal,getProgress,saveProgress,onStart=()=>{},onEnd=()=>{},onSound=()=>{}}){
 let session=null;
 function progress(){const value=getProgress?.()||{};if(!Array.isArray(value.seenScenes))value.seenScenes=[];if(!Array.isArray(value.recoveredFiles))value.recoveredFiles=[];return value;}
 function hasSeen(id){return progress().seenScenes.includes(id);}
 function el(tag,cls,text){const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;}
 function closeLayer(){overlay.classList.add('hidden');overlay.classList.remove('closing','story-overlay');modal.className='modal';modal.removeAttribute('role');modal.removeAttribute('aria-modal');modal.removeAttribute('aria-label');modal.innerHTML='';}
 function finish(){if(!session)return;const ended=session;session=null;document.removeEventListener('keydown',handleKey,true);if(ended.markSeen){const p=progress();if(!p.seenScenes.includes(ended.scene.id)){p.seenScenes.push(ended.scene.id);saveProgress?.();}}closeLayer();onEnd?.(ended.scene);ended.onComplete?.();}
 function advance(){if(!session)return;onSound?.();if(session.index<session.scene.lines.length-1){session.index++;render();}else finish();}
 function skip(){if(!session)return;onSound?.();finish();}
 function handleKey(event){if(!session)return;if(event.key==='Escape'){event.preventDefault();event.stopImmediatePropagation();skip();}else if(event.key==='Enter'||event.code==='Space'){event.preventDefault();event.stopImmediatePropagation();advance();}}
 function render(){
  if(!session)return;const {scene,index}=session,line=scene.lines[index];
  overlay.classList.remove('hidden','closing');overlay.classList.add('story-overlay');modal.className='modal narrative-modal story-modal';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label',scene.title);
  const frame=el('section','narrative-frame');frame.style.setProperty('--story-accent',scene.accent||'#72f6ff');
  const mast=el('div','narrative-masthead');mast.append(el('span','narrative-brand','V CORP  /  INTERNAL NETWORK'),el('span','narrative-classification','AUTHORIZED ASSET ONLY'));frame.append(mast);
  const heading=el('div','narrative-heading'),symbol=el('div','narrative-symbol',scene.symbol||'◈'),titles=el('div','narrative-titles');symbol.setAttribute('aria-hidden','true');titles.append(el('div','narrative-kicker',scene.chapter||'RECOVERED TRANSMISSION'),el('h2','narrative-title',scene.title),el('p','narrative-subtitle',scene.subtitle||''));heading.append(symbol,titles);frame.append(heading);
  const pr=el('div','narrative-progress-row');pr.append(el('span','narrative-progress-label','TRANSMISSION'),el('span','narrative-progress-count',String(index+1).padStart(2,'0')+' / '+String(scene.lines.length).padStart(2,'0')));frame.append(pr);
  const bar=el('div','narrative-progress'),fill=el('i','narrative-progress-fill');fill.style.width=((index+1)/scene.lines.length*100)+'%';bar.append(fill);frame.append(bar);
  const dialogue=el('div','narrative-dialogue'),speaker=el('div','narrative-speaker-row');speaker.append(el('div','narrative-speaker',line.speaker),el('div','narrative-role',line.role||'RECOVERED MESSAGE'));dialogue.append(speaker,el('p','narrative-line',line.text));frame.append(dialogue);
  const footer=el('div','narrative-footer'),hint=el('span','narrative-hint','ESC  SKIP  ·  ENTER  CONTINUE'),actions=el('div','narrative-actions');
  const skipButton=el('button','narrative-button narrative-skip','SKIP SCENE');skipButton.type='button';skipButton.addEventListener('click',skip);
  const nextButton=el('button','narrative-button narrative-next',index===scene.lines.length-1?(scene.cta||'ACKNOWLEDGE BRIEFING →'):'CONTINUE →');nextButton.type='button';nextButton.addEventListener('click',advance);
  actions.append(skipButton,nextButton);footer.append(hint,actions);frame.append(footer);modal.replaceChildren(frame);nextButton.focus({preventScroll:true});
 }
 function play(scene,{force=false,markSeen=true,onComplete=()=>{}}={}){if(!scene||(!force&&hasSeen(scene.id))){onComplete?.();return false;}if(session)finish();session={scene,index:0,markSeen,onComplete};onStart?.(scene);document.addEventListener('keydown',handleKey,true);render();return true;}
 function replay(scene,onComplete=()=>{}){return play(scene,{force:true,markSeen:false,onComplete});}
 return {play,replay,hasSeen};
}
