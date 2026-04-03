import { C as from_html, K as pop, L as child, N as template_effect, R as first_child, Z as reset, a as init, b as set_text, q as push, x as append, z as sibling } from "../chunks/DohVbzTv.js";
import "../chunks/BJgEf1bw.js";
import { t as page } from "../chunks/DhCOi6OG.js";
import "../chunks/ChxmEFMn.js";
//#region node_modules/@sveltejs/kit/src/runtime/components/svelte-5/error.svelte
var root = from_html(`<h1> </h1> <p> </p>`, 1);
function Error($$anchor, $$props) {
	push($$props, false);
	init();
	var fragment = root();
	var h1 = first_child(fragment);
	var text = child(h1, true);
	reset(h1);
	var p = sibling(h1, 2);
	var text_1 = child(p, true);
	reset(p);
	template_effect(() => {
		set_text(text, page.status);
		set_text(text_1, page.error?.message);
	});
	append($$anchor, fragment);
	pop();
}
//#endregion
export { Error as component };
