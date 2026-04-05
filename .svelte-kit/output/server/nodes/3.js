

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.BPsVZ1Se.js", "_app/immutable/chunks/Dweq9PLV.js", "_app/immutable/chunks/v_jBEYI6.js", "_app/immutable/chunks/BC0SvPU9.js"];
export const stylesheets = [];
export const fonts = [];
