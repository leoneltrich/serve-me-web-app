import {
    E as attr,
    O as escape_html,
    d as slot,
    f as spread_props,
    p as stringify,
    u as sanitize_props
} from "../../../chunks/server.js";
import "../../../chunks/navigation.js";
import { n as getAuthService } from "../../../chunks/context.js";
import "../../../chunks/auth.state.svelte.js";
import {t as Icon} from "../../../chunks/Icon.js";
import {t as Lock} from "../../../chunks/lock.js";
import {i as Monitor, n as Sun, r as Moon, t as themeState} from "../../../chunks/theme.svelte.js";

//#region node_modules/lucide-svelte/dist/icons/arrow-right.svelte
function Arrow_right($$renderer, $$props) {
    Icon($$renderer, spread_props([
        {name: "arrow-right"},
        sanitize_props($$props),
        {
            iconNode: [["path", {"d": "M5 12h14"}], ["path", {"d": "m12 5 7 7-7 7"}]],
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
//#region node_modules/lucide-svelte/dist/icons/user.svelte
function User($$renderer, $$props) {
    Icon($$renderer, spread_props([
        {name: "user"},
        sanitize_props($$props),
        {
            iconNode: [["path", {"d": "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}], ["circle", {
                "cx": "12",
                "cy": "7",
                "r": "4"
            }]],
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
//#region src/routes/login/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		getAuthService();
		let username = "";
		let password = "";
		let isLoading = false;
		$$renderer.push(`<div class="login-wrapper svelte-1x05zx6"><button class="theme-toggle svelte-1x05zx6" aria-label="Toggle theme mode"${attr("title", `Current: ${stringify(themeState.mode)}`)}>`);
		if (themeState.mode === "system") {
			$$renderer.push("<!--[0-->");
            Monitor($$renderer, {size: 18});
		} else {
			$$renderer.push("<!--[-1-->");
            if (themeState.dark) {
				$$renderer.push("<!--[0-->");
                Sun($$renderer, {size: 18});
			} else {
				$$renderer.push("<!--[-1-->");
                Moon($$renderer, {size: 18});
			}
			$$renderer.push(`<!--]-->`);
		}
        $$renderer.push(`<!--]--></button> <main class="login-card svelte-1x05zx6"><div class="card-highlight svelte-1x05zx6"></div> <header class="login-header svelte-1x05zx6"><div class="brand-mark svelte-1x05zx6"><img src="/serve-me-logo.svg" alt="Logo" width="32" height="32"/></div> <h1 class="login-title svelte-1x05zx6">Welcome back</h1> <p class="login-subtitle svelte-1x05zx6">Sign in to your ServeMe account.</p></header> <form class="login-form svelte-1x05zx6">`);
		$$renderer.push("<!--[-1-->");
        $$renderer.push(`<!--]--> <div class="form-group svelte-1x05zx6"><div class="input-wrapper svelte-1x05zx6"><span class="input-icon svelte-1x05zx6">`);
        User($$renderer, {size: 18});
        $$renderer.push(`<!----></span> <input class="form-input svelte-1x05zx6" type="text" id="username" autocomplete="username" placeholder="username" required=""${attr("value", username)}${attr("disabled", isLoading, true)}/></div></div> <div class="form-group svelte-1x05zx6"><div class="input-wrapper svelte-1x05zx6"><span class="input-icon svelte-1x05zx6">`);
        Lock($$renderer, {size: 18});
        $$renderer.push(`<!----></span> <input class="form-input svelte-1x05zx6" type="password" id="password" autocomplete="current-password" placeholder="password" required=""${attr("value", password)}${attr("disabled", isLoading, true)}/></div></div> <button type="submit" class="submit-button svelte-1x05zx6"${attr("disabled", isLoading, true)}><span>${escape_html("Sign In")}</span> `);
		$$renderer.push("<!--[0-->");
        Arrow_right($$renderer, {
            size: 16,
            class: "btn-icon"
        });
		$$renderer.push(`<!--]--></button></form></main></div>`);
	});
}
//#endregion
export { _page as default };
