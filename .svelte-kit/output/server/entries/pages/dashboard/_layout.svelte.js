import {
    E as attr,
    O as escape_html,
    d as slot,
    f as spread_props,
    p as stringify,
    s as ensure_array_like,
    t as attr_class,
    u as sanitize_props
} from "../../../chunks/server.js";
import { t as page } from "../../../chunks/state.js";
import "../../../chunks/navigation.js";
import { n as getAuthService } from "../../../chunks/context.js";
import { t as authState } from "../../../chunks/auth.state.svelte.js";
import {t as Icon} from "../../../chunks/Icon.js";
import {i as Monitor, n as Sun, r as Moon, t as themeState} from "../../../chunks/theme.svelte.js";
import {t as Server} from "../../../chunks/server2.js";
import {t as Users} from "../../../chunks/users.js";
import {n as X, t as Modal} from "../../../chunks/Modal.js";
//#region src/lib/services/ui.svelte.ts
var UIState = class {
    _isSidebarOpen = false;
    _isLogoutConfirmationOpen = false;

    get isSidebarOpen() {
        return this._isSidebarOpen;
    }

    get isLogoutConfirmationOpen() {
        return this._isLogoutConfirmationOpen;
    }
	toggleSidebar() {
        this._isSidebarOpen = !this._isSidebarOpen;
    }
	closeSidebar() {
        this._isSidebarOpen = false;
    }
	openLogoutConfirmation() {
        this._isLogoutConfirmationOpen = true;
    }
	closeLogoutConfirmation() {
        this._isLogoutConfirmationOpen = false;
	}
};
var uiState = new UIState();
//#endregion
//#region src/lib/config/navigation.ts
var navigationConfig = [
    {
        name: "Overview",
        path: "/dashboard",
        breadcrumb: "Dashboard / Overview"
    },
    {
        name: "Servers",
        path: "/dashboard/servers",
        breadcrumb: "Network / Servers"
    },
    {
        name: "Users",
        path: "/dashboard/users",
        breadcrumb: "System / Users"
    }
];
//#endregion
//#region node_modules/lucide-svelte/dist/icons/layout-dashboard.svelte
function Layout_dashboard($$renderer, $$props) {
    Icon($$renderer, spread_props([
        {name: "layout-dashboard"},
        sanitize_props($$props),
        {
            iconNode: [
                ["rect", {
                    "width": "7",
                    "height": "9",
                    "x": "3",
                    "y": "3",
                    "rx": "1"
                }],
                ["rect", {
                    "width": "7",
                    "height": "5",
                    "x": "14",
                    "y": "3",
                    "rx": "1"
                }],
                ["rect", {
                    "width": "7",
                    "height": "9",
                    "x": "14",
                    "y": "12",
                    "rx": "1"
                }],
                ["rect", {
                    "width": "7",
                    "height": "5",
                    "x": "3",
                    "y": "16",
                    "rx": "1"
                }]
            ],
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
//#region node_modules/lucide-svelte/dist/icons/log-out.svelte
function Log_out($$renderer, $$props) {
    Icon($$renderer, spread_props([
        {name: "log-out"},
        sanitize_props($$props),
        {
            iconNode: [
                ["path", {"d": "m16 17 5-5-5-5"}],
                ["path", {"d": "M21 12H9"}],
                ["path", {"d": "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}]
            ],
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
//#region node_modules/lucide-svelte/dist/icons/menu.svelte
function Menu($$renderer, $$props) {
    Icon($$renderer, spread_props([
        {name: "menu"},
        sanitize_props($$props),
        {
            iconNode: [
                ["path", {"d": "M4 5h16"}],
                ["path", {"d": "M4 12h16"}],
                ["path", {"d": "M4 19h16"}]
            ],
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
//#region src/lib/components/dashboard/Sidebar.svelte
function Sidebar($$renderer, $$props) {
    $$renderer.component(($$renderer) => {
        const iconMap = {
            "Overview": Layout_dashboard,
            "Servers": Server,
            "Users": Users
        };

        function getIcon(name) {
            return iconMap[name];
        }

        $$renderer.push(`<aside${attr_class("sidebar svelte-mci0h3", void 0, {"open": uiState.isSidebarOpen})}><div class="sidebar-brand svelte-mci0h3"><div class="brand-info svelte-mci0h3"><div class="brand-icon svelte-mci0h3"><img src="/serve-me-logo.svg" alt="Logo" width="32" height="32" class="svelte-mci0h3"/></div> <span>ServeMe</span></div> <button class="close-sidebar svelte-mci0h3" aria-label="Close sidebar">`);
        X($$renderer, {size: 20});
        $$renderer.push(`<!----></button></div> <nav class="sidebar-nav svelte-mci0h3"><!--[-->`);
        const each_array = ensure_array_like(navigationConfig);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
            $$renderer.push(`<a${attr("href", item.path)}${attr_class("nav-link svelte-mci0h3", void 0, {"active": page.url.pathname === item.path})}>`);
            if (getIcon(item.name)) {
                $$renderer.push("<!--[0-->");
                getIcon(item.name)($$renderer, {size: 18});
            } else $$renderer.push("<!--[-1-->");
            $$renderer.push(`<!--]--> <span>${escape_html(item.name)}</span></a>`);
		}
        $$renderer.push(`<!--]--></nav> `);
        if (authState.user) {
            $$renderer.push("<!--[0-->");
            $$renderer.push(`<div class="sidebar-footer svelte-mci0h3"><div class="user-profile svelte-mci0h3"><div class="user-avatar svelte-mci0h3">${escape_html(authState.user.username.charAt(0).toUpperCase())}</div> <div class="user-info svelte-mci0h3"><span class="user-name svelte-mci0h3">${escape_html(authState.user.username)}</span> <span class="user-role svelte-mci0h3">Administrator</span></div></div> <button class="logout-button svelte-mci0h3" title="Sign Out">`);
            Log_out($$renderer, {size: 20});
            $$renderer.push(`<!----></button></div>`);
        } else $$renderer.push("<!--[-1-->");
        $$renderer.push(`<!--]--></aside>`);
	});
}
//#endregion
//#region src/lib/components/dashboard/Header.svelte
function Header($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
        $$renderer.push(`<header class="header svelte-1axdyno"><div class="header-left svelte-1axdyno"><button class="menu-button svelte-1axdyno"${attr("aria-label", uiState.isSidebarOpen ? "Close Menu" : "Open Menu")}>`);
        if (uiState.isSidebarOpen) {
            $$renderer.push("<!--[0-->");
            X($$renderer, {size: 20});
        } else {
            $$renderer.push("<!--[-1-->");
            Menu($$renderer, {size: 20});
        }
        $$renderer.push(`<!--]--></button></div> <div class="header-actions svelte-1axdyno"><button class="theme-toggle svelte-1axdyno" aria-label="Toggle theme mode"${attr("title", `Current: ${stringify(themeState.mode)}`)}>`);
		if (themeState.mode === "system") {
			$$renderer.push("<!--[0-->");
            Monitor($$renderer, {size: 20});
		} else {
			$$renderer.push("<!--[-1-->");
			if (themeState.dark) {
				$$renderer.push("<!--[0-->");
                Sun($$renderer, {size: 20});
			} else {
				$$renderer.push("<!--[-1-->");
                Moon($$renderer, {size: 20});
			}
			$$renderer.push(`<!--]-->`);
		}
        $$renderer.push(`<!--]--></button></div></header>`);
	});
}
//#endregion
//#region src/lib/components/dashboard/LogoutModal.svelte
function LogoutModal($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		getAuthService();
		let isLoggingOut = false;

        function handleCancel() {
            uiState.closeLogoutConfirmation();
        }

        Modal($$renderer, {
            isOpen: uiState.isLogoutConfirmationOpen,
            title: "Sign Out",
            onclose: handleCancel,
            children: ($$renderer) => {
                $$renderer.push(`<div class="logout-modal-content svelte-wvs6b8"><div class="logout-header-custom svelte-wvs6b8"><div class="logout-icon-container svelte-wvs6b8">`);
                Log_out($$renderer, {size: 24});
                $$renderer.push(`<!----></div> <div class="logout-title-area svelte-wvs6b8"><p class="subtitle svelte-wvs6b8">Ready to leave?</p></div></div> <div class="logout-body svelte-wvs6b8"><p class="svelte-wvs6b8">You'll need to sign back in to access your dashboard.</p></div> <div class="logout-actions svelte-wvs6b8"><button class="modal-btn-cancel svelte-wvs6b8"${attr("disabled", isLoggingOut, true)}>Stay</button> <button${attr_class("modal-btn-confirm svelte-wvs6b8", void 0, {"loading": isLoggingOut})}${attr("disabled", isLoggingOut, true)}>`);
                $$renderer.push("<!--[-1-->");
                $$renderer.push(`Sign Out`);
                $$renderer.push(`<!--]--></button></div></div>`);
            },
            $$slots: {default: true}
        });
	});
}
//#endregion
//#region src/routes/dashboard/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children } = $$props;
		if (authState.isAuthenticated) {
			$$renderer.push("<!--[0-->");
            $$renderer.push(`<div${attr_class("dashboard-layout svelte-2agd5u", void 0, {"sidebar-open": uiState.isSidebarOpen})}>`);
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
