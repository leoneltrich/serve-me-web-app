import { b as escape_html, i as ensure_array_like, o as stringify, r as derived, t as attr_class, y as attr } from "../../../chunks/server.js";
import { t as page } from "../../../chunks/state.js";
import "../../../chunks/navigation.js";
import { n as getAuthService } from "../../../chunks/context.js";
import { t as authState } from "../../../chunks/auth.state.svelte.js";
import { t as themeState } from "../../../chunks/theme.svelte.js";
//#region src/lib/services/ui.svelte.ts
var uiState = {
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
};
//#endregion
//#region src/lib/components/dashboard/Sidebar.svelte
function Sidebar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
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
		$$renderer.push(`<aside${attr_class("sidebar svelte-mci0h3", void 0, { "open": uiState.isSidebarOpen })}><div class="sidebar-brand svelte-mci0h3"><div class="brand-info svelte-mci0h3"><div class="brand-icon svelte-mci0h3"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg></div> <span>SERVE_ME</span></div> <button class="close-sidebar svelte-mci0h3" aria-label="Close sidebar"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div> <nav class="sidebar-nav svelte-mci0h3"><!--[-->`);
		const each_array = ensure_array_like(navItems);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<a${attr("href", item.path)}${attr_class("nav-link svelte-mci0h3", void 0, { "active": page.url.pathname === item.path })}><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path${attr("d", item.icon)}></path></svg> <span>${escape_html(item.name)}</span></a>`);
		}
		$$renderer.push(`<!--]--></nav></aside>`);
	});
}
//#endregion
//#region src/lib/components/dashboard/Header.svelte
function Header($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		getAuthService();
		let isUserMenuOpen = false;
		let breadcrumb = derived(() => () => {
			const path = page.url.pathname;
			if (path.includes("users")) return "System / Users";
			if (path.includes("servers")) return "Network / Servers";
			return "Dashboard / Overview";
		});
		$$renderer.push(`<header class="header svelte-1axdyno"><div class="header-left svelte-1axdyno"><button class="menu-button svelte-1axdyno" aria-label="Toggle Menu"><svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button> <div class="breadcrumb svelte-1axdyno">${escape_html(breadcrumb()())}</div></div> <div class="header-actions svelte-1axdyno"><button class="theme-toggle svelte-1axdyno" aria-label="Toggle theme mode"${attr("title", `Current: ${stringify(themeState.mode)}`)}>`);
		if (themeState.mode === "system") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`);
		} else {
			$$renderer.push("<!--[-1-->");
			if (themeState.dark) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`);
			}
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></button> <div class="user-menu-container svelte-1axdyno"><button class="user-badge svelte-1axdyno"${attr("aria-expanded", isUserMenuOpen)}><div class="user-avatar-small svelte-1axdyno">${escape_html(authState.user?.username?.charAt(0).toUpperCase() ?? "?")}</div> <span class="username svelte-1axdyno">${escape_html(authState.user?.username ?? "Loading...")}</span> <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"${attr_class("chevron svelte-1axdyno", void 0, { "open": isUserMenuOpen })}><polyline points="6 9 12 15 18 9"></polyline></svg></button> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div></header>`);
	});
}
//#endregion
//#region src/lib/components/dashboard/LogoutModal.svelte
function LogoutModal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		getAuthService();
		let isLoggingOut = false;
		if (uiState.isLogoutConfirmationOpen) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="logout-backdrop svelte-wvs6b8" role="button" tabindex="0"><div class="logout-card svelte-wvs6b8" role="dialog" aria-modal="true" aria-labelledby="logout-title"><div class="logout-header svelte-wvs6b8"><div class="logout-icon-wrapper svelte-wvs6b8"><div class="logout-icon-glow svelte-wvs6b8"></div> <div class="logout-icon-container svelte-wvs6b8"><svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></div></div></div> <div class="logout-content svelte-wvs6b8"><h2 id="logout-title" class="svelte-wvs6b8">Sign Out</h2> <p class="svelte-wvs6b8">Are you sure you want to end your session? You will be redirected to the login page.</p></div> <div class="logout-actions svelte-wvs6b8"><button class="cancel-btn svelte-wvs6b8"${attr("disabled", isLoggingOut, true)}>Cancel</button> <button${attr_class("confirm-btn svelte-wvs6b8", void 0, { "loading": isLoggingOut })}${attr("disabled", isLoggingOut, true)}>`);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`Sign Out`);
			$$renderer.push(`<!--]--></button></div></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/routes/dashboard/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children } = $$props;
		if (authState.isAuthenticated) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="dashboard-layout svelte-2agd5u">`);
			Sidebar($$renderer, {});
			$$renderer.push(`<!----> `);
			if (uiState.isSidebarOpen) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<button class="sidebar-overlay svelte-2agd5u" aria-label="Close sidebar"></button>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="main-container svelte-2agd5u">`);
			Header($$renderer, {});
			$$renderer.push(`<!----> <main class="content svelte-2agd5u">`);
			children($$renderer);
			$$renderer.push(`<!----></main></div> `);
			LogoutModal($$renderer, {});
			$$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _layout as default };
