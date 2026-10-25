import {solveGeometry} from './geometry-games.mjs';
// A disposable Worker keeps exact PRUMO enumeration off the UI thread. The
// owner terminates it after 1200 ms or whenever the underlying board changes.
self.onmessage=({data:{level,state}})=>{
 try{const result=solveGeometry(level,state,1,{maxMs:900,maxNodes:30000,maxOperations:250000});self.postMessage({count:result.count,exhaustive:result.exhaustive});}
 catch{self.postMessage({count:0,exhaustive:false});}
};
