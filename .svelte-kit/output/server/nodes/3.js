

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.Ce8qmcBH.js","_app/immutable/chunks/DohVbzTv.js","_app/immutable/chunks/BJgEf1bw.js","_app/immutable/chunks/ChxmEFMn.js"];
export const stylesheets = [];
export const fonts = [];
