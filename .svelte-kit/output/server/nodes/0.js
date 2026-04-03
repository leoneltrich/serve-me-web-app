import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.DjJFPfAX.js","_app/immutable/chunks/DohVbzTv.js","_app/immutable/chunks/8RX006yo.js","_app/immutable/chunks/Dydqc8X_.js","_app/immutable/chunks/DhCOi6OG.js","_app/immutable/chunks/BJgEf1bw.js","_app/immutable/chunks/B2l_R2eB.js","_app/immutable/chunks/BNTimwTx.js"];
export const stylesheets = ["_app/immutable/assets/0.BSTmesBm.css"];
export const fonts = [];
