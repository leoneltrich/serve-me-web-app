import "../../../chunks/index-server.js";
import { b as escape_html, o as stringify, y as attr } from "../../../chunks/server.js";
import "../../../chunks/navigation.js";
import { n as getAuthService } from "../../../chunks/context.js";
import "../../../chunks/auth.state.svelte.js";
import { t as themeState } from "../../../chunks/theme.svelte.js";
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
			$$renderer.push(`<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`);
		} else {
			$$renderer.push("<!--[-1-->");
			if (themeState.isDarkMode) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`);
			}
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></button> <main class="login-card svelte-1x05zx6"><div class="card-highlight svelte-1x05zx6"></div> <header class="login-header svelte-1x05zx6"><div class="brand-mark svelte-1x05zx6"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg></div> <h1 class="login-title svelte-1x05zx6">Welcome back</h1> <p class="login-subtitle svelte-1x05zx6">Sign in to your ServeMe account.</p></header> <form class="login-form svelte-1x05zx6">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="form-group svelte-1x05zx6"><div class="input-wrapper svelte-1x05zx6"><span class="input-icon svelte-1x05zx6"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span> <input class="form-input svelte-1x05zx6" type="text" id="username" autocomplete="username" placeholder="username" required=""${attr("value", username)}${attr("disabled", isLoading, true)}/></div></div> <div class="form-group svelte-1x05zx6"><div class="input-wrapper svelte-1x05zx6"><span class="input-icon svelte-1x05zx6"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></span> <input class="form-input svelte-1x05zx6" type="password" id="password" autocomplete="current-password" placeholder="password" required=""${attr("value", password)}${attr("disabled", isLoading, true)}/></div></div> <button type="submit" class="submit-button svelte-1x05zx6"${attr("disabled", isLoading, true)}><span>${escape_html("Sign In")}</span> `);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<svg class="btn-icon svelte-1x05zx6" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`);
		$$renderer.push(`<!--]--></button></form></main></div>`);
	});
}
//#endregion
export { _page as default };
