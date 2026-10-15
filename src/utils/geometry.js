/* Pure line-segment distance helper. */
export function pointSegmentDistance(px,py,x1,y1,x2,y2){const dx=x2-x1,dy=y2-y1,len2=dx*dx+dy*dy||1;const t=Math.max(0,Math.min(1,((px-x1)*dx+(py-y1)*dy)/len2));return Math.hypot(px-(x1+t*dx),py-(y1+t*dy))}
