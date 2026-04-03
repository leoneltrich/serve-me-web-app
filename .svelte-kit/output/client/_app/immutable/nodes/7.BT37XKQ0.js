import { C as from_html, D as delegated, E as delegate, H as state, K as pop, L as child, N as template_effect, O as event, R as first_child, S as comment, V as set, Z as reset, b as set_text, c as bind_value, k as get, l as remove_input_defaults, q as push, u as set_attribute, w as from_svg, x as append, y as if_block, z as sibling } from "../chunks/DohVbzTv.js";
import { n as invalidateAll } from "../chunks/8RX006yo.js";
import "../chunks/BJgEf1bw.js";
import "../chunks/Dydqc8X_.js";
import { n as getAuthService } from "../chunks/BNTimwTx.js";
import { t as authState } from "../chunks/B2l_R2eB.js";
import { t as themeState } from "../chunks/UOgxJkq1.js";
//#region src/routes/login/+page.svelte
var root_1 = from_svg(`<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`);
var root_3 = from_svg(`<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`);
var root_4 = from_svg(`<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`);
var root_5 = from_html(`<div class="error-banner svelte-1x05zx6"> </div>`);
var root_6 = from_svg(`<svg class="btn-icon svelte-1x05zx6" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`);
var root = from_html(`<div class="login-wrapper svelte-1x05zx6"><button class="theme-toggle svelte-1x05zx6" aria-label="Toggle theme mode"><!></button> <main class="login-card svelte-1x05zx6"><div class="card-highlight svelte-1x05zx6"></div> <header class="login-header svelte-1x05zx6"><div class="brand-mark svelte-1x05zx6"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg></div> <h1 class="login-title svelte-1x05zx6">Welcome back</h1> <p class="login-subtitle svelte-1x05zx6">Sign in to your ServeMe account.</p></header> <form class="login-form svelte-1x05zx6"><!> <div class="form-group svelte-1x05zx6"><div class="input-wrapper svelte-1x05zx6"><span class="input-icon svelte-1x05zx6"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span> <input class="form-input svelte-1x05zx6" type="text" id="username" autocomplete="username" placeholder="username" required=""/></div></div> <div class="form-group svelte-1x05zx6"><div class="input-wrapper svelte-1x05zx6"><span class="input-icon svelte-1x05zx6"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></span> <input class="form-input svelte-1x05zx6" type="password" id="password" autocomplete="current-password" placeholder="password" required=""/></div></div> <button type="submit" class="submit-button svelte-1x05zx6"><span> </span> <!></button></form></main></div>`);
function _page($$anchor, $$props) {
	push($$props, true);
	const authService = getAuthService();
	let username = state("");
	let password = state("");
	let isLoading = state(false);
	let errorMessage = state(null);
	async function handleLogin(e) {
		e.preventDefault();
		set(isLoading, true);
		set(errorMessage, null);
		try {
			const user = await authService.login(get(username), get(password));
			authState.setUser(user);
			await invalidateAll();
		} catch (err) {
			set(errorMessage, err instanceof Error ? err.message : "Invalid credentials", true);
		} finally {
			set(isLoading, false);
		}
	}
	function toggleTheme() {
		themeState.toggle();
	}
	var div = root();
	var button = child(div);
	var node = child(button);
	var consequent = ($$anchor) => {
		append($$anchor, root_1());
	};
	var alternate_1 = ($$anchor) => {
		var fragment = comment();
		var node_1 = first_child(fragment);
		var consequent_1 = ($$anchor) => {
			append($$anchor, root_3());
		};
		var alternate = ($$anchor) => {
			append($$anchor, root_4());
		};
		if_block(node_1, ($$render) => {
			if (themeState.isDarkMode) $$render(consequent_1);
			else $$render(alternate, -1);
		});
		append($$anchor, fragment);
	};
	if_block(node, ($$render) => {
		if (themeState.mode === "system") $$render(consequent);
		else $$render(alternate_1, -1);
	});
	reset(button);
	var main = sibling(button, 2);
	var form = sibling(child(main), 4);
	var node_2 = child(form);
	var consequent_2 = ($$anchor) => {
		var div_1 = root_5();
		var text = child(div_1, true);
		reset(div_1);
		template_effect(() => set_text(text, get(errorMessage)));
		append($$anchor, div_1);
	};
	if_block(node_2, ($$render) => {
		if (get(errorMessage)) $$render(consequent_2);
	});
	var div_2 = sibling(node_2, 2);
	var div_3 = child(div_2);
	var input = sibling(child(div_3), 2);
	remove_input_defaults(input);
	reset(div_3);
	reset(div_2);
	var div_4 = sibling(div_2, 2);
	var div_5 = child(div_4);
	var input_1 = sibling(child(div_5), 2);
	remove_input_defaults(input_1);
	reset(div_5);
	reset(div_4);
	var button_1 = sibling(div_4, 2);
	var span = child(button_1);
	var text_1 = child(span, true);
	reset(span);
	var node_3 = sibling(span, 2);
	var consequent_3 = ($$anchor) => {
		append($$anchor, root_6());
	};
	if_block(node_3, ($$render) => {
		if (!get(isLoading)) $$render(consequent_3);
	});
	reset(button_1);
	reset(form);
	reset(main);
	reset(div);
	template_effect(() => {
		set_attribute(button, "title", `Current: ${themeState.mode ?? ""}`);
		input.disabled = get(isLoading);
		input_1.disabled = get(isLoading);
		button_1.disabled = get(isLoading);
		set_text(text_1, get(isLoading) ? "Authenticating..." : "Sign In");
	});
	delegated("click", button, toggleTheme);
	event("submit", form, handleLogin);
	bind_value(input, () => get(username), ($$value) => set(username, $$value));
	bind_value(input_1, () => get(password), ($$value) => set(password, $$value));
	append($$anchor, div);
	pop();
}
delegate(["click"]);
//#endregion
export { _page as component };
