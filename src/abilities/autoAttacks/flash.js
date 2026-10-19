import { getProjectileDamageMultiplier } from './projectiles.js';

// flash primary auto-attack implementation. Mutable game state is supplied by the engine.
export function fireFlashAutoAttack(context, locals) {
 const { player, blackHole, enemies, core, CORE_TARGET_RANGE, getPrimaryAttackTarget, mouse, sfx, pick, ELEMENTAL_CORE_ELEMENTS, bullets, launchElementalNovaSalvo, natureDrones, withinCoreRange, dist, skillFx, rand, applyDamage, triggerRicochetChain, burst, pointSegmentDistance, W, H, lasers, RICOCHET_LINK_RANGE, addLightningArc, element, energy, firePhaseFlowAttack } = context;
 const { coreId, target, angle, extendedProjectileCore, attackProjectileRange } = locals;

  // Flash's default weapon is an instant lightning ray that chains through nearby enemies.
  const first=getPrimaryAttackTarget();
  const inRangeSingularity=blackHole&&!blackHole.inactive&&blackHole.hp>0&&withinCoreRange(player,blackHole);
  if(first||inRangeSingularity)sfx('shoot');
  if(first){addLightningArc(player,first);applyDamage(first,player.damage,'#ffe875',true,'LIGHTNING');const primaryWasCrit=!!first.lastHitWasCrit;burst(first.x,first.y,'#fff4a8',6);let from=first;const hit=new Set([first]);const chainCount=Math.min(4,2+(player.flashChainBonus||0)+(primaryWasCrit?(player.flashCritChainTargets||0):0));for(let n=0;n<chainCount;n++){const enemyNext=enemies.filter(e=>e.hp>0&&!hit.has(e)&&withinCoreRange(player,e)&&dist(e,from)<RICOCHET_LINK_RANGE).sort((a,b)=>dist(a,from)-dist(b,from))[0]||null;const coreNext=(blackHole&&!blackHole.inactive&&blackHole.hp>0&&!hit.has(blackHole)&&withinCoreRange(player,blackHole)&&dist(blackHole,from)<RICOCHET_LINK_RANGE)?blackHole:null;const next=enemyNext&&coreNext?(dist(enemyNext,from)<=dist(coreNext,from)?enemyNext:coreNext):(enemyNext||coreNext);if(!next)break;addLightningArc(from,next);applyDamage(next,player.damage*.58*(player.flashChainPower||1)*(primaryWasCrit?1+(player.flashCritChainBonus||0):1),'#ffe875',true,next===blackHole?'CHAIN LIGHTNING · SINGULAR CORE':'CHAIN LIGHTNING');if(next!==blackHole){next.flashUltVulnerabilityUntil=performance.now()+6000;burst(next.x,next.y,'#fff4a8',5);}hit.add(next);from=next;}if(player.ricochet>0)triggerRicochetChain(from,from===first?player.damage:player.damage*.72*(player.flashChainPower||1),'#ffe875','LIGHTNING RICOCHET',hit);}else if(inRangeSingularity){addLightningArc(player,blackHole);applyDamage(blackHole,player.damage,'#ffe875',true,'LIGHTNING');}
  if(player.sideCannons&&first){const cannonCount=Math.min(4,2*(player.sideCannons||0));const sideTargets=enemies.filter(e=>e.hp>0&&e!==first&&withinCoreRange(player,e)).sort((a,b)=>dist(a,player)-dist(b,player));for(let i=0;i<cannonCount&&i<sideTargets.length;i++){const side=(i-(cannonCount-1)/2)*2,near=sideTargets[i];addLightningArc({x:player.x+side*10,y:player.y},near);applyDamage(near,player.damage*.35,'#ffe875',true,'SIDE ARC');}}
 
}
