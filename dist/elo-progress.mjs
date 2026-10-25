/** Non-destructive campaign navigation migration; snapshots keep their original IDs. */
export function migrateEloProgress(data,levels){
 if(!levels?.length)return false;
 const oldId=data.lastSessions?.elo;if(!oldId||levels.some(l=>l.id===oldId))return false;
 const match=/^elo(?:-v\d+)?-(\d+)$/.exec(oldId);if(!match)return false;
 const ordinal=Number(match[1])-1;if(ordinal<0||ordinal>=levels.length)return false;
 data.eloLegacy??={lastSessionIds:[]};data.eloLegacy.lastSessionIds??=[];
 if(!data.eloLegacy.lastSessionIds.includes(oldId))data.eloLegacy.lastSessionIds.push(oldId);
 data.lastSessions.elo=levels[ordinal].id;
 // Intentionally do not copy sessions, completion, failures, assistance, or undo.
 return true;
}
