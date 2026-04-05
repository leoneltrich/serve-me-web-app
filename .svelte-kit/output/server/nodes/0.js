import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.DxFYGBzY.js", "_app/immutable/chunks/Dweq9PLV.js", "_app/immutable/chunks/-w2SGnk9.js", "_app/immutable/chunks/DgFN6V_H.js", "_app/immutable/chunks/B71xNplG.js", "_app/immutable/chunks/v_jBEYI6.js", "_app/immutable/chunks/JxyYIA3p.js", "_app/immutable/chunks/CuEEI6H5.js"];
export const stylesheets = ["_app/immutable/assets/0.BhEb8tpS.css"];
export const fonts = [];
