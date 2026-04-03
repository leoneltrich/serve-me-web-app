import { B as proxy, C as from_html, D as delegated, E as delegate, H as state, K as pop, L as child, N as template_effect, R as first_child, S as comment, T as text, U as user_derived, V as set, X as next, Z as reset, _ as each, a as init, b as set_text, g as snippet, k as get, m as transition, p as set_class, q as push, u as set_attribute, v as index, w as from_svg, x as append, y as if_block, z as sibling } from "../chunks/DohVbzTv.js";
import { t as goto } from "../chunks/8RX006yo.js";
import "../chunks/BJgEf1bw.js";
import { t as page } from "../chunks/DhCOi6OG.js";
import "../chunks/Dydqc8X_.js";
import { n as getAuthService } from "../chunks/BNTimwTx.js";
import { t as authState } from "../chunks/B2l_R2eB.js";
import "../chunks/ChxmEFMn.js";
import { t as themeState } from "../chunks/UOgxJkq1.js";
//#region src/lib/services/ui.svelte.ts
var uiState = proxy({
	isSidebarOpen: false,
	isLogoutConfirmationOpen: false,
	toggleSidebar() {
		this.isSidebarOpen = !this.isSidebarOpen;
	},
	closeSidebar() {
		this.isSidebarOpen = false;
	},
	openLogoutConfirmation() {
		this.isLogoutConfirmationOpen = true;
	},
	closeLogoutConfirmation() {
		this.isLogoutConfirmationOpen = false;
	}
});
//#endregion
//#region src/lib/components/dashboard/Sidebar.svelte
var root_1$3 = from_html(`<a><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path></path></svg> <span> </span></a>`);
var root$1 = from_html(`<aside><div class="sidebar-brand svelte-mci0h3"><div class="brand-info svelte-mci0h3"><div class="brand-icon svelte-mci0h3"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg></div> <span>SERVE_ME</span></div> <button class="close-sidebar svelte-mci0h3" aria-label="Close sidebar"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div> <nav class="sidebar-nav svelte-mci0h3"></nav></aside>`);
function Sidebar($$anchor, $$props) {
	push($$props, false);
	const navItems = [
		{
			name: "Overview",
			path: "/dashboard",
			icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
		},
		{
			name: "Servers",
			path: "/dashboard/servers",
			icon: "M2 20h20M5 20V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12M9 13h6"
		},
		{
			name: "Users",
			path: "/dashboard/users",
			icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
		}
	];
	init();
	var aside = root$1();
	let classes;
	var div = child(aside);
	var button = sibling(child(div), 2);
	reset(div);
	var nav = sibling(div, 2);
	each(nav, 5, () => navItems, index, ($$anchor, item) => {
		var a = root_1$3();
		let classes_1;
		var svg = child(a);
		var path = child(svg);
		reset(svg);
		var span = sibling(svg, 2);
		var text = child(span, true);
		reset(span);
		reset(a);
		template_effect(() => {
			set_attribute(a, "href", get(item).path);
			classes_1 = set_class(a, 1, "nav-link svelte-mci0h3", null, classes_1, { active: page.url.pathname === get(item).path });
			set_attribute(path, "d", get(item).icon);
			set_text(text, get(item).name);
		});
		delegated("click", a, () => uiState.closeSidebar());
		append($$anchor, a);
	});
	reset(nav);
	reset(aside);
	template_effect(() => classes = set_class(aside, 1, "sidebar svelte-mci0h3", null, classes, { open: uiState.isSidebarOpen }));
	delegated("click", button, () => uiState.closeSidebar());
	append($$anchor, aside);
	pop();
}
delegate(["click"]);
//#endregion
//#region src/lib/components/dashboard/Header.svelte
var root_1$2 = from_svg(`<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`);
var root_3 = from_svg(`<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`);
var root_4 = from_svg(`<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`);
var root_5 = from_html(`<div class="dropdown-menu svelte-1axdyno"><div class="dropdown-header svelte-1axdyno"><div class="dropdown-user-info svelte-1axdyno"><div class="user-avatar-large svelte-1axdyno"> </div> <div class="user-text svelte-1axdyno"><p class="user-name svelte-1axdyno"> </p> <p class="user-role svelte-1axdyno">Administrator</p></div></div></div> <div class="dropdown-divider svelte-1axdyno"></div> <div class="dropdown-content svelte-1axdyno"><button class="dropdown-item logout svelte-1axdyno"><div class="item-icon svelte-1axdyno"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"></path></svg></div> <span>Sign Out</span></button></div></div> <button class="menu-overlay svelte-1axdyno" aria-label="Close menu"></button>`, 1);
var root = from_html(`<header class="header svelte-1axdyno"><div class="header-left svelte-1axdyno"><button class="menu-button svelte-1axdyno" aria-label="Toggle Menu"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button> <div class="breadcrumb svelte-1axdyno"> </div></div> <div class="header-actions svelte-1axdyno"><button class="theme-toggle svelte-1axdyno" aria-label="Toggle theme mode"><!></button> <div class="user-menu-container svelte-1axdyno"><button class="user-badge svelte-1axdyno"><div class="user-avatar-small svelte-1axdyno"> </div> <span class="username svelte-1axdyno"> </span> <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg></button> <!></div></div></header>`);
function Header($$anchor, $$props) {
	push($$props, true);
	getAuthService();
	let isUserMenuOpen = state(false);
	let breadcrumb = user_derived(() => () => {
		const path = page.url.pathname;
		if (path.includes("users")) return "System / Users";
		if (path.includes("servers")) return "Network / Servers";
		return "Dashboard / Overview";
	});
	function handleLogout() {
		set(isUserMenuOpen, false);
		uiState.openLogoutConfirmation();
	}
	function toggleUserMenu() {
		set(isUserMenuOpen, !get(isUserMenuOpen));
	}
	var header = root();
	var div = child(header);
	var button = child(div);
	var div_1 = sibling(button, 2);
	var text = child(div_1, true);
	reset(div_1);
	reset(div);
	var div_2 = sibling(div, 2);
	var button_1 = child(div_2);
	var node = child(button_1);
	var consequent = ($$anchor) => {
		append($$anchor, root_1$2());
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
			if (themeState.dark) $$render(consequent_1);
			else $$render(alternate, -1);
		});
		append($$anchor, fragment);
	};
	if_block(node, ($$render) => {
		if (themeState.mode === "system") $$render(consequent);
		else $$render(alternate_1, -1);
	});
	reset(button_1);
	var div_3 = sibling(button_1, 2);
	var button_2 = child(div_3);
	var div_4 = child(button_2);
	var text_1 = child(div_4, true);
	reset(div_4);
	var span = sibling(div_4, 2);
	var text_2 = child(span, true);
	reset(span);
	var svg_3 = sibling(span, 2);
	let classes;
	reset(button_2);
	var node_2 = sibling(button_2, 2);
	var consequent_2 = ($$anchor) => {
		var fragment_1 = root_5();
		var div_5 = first_child(fragment_1);
		var div_6 = child(div_5);
		var div_7 = child(div_6);
		var div_8 = child(div_7);
		var text_3 = child(div_8, true);
		reset(div_8);
		var div_9 = sibling(div_8, 2);
		var p = child(div_9);
		var text_4 = child(p, true);
		reset(p);
		next(2);
		reset(div_9);
		reset(div_7);
		reset(div_6);
		var div_10 = sibling(div_6, 4);
		var button_3 = child(div_10);
		reset(div_10);
		reset(div_5);
		var button_4 = sibling(div_5, 2);
		template_effect(($0) => {
			set_text(text_3, $0);
			set_text(text_4, authState.user.username);
		}, [() => authState.user.username.charAt(0).toUpperCase()]);
		delegated("click", button_3, handleLogout);
		delegated("click", button_4, () => set(isUserMenuOpen, false));
		append($$anchor, fragment_1);
	};
	if_block(node_2, ($$render) => {
		if (get(isUserMenuOpen) && authState.user) $$render(consequent_2);
	});
	reset(div_3);
	reset(div_2);
	reset(header);
	template_effect(($0, $1) => {
		set_text(text, $0);
		set_attribute(button_1, "title", `Current: ${themeState.mode ?? ""}`);
		set_attribute(button_2, "aria-expanded", get(isUserMenuOpen));
		set_text(text_1, $1);
		set_text(text_2, authState.user?.username ?? "Loading...");
		classes = set_class(svg_3, 0, "chevron svelte-1axdyno", null, classes, { open: get(isUserMenuOpen) });
	}, [() => get(breadcrumb)(), () => authState.user?.username?.charAt(0).toUpperCase() ?? "?"]);
	delegated("click", button, () => uiState.toggleSidebar());
	delegated("click", button_1, () => themeState.toggle());
	delegated("click", button_2, toggleUserMenu);
	append($$anchor, header);
	pop();
}
delegate(["click"]);
//#endregion
//#region node_modules/svelte/src/transition/index.js
/** @param {number} x */
var linear = (x) => x;
/** @param {number} t */
function cubic_out(t) {
	const f = t - 1;
	return f * f * f + 1;
}
/**
* Animates the opacity of an element from 0 to the current opacity for `in` transitions and from the current opacity to 0 for `out` transitions.
*
* @param {Element} node
* @param {FadeParams} [params]
* @returns {TransitionConfig}
*/
function fade(node, { delay = 0, duration = 400, easing = linear } = {}) {
	const o = +getComputedStyle(node).opacity;
	return {
		delay,
		duration,
		easing,
		css: (t) => `opacity: ${t * o}`
	};
}
/**
* Animates the opacity and scale of an element. `in` transitions animate from the provided values, passed as parameters, to an element's current (default) values. `out` transitions animate from an element's default values to the provided values.
*
* @param {Element} node
* @param {ScaleParams} [params]
* @returns {TransitionConfig}
*/
function scale(node, { delay = 0, duration = 400, easing = cubic_out, start = 0, opacity = 0 } = {}) {
	const style = getComputedStyle(node);
	const target_opacity = +style.opacity;
	const transform = style.transform === "none" ? "" : style.transform;
	const sd = 1 - start;
	const od = target_opacity * (1 - opacity);
	return {
		delay,
		duration,
		easing,
		css: (_t, u) => `
			transform: ${transform} scale(${1 - sd * u});
			opacity: ${target_opacity - od * u}
		`
	};
}
//#endregion
//#region src/lib/components/dashboard/LogoutModal.svelte
var root_2$1 = from_html(`<span class="spinner svelte-wvs6b8"></span> Signing Out...`, 1);
var root_1$1 = from_html(`<div class="logout-backdrop svelte-wvs6b8" role="button" tabindex="0"><div class="logout-card svelte-wvs6b8" role="dialog" aria-modal="true" aria-labelledby="logout-title"><div class="logout-header svelte-wvs6b8"><div class="logout-icon-wrapper svelte-wvs6b8"><div class="logout-icon-glow svelte-wvs6b8"></div> <div class="logout-icon-container svelte-wvs6b8"><svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></div></div></div> <div class="logout-content svelte-wvs6b8"><h2 id="logout-title" class="svelte-wvs6b8">Sign Out</h2> <p class="svelte-wvs6b8">Are you sure you want to end your session? You will be redirected to the login page.</p></div> <div class="logout-actions svelte-wvs6b8"><button class="cancel-btn svelte-wvs6b8">Cancel</button> <button><!></button></div></div></div>`);
function LogoutModal($$anchor, $$props) {
	push($$props, true);
	const authService = getAuthService();
	let isLoggingOut = state(false);
	async function handleLogout() {
		set(isLoggingOut, true);
		try {
			await authService.logout();
		} catch (e) {
			console.error("Logout error:", e);
		} finally {
			authState.setUser(null);
			uiState.closeLogoutConfirmation();
			set(isLoggingOut, false);
			goto("/login");
		}
	}
	function handleCancel() {
		if (!get(isLoggingOut)) uiState.closeLogoutConfirmation();
	}
	var fragment = comment();
	var node = first_child(fragment);
	var consequent_1 = ($$anchor) => {
		var div = root_1$1();
		var div_1 = child(div);
		var div_2 = sibling(child(div_1), 4);
		var button = child(div_2);
		var button_1 = sibling(button, 2);
		let classes;
		var node_1 = child(button_1);
		var consequent = ($$anchor) => {
			var fragment_1 = root_2$1();
			next();
			append($$anchor, fragment_1);
		};
		var alternate = ($$anchor) => {
			append($$anchor, text("Sign Out"));
		};
		if_block(node_1, ($$render) => {
			if (get(isLoggingOut)) $$render(consequent);
			else $$render(alternate, -1);
		});
		reset(button_1);
		reset(div_2);
		reset(div_1);
		reset(div);
		template_effect(() => {
			button.disabled = get(isLoggingOut);
			classes = set_class(button_1, 1, "confirm-btn svelte-wvs6b8", null, classes, { loading: get(isLoggingOut) });
			button_1.disabled = get(isLoggingOut);
		});
		delegated("click", div, handleCancel);
		delegated("keydown", div, (e) => e.key === "Escape" && handleCancel());
		delegated("click", div_1, (e) => e.stopPropagation());
		delegated("click", button, handleCancel);
		delegated("click", button_1, handleLogout);
		transition(3, div_1, () => scale, () => ({
			duration: 300,
			start: .9,
			opacity: 0
		}));
		transition(3, div, () => fade, () => ({ duration: 250 }));
		append($$anchor, div);
	};
	if_block(node, ($$render) => {
		if (uiState.isLogoutConfirmationOpen) $$render(consequent_1);
	});
	append($$anchor, fragment);
	pop();
}
delegate(["click", "keydown"]);
//#endregion
//#region src/routes/dashboard/+layout.svelte
var root_2 = from_html(`<button class="sidebar-overlay svelte-2agd5u" aria-label="Close sidebar"></button>`);
var root_1 = from_html(`<div class="dashboard-layout svelte-2agd5u"><!> <!> <div class="main-container svelte-2agd5u"><!> <main class="content svelte-2agd5u"><!></main></div> <!></div>`);
function _layout($$anchor, $$props) {
	push($$props, true);
	var fragment = comment();
	var node = first_child(fragment);
	var consequent_1 = ($$anchor) => {
		var div = root_1();
		var node_1 = child(div);
		Sidebar(node_1, {});
		var node_2 = sibling(node_1, 2);
		var consequent = ($$anchor) => {
			var button = root_2();
			delegated("click", button, () => uiState.closeSidebar());
			append($$anchor, button);
		};
		if_block(node_2, ($$render) => {
			if (uiState.isSidebarOpen) $$render(consequent);
		});
		var div_1 = sibling(node_2, 2);
		var node_3 = child(div_1);
		Header(node_3, {});
		var main = sibling(node_3, 2);
		snippet(child(main), () => $$props.children);
		reset(main);
		reset(div_1);
		LogoutModal(sibling(div_1, 2), {});
		reset(div);
		append($$anchor, div);
	};
	if_block(node, ($$render) => {
		if (authState.isAuthenticated) $$render(consequent_1);
	});
	append($$anchor, fragment);
	pop();
}
delegate(["click"]);
//#endregion
export { _layout as component };
