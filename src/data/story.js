/* Campaign dialogue and optional recovered V Corp documents. */
export const worldIntroScenes=[
{id:'world-1-intro',worldIndex:0,chapter:'ASSIGNMENT 01 · FIELD BRIEFING',title:'ASHEN REACH',symbol:'☄',accent:'#ff9c65',subtitle:'A scorched frontier. An entirely predictable emergency.',lines:[
{speaker:'V CORP OPERATIONS',role:'AUTOMATED MISSION BRIEFING',text:'Welcome to Ashen Reach, Explorer V-EX/01. The local Singularity Core has exceeded every approved safety limit.'},
{speaker:'V CORP COMPLIANCE',role:'LANGUAGE AND MORALE ALIGNMENT',text:'For morale purposes, this is classified as a temporary atmosphere variance. The atmosphere is on fire.'},
{speaker:'V CORP OPERATIONS',role:'ACTION REQUIRED',text:'Destroy the Core, recover the telemetry, and avoid the phrase “management was warned” in your after-action report.'}]},
{id:'world-2-intro',worldIndex:1,chapter:'ASSIGNMENT 02 · RECOVERY BRIEFING',title:'CRYO ARCHIVE',symbol:'❄',accent:'#8cecff',subtitle:'Where unresolved issues have been kept on ice.',lines:[
{speaker:'V CORP OPERATIONS',role:'AUTOMATED MISSION BRIEFING',text:'Welcome to Cryo Archive. Failed experiments were placed in cryogenic storage until the safety review could be scheduled.'},
{speaker:'V CORP PEOPLE EXPERIENCE',role:'CULTURE PULSE SUMMARY',text:'Survey completion was 4%. Leadership interprets the other 96% as broad alignment with the current strategy.'},
{speaker:'RECOVERED RESEARCH NOTE',role:'AUTHOR REDACTED',text:'The Archive holds the original warning. Everyone remembers forwarding it. Nobody remembers receiving it.'}]},
{id:'world-3-intro',worldIndex:2,chapter:'ASSIGNMENT 03 · FACILITIES BRIEFING',title:'VERDANT RUIN',symbol:'✿',accent:'#83ffc5',subtitle:'A self-managing ecosystem, according to the procurement deck.',lines:[
{speaker:'V CORP OPERATIONS',role:'AUTOMATED MISSION BRIEFING',text:'Verdant Ruin was designed as an autonomous security ecosystem. The Facilities team was consolidated into one shared mailbox.'},
{speaker:'V CORP PROCUREMENT',role:'COST OPTIMIZATION NOTE',text:'The mailbox has been absorbed by a vine. The vendor quoted a premium for extracting it.'},
{speaker:'V CORP LEGAL',role:'STAKEHOLDER CLARIFICATION',text:'The vines are not recognized as a union. They are an unmanaged stakeholder group with unusually strong roots.'}]},
{id:'world-4-intro',worldIndex:3,chapter:'ASSIGNMENT 04 · EXECUTIVE BRIEFING',title:'EVENT HORIZON',symbol:'◉',accent:'#c29aff',subtitle:'The original experiment. The original sign-off. The original excuse.',lines:[
{speaker:'V CORP OPERATIONS',role:'AUTOMATED MISSION BRIEFING',text:'Event Horizon contains the original Singularity Core. Archived forecasts predicted full reality collapse before the project was approved.'},
{speaker:'V CORP FINANCE',role:'BUSINESS CASE EXTRACT',text:'Projected return: excellent. Projected survival rate: not included in the dashboard.'},
{speaker:'V CORP ASSET MANAGEMENT',role:'CLASSIFICATION UPDATE',text:'Your status is Explorer V-EX/01. Employment status: not applicable. You are equipment. Please continue to demonstrate resilience.'}]}
];
export const worldOutroScenes=[
{id:'world-1-outro',worldIndex:0,chapter:'CONTAINMENT REPORT · 01',title:'A SUCCESSFUL RECLASSIFICATION',symbol:'☄',accent:'#ff9c65',subtitle:'Ashen Reach is quiet. The paperwork is just getting started.',cta:'AUTHORIZE TRANSFER →',lines:[
{speaker:'V CORP OPERATIONS',role:'CLOSURE ANNOUNCEMENT',text:'Ashen Reach containment is complete. Please note that nothing was contained; we have renamed the report.'},
{speaker:'V CORP FINANCE',role:'ASSET ACCOUNTING',text:'The facility loss has been reclassified as an accelerated write-off. Congratulations on delivering value.'},
{speaker:'UNKNOWN RESEARCHER',role:'RECOVERED TRANSMISSION',text:'The Core behaved exactly as designed. Someone signed off on the warnings.'},
{speaker:'V CORP PEOPLE EXPERIENCE',role:'FEEDBACK ACKNOWLEDGEMENT',text:'Thank you for raising a concern. It has been received, reviewed, and assigned to a committee scheduled for next quarter.'}]},
{id:'world-2-outro',worldIndex:1,chapter:'CONTAINMENT REPORT · 02',title:'FEEDBACK FROZEN PENDING REVIEW',symbol:'❄',accent:'#8cecff',subtitle:'The archive is open. Accountability remains in cold storage.',cta:'AUTHORIZE TRANSFER →',lines:[
{speaker:'V CORP OPERATIONS',role:'CLOSURE ANNOUNCEMENT',text:'Cryo Archive has been stabilized. The automated response team followed policy by freezing the entire response team.'},
{speaker:'V CORP PEOPLE EXPERIENCE',role:'WELLBEING INITIATIVE',text:'A mandatory twelve-minute wellness hologram will be deployed. Attendance is optional; completion is tracked.'},
{speaker:'RECOVERED RESEARCH NOTE',role:'UNSIGNED',text:'The failure was not caused by missing information. It was caused by information everyone agreed not to act on.'},
{speaker:'V CORP OPERATIONS',role:'ACTION REQUIRED',text:'Please classify this finding as a learning opportunity. The “systemic failure” dropdown is currently unavailable.'}]},
{id:'world-3-outro',worldIndex:2,chapter:'CONTAINMENT REPORT · 03',title:'A VERY AGILE ORGANIZATION',symbol:'✿',accent:'#83ffc5',subtitle:'The ecosystem has achieved cross-functional alignment.',cta:'AUTHORIZE TRANSFER →',lines:[
{speaker:'V CORP PROCUREMENT',role:'COST REVIEW',text:'All invasive roots were purchased at a discount after the safety review was postponed indefinitely.'},
{speaker:'V CORP OPERATIONS',role:'QUARTERLY BUSINESS REVIEW',text:'The plants share resources, exchange information, and respond to issues without a steering committee. A model of collaboration.'},
{speaker:'UNKNOWN RESEARCHER',role:'RECOVERED TRANSMISSION',text:'The Core is sending a signal to headquarters. This was the original objective, not a side effect.'},
{speaker:'V CORP EXECUTIVE OFFICE',role:'NEW PRIORITY',text:'Proceed to Event Horizon. The board requests a concise explanation with no more than three slides.'}]},
{id:'world-4-outro',worldIndex:3,chapter:'FINAL REPORT · PROJECT MIRROR',title:'EXCEEDS EXPECTATIONS',symbol:'◉',accent:'#c29aff',subtitle:'Reality is stable. The corporate narrative is not.',cta:'CLOSE FINAL REPORT →',lines:[
{speaker:'V CORP OPERATIONS',role:'CAMPAIGN CLOSURE',text:'Core destroyed. Reality stabilized. V Corp reports a 104% successful containment rate.'},
{speaker:'V CORP RESEARCH',role:'PROJECT MIRROR RESULTS',text:'Telemetry confirms the Explorer design works. A replacement Explorer is already in onboarding.'},
{speaker:'RECOVERED PROJECT FILE',role:'ORIGINAL OBJECTIVE',text:'The mission was never rescue. You were the final performance metric: proof that a disposable unit could survive the consequences.'},
{speaker:'V CORP PEOPLE EXPERIENCE',role:'EXIT SURVEY',text:'Thank you for your exceptional resilience. Your feedback is important to us and will not affect any future decisions.'}]}
];
export const inRunCommsScenes=[
{id:'run-comms-room-1',room:1,presentation:'field',chapter:'FIELD COMMS · ROOM 01',title:'CURRENT STAFFING: YOU',symbol:'▤',accent:'#ff9ed8',subtitle:'Your leadership role has been upgraded to include being the entire workforce.',cta:'BACK TO DUTY →',lines:[
{speaker:'V CORP OPERATIONS',role:'STAFFING STATUS',text:'Field Operations Manager, your deployment roster is empty. All personnel have been removed under the workforce optimization plan.'},
{speaker:'EXPLORER · FIELD OPERATIONS MANAGER',role:'REASONABLE FOLLOW-UP',text:'Then why am I piloting the core myself instead of assigning it to a crew?'},
{speaker:'V CORP OPERATIONS',role:'RESOURCE ALLOCATION',text:'There are no personnel left. Please treat this as an opportunity to demonstrate leadership by personally doing every job.'}]},
{id:'run-comms-room-5',room:5,presentation:'field',chapter:'FIELD COMMS · ROOM 05',title:'DELEGATION DENIED',symbol:'▤',accent:'#8cecff',subtitle:'A request for two extra hands has entered the approval labyrinth.',cta:'ACKNOWLEDGE DENIAL →',lines:[
{speaker:'EXPLORER · FIELD OPERATIONS MANAGER',role:'RESOURCE REQUEST',text:'Requesting two operators: one for containment support and one to cover navigation while I handle the Core.'},
{speaker:'V CORP WORKFORCE OPTIMIZATION',role:'AUTOMATED RESPONSE',text:'Request denied. Every available person has been reassigned, released, or converted into a slide about operational agility.'},
{speaker:'EXPLORER · FIELD OPERATIONS MANAGER',role:'DECISION LOG',text:'Understood. I will continue managing the operation by performing the operation. Please escalate this contradiction to someone who exists.'}]},
{id:'run-comms-room-10',room:10,presentation:'field',chapter:'FIELD COMMS · ROOM 10',title:'THE SURVEY SAYS: NO STAFF',symbol:'▤',accent:'#83ffc5',subtitle:'Employee engagement has achieved a perfect response rate of nobody.',cta:'CLOSE SURVEY →',lines:[
{speaker:'V CORP PEOPLE EXPERIENCE',role:'PULSE CHECK',text:'Your latest team engagement result is 100% aligned with the staffing strategy. Zero employees submitted objections.'},
{speaker:'EXPLORER · FIELD OPERATIONS MANAGER',role:'DATA QUALITY REVIEW',text:'I am the only person left, and I am currently working. Who exactly completed this survey?'},
{speaker:'V CORP PEOPLE EXPERIENCE',role:'METHODOLOGY',text:'The dashboard counts non-response as neutral alignment. Please avoid introducing context that could complicate the metric.'}]},
{id:'run-comms-room-15',room:15,presentation:'field',chapter:'FIELD COMMS · ROOM 15',title:'PERFORMANCE WITHOUT PERSONNEL',symbol:'▤',accent:'#c29aff',subtitle:'The target is unchanged. The team has been deleted.',cta:'RETURN TO ASSIGNMENT →',lines:[
{speaker:'V CORP HUMAN RESOURCES',role:'PERFORMANCE CALIBRATION',text:'Congratulations. Your scope now covers operations, containment, maintenance, incident response, and reporting.'},
{speaker:'EXPLORER · FIELD OPERATIONS MANAGER',role:'CAPACITY REVIEW',text:'Has the workload target been reduced to reflect the fact that I have no team?'},
{speaker:'V CORP HUMAN RESOURCES',role:'TARGET CONFIRMATION',text:'No. Maintaining the same target demonstrates consistency. Your resilience rating has been increased to compensate for the missing headcount.'}]},
{id:'run-comms-room-19',room:19,presentation:'field',chapter:'FIELD COMMS · ROOM 19',title:'ONE PERSON, FIVE JOB FAMILIES',symbol:'▤',accent:'#ff9c65',subtitle:'One last briefing before the final Core. Guess who is still on the roster.',cta:'PROCEED TO FINAL ROOM →',lines:[
{speaker:'V CORP OPERATIONS',role:'FINAL DEPLOYMENT REVIEW',text:'Final room prep is complete. Current staffing: one Field Operations Manager. Required functions: command, piloting, containment, maintenance, and incident reporting.'},
{speaker:'EXPLORER · FIELD OPERATIONS MANAGER',role:'ORG CHART AUDIT',text:'So the company removed the crew, kept every target, and promoted me into doing the work of the crew.'},
{speaker:'V CORP OPERATIONS',role:'LEADERSHIP RECOGNITION',text:'Correct. You have been selected for the prestigious Single Point of Failure award. The certificate is attached to a ticket assigned to your own queue.'}]}
];
export const allStoryScenes=[...worldIntroScenes,...worldOutroScenes,...inRunCommsScenes];
export const corporateMemos=[
{id:'memo-ashen-incident',worldIndex:0,code:'ASH-INC-001',title:'Incident Classification Guidance',summary:'The report was revised six times before the word “meltdown” was removed.',body:'The event must be reported as a “thermal opportunity variance.” The safety alert was delivered to the leadership distribution list and therefore considered communicated. Acknowledgement is not required when delivery can be demonstrated. Future reports must distinguish between warnings that were sent and warnings that were read.'},
{id:'memo-cryo-wellbeing',worldIndex:1,code:'CRYO-PX-014',title:'Culture Pulse: Final Results',summary:'The response rate improved after the survey link was moved behind three approval steps.',body:'The team achieved a 4% response rate. The remaining 96% are recorded as “no actionable objection.” A mandatory hologram will remind staff to maintain work-life balance. It will run outside working hours to avoid interrupting productivity.'},
{id:'memo-verdant-procurement',worldIndex:2,code:'VRD-PROC-022',title:'Facilities Consolidation Update',summary:'One shared mailbox replaced Facilities. The mailbox is now growing leaves.',body:'The autonomous ecosystem reduced headcount expenditure to zero. Root activity is counted as stakeholder engagement. Benefits eligibility remains under review because the contractors lack conventional employee IDs, although several have infiltrated the payroll server.'},
{id:'memo-project-mirror',worldIndex:3,code:'MIR-EXEC-099',title:'Project Mirror: Approval Summary',summary:'The risk model predicted total collapse. The business dashboard remained green.',body:'Technical review: catastrophic risk. Finance review: exceptional upside. Final status: GREEN. The dashboard prioritizes projected return over the probability of continued existence; leadership has endorsed this weighting. The Explorer unit will remain a reusable asset until replacement costs are lower than further testing.'}
];
