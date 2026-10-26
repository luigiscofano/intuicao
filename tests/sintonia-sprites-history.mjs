// An explicit, hash-locked later authorization. Historical content-v2 checks
// still compare every prior asset and style byte; only this exact new mapping
// can be projected back to its exact pre-sprite state.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
export const USER_SPRITE_CHANGE=JSON.parse(fs.readFileSync(new URL('./sintonia-sprites-authorized-change.json',import.meta.url)));
export const sha256=value=>crypto.createHash('sha256').update(value).digest('hex');
const root=process.env.SINTONIA_TEST_ROOT||path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export function assertAuthorizedUserSpriteFiles(){
 assert.equal(sha256(fs.readFileSync(path.join(root,USER_SPRITE_CHANGE.module))),USER_SPRITE_CHANGE.afterSHA256,'Only the exact authorized sprite mapping is allowed');
 for(const asset of USER_SPRITE_CHANGE.newAssets)assert.equal(sha256(fs.readFileSync(path.join(root,asset.path))),asset.sha256,`Exact authorized sprite asset: ${asset.path}`);
}
export function restorePreUserSpriteAssets(current){
 assert.equal(sha256(current),USER_SPRITE_CHANGE.afterSHA256,'Current sprite mapping must match its explicit authorization');
 assert.equal(current,USER_SPRITE_CHANGE.after);
 assert.equal(sha256(USER_SPRITE_CHANGE.before),USER_SPRITE_CHANGE.beforeSHA256,'Historical mapping is itself hash-locked');
 return USER_SPRITE_CHANGE.before;
}
