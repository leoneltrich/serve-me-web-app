import { b as escape_html } from "./server.js";
//#region src/lib/components/dashboard/Modal.svelte
function Modal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { isOpen, title, onclose, children } = $$props;
		if (isOpen) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="modal-backdrop svelte-990e9y" role="presentation"><div class="modal-container svelte-990e9y" role="dialog" aria-modal="true"><header class="modal-header svelte-990e9y"><h2 class="svelte-990e9y">${escape_html(title)}</h2> <button class="close-button svelte-990e9y" aria-label="Close modal"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></header> <main class="modal-content svelte-990e9y">`);
			children($$renderer);
			$$renderer.push(`<!----></main></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { Modal as t };
