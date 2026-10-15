/* Reusable ricochet chains. Dependencies are passed in to avoid importing game state. */
export function createRicochetSystem({getPlayer,getCore,getEnemies,getSkillFx,dist,applyDamage,addLightningArc,burst,maxLinkRange=160,maxTargetRange=440}){
 return function triggerRicochetChain(sourceTarget,damage,color,tag='RICOCHET',excludedTargets=new Set()){
  const player=getPlayer(),core=getCore(),enemies=getEnemies(),skillFx=getSkillFx();
  if(!player||!sourceTarget||(player.ricochet||0)<=0)return;
  const hit=excludedTargets instanceof Set?excludedTargets:new Set();
  hit.add(sourceTarget);
  let from=sourceTarget;
  const bounces=Math.min(3,Math.max(0,player.ricochet||0));
  for(let i=0;i<bounces;i++){
   const next=enemies.filter(e=>e.hp>0&&!hit.has(e)&&dist(player,e)<=maxTargetRange&&dist(from,e)<=maxLinkRange).sort((a,b)=>dist(from,a)-dist(from,b))[0];
   if(!next)break;
   if(core?.id==='nature'){
    skillFx.push({type:'natureVine',x:from.x,y:from.y,tx:next.x,ty:next.y,life:.22,max:.22,radius:8,color:'#70e58a',ricochet:true});
    next.bound=Math.max(next.bound||0,1);next.vineBound=Math.max(next.vineBound||0,1);
    skillFx.push({type:'vineImpact',x:next.x,y:next.y,life:.2,max:.2,radius:(next.r||8)+7,color:'#b8ffc2'});
   }else if(core?.id==='flash'){addLightningArc(from,next);}
   applyDamage(next,damage*Math.pow(.65,i+1),color,true,tag);
   burst(next.x,next.y,core?.id==='nature'?'#aaffb2':color,5);
   hit.add(next);from=next;
  }
 };
}
