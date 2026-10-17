import { getProjectileDamageMultiplier } from './projectiles.js';

// nature primary auto-attack implementation. Mutable game state is supplied by the engine.
export function fireNatureAutoAttack(context, locals) {
 const { player, blackHole, enemies, core, CORE_TARGET_RANGE, mouse, sfx, pick, ELEMENTAL_CORE_ELEMENTS, bullets, launchElementalNovaSalvo, natureDrones, withinCoreRange, dist, skillFx, rand, applyDamage, triggerRicochetChain, burst, pointSegmentDistance, W, H, lasers, RICOCHET_LINK_RANGE, addLightningArc, element, energy, firePhaseFlowAttack } = context;
 const { coreId, target, angle, extendedProjectileCore, attackProjectileRange } = locals;

  const natureDronePairActive=natureDrones.filter(d=>(d.hp||0)>0).length>=2;
  if(natureDronePairActive)player.natureAttackCount=(player.natureAttackCount||0)+1;
  else player.natureAttackCount=0;
  const fireNatureRay=natureDronePairActive&&player.natureAttackCount>=3;
  if(fireNatureRay)player.natureAttackCount=0;
  // Nature only plays its attack sound when a nearby vine target or visible ray exists.
  if(target||fireNatureRay)sfx('shoot_nova');
  // Nature's base attack fires a vine at its nearest target; side-cannon ranks add extra vines.
  const total=Math.max(1,Math.min(5,player.shots||1));
  const targets=enemies.filter(e=>e.hp>0&&withinCoreRange(player,e)).sort((a,b)=>dist(player,a)-dist(player,b));
  const chosen=[];
  if(target){chosen.push(target);}
  for(const e of targets){if(chosen.length>=total)break;if(!chosen.includes(e))chosen.push(e);}
  const natureDirectHits=new Set(chosen);
  const shotPenalty=getProjectileDamageMultiplier(total,player.baseShots,player.projectileDamagePenalty??.12);
  chosen.forEach((vineTarget,index)=>{
   const vx=vineTarget.x-player.x,vy=vineTarget.y-player.y;
   skillFx.push({type:'natureVine',x:player.x,y:player.y,tx:vineTarget.x,ty:vineTarget.y,life:.24,max:.24,radius:10,color:'#70e58a',twinComet:index>0});
   for(let k=0;k<3;k++){const t=k/2;skillFx.push({type:'vineLeaf',x:player.x+vx*t+rand(-7,7),y:player.y+vy*t+rand(-7,7),life:.38,max:.38,radius:4,color:'#70e58a'});}
   if(vineTarget!==blackHole){vineTarget.bound=Math.max(vineTarget.bound||0,2);vineTarget.vineBound=Math.max(vineTarget.vineBound||0,2);}
   const vineDamage=player.damage*(player.natureVineDamageMult||1)*shotPenalty;
   applyDamage(vineTarget,vineDamage,'#70e58a',true,index?'TWIN VINE':'VINE STRIKE');
   if(player.ricochet>0)triggerRicochetChain(vineTarget,vineDamage,'#70e58a','VINE RICOCHET',natureDirectHits);
   burst(vineTarget.x,vineTarget.y,'#aaffb2',8);
   skillFx.push({type:'vineImpact',x:vineTarget.x,y:vineTarget.y,life:.22,max:.22,radius:(vineTarget.r||10)+9,color:'#b8ffc2'});
  });
  if(player.sideCannons&&target){const sideTargets=targets.filter(e=>!chosen.includes(e)).slice(0,Math.min(4,2*(player.sideCannons||0)));for(const sideTarget of sideTargets){skillFx.push({type:'natureVine',x:player.x,y:player.y,tx:sideTarget.x,ty:sideTarget.y,life:.18,max:.18,radius:7,color:'#70e58a',lesser:true});sideTarget.bound=Math.max(sideTarget.bound||0,1);sideTarget.vineBound=Math.max(sideTarget.vineBound||0,1);applyDamage(sideTarget,player.damage*.35*(player.natureVineDamageMult||1),'#70e58a',true,'SIDE VINE');burst(sideTarget.x,sideTarget.y,'#aaffb2',4);skillFx.push({type:'vineImpact',x:sideTarget.x,y:sideTarget.y,life:.18,max:.18,radius:(sideTarget.r||8)+5,color:'#b8ffc2'});}}
  if(fireNatureRay){
   const rayVx=Math.cos(angle),rayVy=Math.sin(angle),rayLength=CORE_TARGET_RANGE;
   const rayEndX=player.x+rayVx*rayLength,rayEndY=player.y+rayVy*rayLength,rayWidth=19;
   skillFx.push({type:'natureRay',x:player.x,y:player.y,tx:rayEndX,ty:rayEndY,life:.38,max:.38,width:rayWidth,color:'#70e58a'});
   for(const rayTarget of enemies){
    if(rayTarget.hp>0&&withinCoreRange(player,rayTarget)&&pointSegmentDistance(rayTarget.x,rayTarget.y,player.x,player.y,rayEndX,rayEndY)<=rayTarget.r+rayWidth){
     rayTarget.bound=Math.max(rayTarget.bound||0,1);rayTarget.vineBound=Math.max(rayTarget.vineBound||0,1);
     applyDamage(rayTarget,player.damage*1.6*(player.natureVineDamageMult||1),'#70e58a',true,'VERDANT RAY');
     burst(rayTarget.x,rayTarget.y,'#aaffb2',7);
     skillFx.push({type:'vineImpact',x:rayTarget.x,y:rayTarget.y,life:.24,max:.24,radius:(rayTarget.r||10)+10,color:'#b8ffc2'});
    }
   }
   if(blackHole&&!blackHole.inactive&&blackHole.hp>0&&withinCoreRange(player,blackHole)&&pointSegmentDistance(blackHole.x,blackHole.y,player.x,player.y,rayEndX,rayEndY)<=blackHole.r+rayWidth){
    applyDamage(blackHole,player.damage*1.6*(player.natureVineDamageMult||1),'#70e58a',true,'VERDANT RAY');
    burst(blackHole.x,blackHole.y,'#aaffb2',9);
   }
  }
 
}
