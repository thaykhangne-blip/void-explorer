import { getProjectileDamageMultiplier } from './projectiles.js';

// projectile primary auto-attack implementation. Mutable game state is supplied by the engine.
export function fireProjectileAutoAttack(context, locals) {
 const { player, blackHole, enemies, core, CORE_TARGET_RANGE, mouse, sfx, pick, ELEMENTAL_CORE_ELEMENTS, bullets, launchElementalNovaSalvo, natureDrones, withinCoreRange, dist, skillFx, rand, applyDamage, triggerRicochetChain, burst, pointSegmentDistance, W, H, lasers, RICOCHET_LINK_RANGE, addLightningArc, element, energy, firePhaseFlowAttack } = context;
 const { coreId, target, angle, extendedProjectileCore, attackProjectileRange } = locals;

  const spread=coreId==='frost'?.28:.24;
  const total=player.shots;
  const type=coreId==='frost'?'ice':coreId==='remielle'?'lumine':'fire';
  const laneGap=coreId==='frost'?14:12;
  for(let i=0;i<total;i++){
   // The first two shots travel parallel in separate lanes. Only shots 3+ fan outward.
   const parallelPair=total>=2&&i<2;
   let a=angle;
   if(total>=3&&!parallelPair){
    const extraIndex=i-2,extraCount=total-2;
    const fanOffset=(extraIndex-(extraCount-1)/2)*spread;
    a=angle+fanOffset;
   }
   let laneOffset=0;
   if(parallelPair)laneOffset=(i===0?-.5:.5)*laneGap;
   const px=player.x+Math.cos(angle)*11-Math.sin(angle)*laneOffset;
   const py=player.y+Math.sin(angle)*11+Math.cos(angle)*laneOffset;
   bullets.push({x:px,y:py,vx:Math.cos(a)*player.shotSpeed,vy:Math.sin(a)*player.shotSpeed,r:4,life:extendedProjectileCore?2.2:1.6,rangeLeft:attackProjectileRange,damage:player.damage*getProjectileDamageMultiplier(total,player.baseShots,player.projectileDamagePenalty??.12),color:element?element.color:(type==='fire'?'#ff743d':'#8cecff'),el:element?.name,type,pierce:(player.pierce||0),hitEnemies:[]});
  }
  if(player.sideCannons){
   const cannonCount=Math.min(4,2*(player.sideCannons||0));
   const boltType=coreId==='frost'?'ice':coreId==='remielle'?'lumine':'fire';
   for(let i=0;i<cannonCount;i++){
    const side=(i-(cannonCount-1)/2)*2,a=angle+side*.22,ox=player.x+Math.cos(angle)*5-Math.sin(angle)*side*12,oy=player.y+Math.sin(angle)*5+Math.cos(angle)*side*12;
    bullets.push({x:ox,y:oy,vx:Math.cos(a)*player.shotSpeed,vy:Math.sin(a)*player.shotSpeed,r:coreId==='nova'?3:coreId==='remielle'?4.5:4,rangeLeft:attackProjectileRange,damage:player.damage*.48,color:coreId==='remielle'?'#ff9ed8':(core?.color||'#72f6ff'),type:boltType,life:2.2,pierce:0,hitEnemies:[],ricochetsLeft:player.ricochet||0,fromSideCannon:true,featherTrail:coreId==='remielle'});
   }
  }
 
}
