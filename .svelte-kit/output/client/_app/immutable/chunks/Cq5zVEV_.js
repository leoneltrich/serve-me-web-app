import { C as from_html, D as delegated, E as delegate, I as $window, K as pop, L as child, N as template_effect, O as event, R as first_child, S as comment, Z as reset, b as set_text, g as snippet, q as push, x as append, y as if_block, z as sibling } from "./DohVbzTv.js";
import "./BJgEf1bw.js";
//#region src/lib/components/dashboard/Modal.svelte
var root_1 = from_html(`<div class="modal-backdrop svelte-990e9y" role="presentation"><div class="modal-container svelte-990e9y" role="dialog" aria-modal="true"><header class="modal-header svelte-990e9y"><h2 class="svelte-990e9y"> </h2> <button class="close-button svelte-990e9y" aria-label="Close modal"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></header> <main class="modal-content svelte-990e9y"><!></main></div></div>`);
function Modal($$anchor, $$props) {
	push($$props, true);
	function handleKeydown(e) {
		if (e.key === "Escape" && $$props.isOpen) $$props.onclose();
	}
	var fragment = comment();
	event("keydown", $window, handleKeydown);
	var node = first_child(fragment);
	var consequent = ($$anchor) => {
		var div = root_1();
		var div_1 = child(div);
		var header = child(div_1);
		var h2 = child(header);
		var text = child(h2, true);
		reset(h2);
		var button = sibling(h2, 2);
		reset(header);
		var main = sibling(header, 2);
		snippet(child(main), () => $$props.children);
		reset(main);
		reset(div_1);
		reset(div);
		template_effect(() => set_text(text, $$props.title));
		delegated("click", div, function(...$$args) {
			$$props.onclose?.apply(this, $$args);
		});
		delegated("click", div_1, (e) => e.stopPropagation());
		delegated("click", button, function(...$$args) {
			$$props.onclose?.apply(this, $$args);
		});
		append($$anchor, div);
	};
	if_block(node, ($$render) => {
		if ($$props.isOpen) $$render(consequent);
	});
	append($$anchor, fragment);
	pop();
}
delegate(["click"]);
//#endregion
export { Modal as t };
