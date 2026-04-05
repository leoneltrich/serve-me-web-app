import {O as escape_html, d as slot, f as spread_props, u as sanitize_props} from "./server.js";
import {t as Icon} from "./Icon.js";

//#region node_modules/lucide-svelte/dist/icons/x.svelte
function X($$renderer, $$props) {
    Icon($$renderer, spread_props([
        {name: "x"},
        sanitize_props($$props),
        {
            iconNode: [["path", {"d": "M18 6 6 18"}], ["path", {"d": "m6 6 12 12"}]],
            children: ($$renderer) => {
                $$renderer.push(`<!--[-->`);
                slot($$renderer, $$props, "default", {}, null);
                $$renderer.push(`<!--]-->`);
            },
            $$slots: {default: true}
        }
    ]));
}

//#endregion
//#region src/lib/components/dashboard/Modal.svelte
function Modal($$renderer, $$props) {
    let {title, children, onclose, isOpen = true} = $$props;
    if (isOpen) {
        $$renderer.push("<!--[0-->");
        $$renderer.push(`<div class="modal-backdrop svelte-990e9y" role="presentation"><div class="modal-container svelte-990e9y" role="dialog" aria-modal="true"><header class="modal-header svelte-990e9y"><h2 class="svelte-990e9y">${escape_html(title)}</h2> <button class="close-button svelte-990e9y" aria-label="Close modal">`);
        X($$renderer, {size: 20});
        $$renderer.push(`<!----></button></header> <main class="modal-content svelte-990e9y">`);
        children($$renderer);
        $$renderer.push(`<!----></main></div></div>`);
    } else $$renderer.push("<!--[-1-->");
    $$renderer.push(`<!--]-->`);
}
//#endregion
export {X as n, Modal as t};
