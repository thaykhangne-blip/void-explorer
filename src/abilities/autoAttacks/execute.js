// Core-specific primary auto-attack dispatch. Runtime state and callbacks are injected from game.js.
export function executeAutoAttack(context) {
 const { player, blackHole, enemies, addEnergy, core, CORE_TARGET_RANGE, getPrimaryAttackTarget, mouse, sfx, pick, ELEMENTAL_CORE_ELEMENTS, bullets, launchElementalNovaSalvo, natureDrones, withinCoreRange, dist, skillFx, rand, applyDamage, triggerRicochetChain, burst, pointSegmentDistance, W, H, lasers, RICOCHET_LINK_RANGE, addLightningArc, element, energy, firePhaseFlowAttack } = context;
if(!blackHole&&!enemies.some(e=>e.hp>0))return null;addEnergy(1);const coreId=core?.id||'ember';const extendedProjectileCore=['ember','frost','remielle','elemental'].includes(coreId),attackProjectileRange=extendedProjectileCore?CORE_TARGET_RANGE*1.5:CORE_TARGET_RANGE;let target=getPrimaryAttackTarget(),tx=target?target.x:mouse.x,ty=target?target.y:mouse.y,dx=tx-player.x,dy=ty-player.y,l=Math.hypot(dx,dy)||1,angle=Math.atan2(dy,dx);
 if(coreId==='elemental'){
  const total=Math.max(1,Math.min(5,player.shots||1));if(target)sfx('shoot_nova');
  const shotPenalty=getProjectileDamageMultiplier(total,player.baseShots,player.projectileDamagePenalty??.12);
  for(let i=0;i<total;i++){const prism=pick(ELEMENTAL_CORE_ELEMENTS),parallelPair=total>=2&&i<2,a=total>=3&&!parallelPair?angle+(i-(total-1)/2)*.20:angle,laneOffset=parallelPair?(i===0?-.5:.5)*16:0;const ox=player.x+Math.cos(angle)*10-Math.sin(angle)*laneOffset,oy=player.y+Math.sin(angle)*10+Math.cos(angle)*laneOffset;const shotDamage=player.damage*shotPenalty;bullets.push({x:ox,y:oy,vx:Math.cos(a)*player.shotSpeed,vy:Math.sin(a)*player.shotSpeed,r:4.5,life:extendedProjectileCore?2.2:1.6,rangeLeft:attackProjectileRange,damage:shotDamage,color:prism.color,el:prism.name,type:'prism',prismElement:prism.name,pierce:player.pierce||0,hitEnemies:[],ricochetsLeft:player.ricochet||0});if(prism.name==='NOVA'&&(player.elementalEmpowerTimer||0)>0)launchElementalNovaSalvo(target,shotDamage);}
  if(player.sideCannons){const count=Math.min(4,2*player.sideCannons);for(let i=0;i<count;i++){const prism=pick(ELEMENTAL_CORE_ELEMENTS),side=(i-(count-1)/2)*2,a=angle+side*.22,ox=player.x+Math.cos(angle)*5-Math.sin(angle)*side*12,oy=player.y+Math.sin(angle)*5+Math.cos(angle)*side*12;bullets.push({x:ox,y:oy,vx:Math.cos(a)*player.shotSpeed,vy:Math.sin(a)*player.shotSpeed,r:3.5,rangeLeft:attackProjectileRange,damage:player.damage*.48,color:prism.color,type:'prism',prismElement:prism.name,life:1.8,pierce:0,hitEnemies:[],ricochetsLeft:player.ricochet||0,fromSideCannon:true});}}
 }else if(coreId==='nature'){
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
 }else if(coreId==='flash'){
  // Flash's default weapon is an instant lightning ray that chains through nearby enemies.
  const first=enemies.filter(e=>e.hp>0&&withinCoreRange(player,e)).sort((a,b)=>dist(player,a)-dist(player,b))[0];
  const inRangeSingularity=blackHole&&!blackHole.inactive&&blackHole.hp>0&&withinCoreRange(player,blackHole);
  if(first||inRangeSingularity)sfx('shoot');
  if(first){addLightningArc(player,first);applyDamage(first,player.damage,'#ffe875',true,'LIGHTNING');const primaryWasCrit=!!first.lastHitWasCrit;burst(first.x,first.y,'#fff4a8',6);let from=first;const hit=new Set([first]);const chainCount=Math.min(4,2+(player.flashChainBonus||0)+(primaryWasCrit?(player.flashCritChainTargets||0):0));for(let n=0;n<chainCount;n++){const enemyNext=enemies.filter(e=>e.hp>0&&!hit.has(e)&&withinCoreRange(player,e)&&dist(e,from)<RICOCHET_LINK_RANGE).sort((a,b)=>dist(a,from)-dist(b,from))[0]||null;const coreNext=(blackHole&&!blackHole.inactive&&blackHole.hp>0&&!hit.has(blackHole)&&withinCoreRange(player,blackHole)&&dist(blackHole,from)<RICOCHET_LINK_RANGE)?blackHole:null;const next=enemyNext&&coreNext?(dist(enemyNext,from)<=dist(coreNext,from)?enemyNext:coreNext):(enemyNext||coreNext);if(!next)break;addLightningArc(from,next);applyDamage(next,player.damage*.58*(player.flashChainPower||1)*(primaryWasCrit?1+(player.flashCritChainBonus||0):1),'#ffe875',true,next===blackHole?'CHAIN LIGHTNING · SINGULAR CORE':'CHAIN LIGHTNING');if(next!==blackHole)burst(next.x,next.y,'#fff4a8',5);hit.add(next);from=next;}if(player.ricochet>0)triggerRicochetChain(from,from===first?player.damage:player.damage*.72*(player.flashChainPower||1),'#ffe875','LIGHTNING RICOCHET',hit);}else if(inRangeSingularity){addLightningArc(player,blackHole);applyDamage(blackHole,player.damage,'#ffe875',true,'LIGHTNING');}
  if(player.sideCannons&&first){const cannonCount=Math.min(4,2*(player.sideCannons||0));const sideTargets=enemies.filter(e=>e.hp>0&&e!==first&&withinCoreRange(player,e)).sort((a,b)=>dist(a,player)-dist(b,player));for(let i=0;i<cannonCount&&i<sideTargets.length;i++){const side=(i-(cannonCount-1)/2)*2,near=sideTargets[i];addLightningArc({x:player.x+side*10,y:player.y},near);applyDamage(near,player.damage*.35,'#ffe875',true,'SIDE ARC');}}
 }else if(coreId==='nova'){
  // Nova's normal attack is a focused physical laser. Overclock charges every fourth attack.
  const overclockedNovaShot=!!player.novaOverclock&&((player.novaOverclockCount=(player.novaOverclockCount||0)+1)>=4);if(overclockedNovaShot)player.novaOverclockCount=0;
  const total=Math.max(1,Math.min(5,player.shots||1)),spread=.14,laneGap=24;
  for(let i=0;i<total;i++){
   const parallelPair=total===2;
   const a=total>=3?angle+(i-(total-1)/2)*spread:angle;
   const laneOffset=parallelPair?(i===0?-.5:.5)*laneGap:0;
   const ox=player.x+Math.cos(angle)*8-Math.sin(angle)*laneOffset;
   const oy=player.y+Math.sin(angle)*8+Math.cos(angle)*laneOffset;
   const vx=Math.cos(a),vy=Math.sin(a);
   const edgeX=vx>0?(W-ox)/vx:vx<0?(0-ox)/vx:Infinity;
   const edgeY=vy>0?(H-oy)/vy:vy<0?(0-oy)/vy:Infinity;
   const length=Math.min(CORE_TARGET_RANGE,Math.max(0,Math.min(edgeX>0?edgeX:Infinity,edgeY>0?edgeY:Infinity)));
   lasers.push({x:ox,y:oy,angle:a,vx,vy,length:Number.isFinite(length)?length:Math.max(W,H),damage:player.damage*.70*(player.laserDamageMult||1)*(overclockedNovaShot?1.35:1)*getProjectileDamageMultiplier(total,player.baseShots,player.projectileDamagePenalty??.12),color:overclockedNovaShot?'#8ffaff':'#bd78ff',life:.16,maxLife:.16,ticks:1,tickTimer:0,hitRadius:6+(player.laserWidthBonus||0)+(overclockedNovaShot?3:0),ricochetsLeft:player.ricochet||0,ricochetChecked:false});
  }
  // Nova's primary weapon is a laser, so its side cannons must emit side beams
  // rather than ordinary ray bullets (which are not processed as laser hits).
  if(player.sideCannons){
   const cannonCount=Math.min(4,2*(player.sideCannons||0));
   for(let i=0;i<cannonCount;i++){
    const side=(i-(cannonCount-1)/2)*2;
    const a=angle+side*.22;
    const ox=player.x+Math.cos(angle)*8-Math.sin(angle)*side*12;
    const oy=player.y+Math.sin(angle)*8+Math.cos(angle)*side*12;
    const vx=Math.cos(a),vy=Math.sin(a);
    const edgeX=vx>0?(W-ox)/vx:vx<0?(0-ox)/vx:Infinity;
    const edgeY=vy>0?(H-oy)/vy:vy<0?(0-oy)/vy:Infinity;
    const length=Math.min(CORE_TARGET_RANGE,Math.max(0,Math.min(edgeX>0?edgeX:Infinity,edgeY>0?edgeY:Infinity)));
    lasers.push({x:ox,y:oy,angle:a,vx,vy,length:Number.isFinite(length)?length:Math.max(W,H),damage:player.damage*.48*(player.laserDamageMult||1),color:'#d2a0ff',life:.16,maxLife:.16,ticks:1,tickTimer:0,hitRadius:3.5+(player.laserWidthBonus||0),ricochetsLeft:player.ricochet||0,ricochetChecked:false,isSideCannon:true});
   }
  }
 }else{
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
 if(coreId==='remielle'){player.phaseFlowAttackCount=(player.phaseFlowAttackCount||0)+1;if(player.phaseFlowAttackCount>=3){player.phaseFlowAttackCount=0;firePhaseFlowAttack('ELEMENTAL AUTO ATTACK FLIGHT');}}
 if(coreId==='nova'&&player.prismEcho){player.prismEchoCount=(player.prismEchoCount||0)+1;if(player.prismEchoCount>=5){player.prismEchoCount=0;const echoTarget=enemies.filter(e=>e.hp>0&&e!==target&&withinCoreRange(player,e)).sort((a,b)=>dist(player,a)-dist(player,b))[0]||(!blackHole?.inactive&&blackHole&&blackHole.hp>0&&withinCoreRange(player,blackHole)?blackHole:null);if(echoTarget){const ex=echoTarget.x-player.x,ey=echoTarget.y-player.y,el=Math.hypot(ex,ey)||1;const vx=ex/el,vy=ey/el;const edgeX=vx>0?(W-player.x)/vx:vx<0?(0-player.x)/vx:Infinity,edgeY=vy>0?(H-player.y)/vy:vy<0?(0-player.y)/vy:Infinity;lasers.push({x:player.x,y:player.y,angle:Math.atan2(vy,vx),vx,vy,length:Math.min(CORE_TARGET_RANGE,Math.max(0,Math.min(edgeX>0?edgeX:Infinity,edgeY>0?edgeY:Infinity))),damage:player.damage*.55*(player.laserDamageMult||1),color:'#8ffaff',life:.18,maxLife:.18,ticks:1,tickTimer:0,hitRadius:5+(player.laserWidthBonus||0),ricochetsLeft:0,ricochetChecked:false,isSideCannon:true});}}}return 1/(player.fireRate*(player.ultHaste>0?1.7:1)*(1+(energy/100)*.08*(player.overclockRelay||0)))}
