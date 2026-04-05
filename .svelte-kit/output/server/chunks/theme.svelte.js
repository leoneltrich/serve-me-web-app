import {d as slot, f as spread_props, u as sanitize_props} from "./server.js";
import {t as Icon} from "./Icon.js";

//#region node_modules/lucide-svelte/dist/icons/monitor.svelte
function Monitor($$renderer, $$props) {
    Icon($$renderer, spread_props([
        {name: "monitor"},
        sanitize_props($$props),
        {
            iconNode: [
                ["rect", {
                    "width": "20",
                    "height": "14",
                    "x": "2",
                    "y": "3",
                    "rx": "2"
                }],
                ["line", {
                    "x1": "8",
                    "x2": "16",
                    "y1": "21",
                    "y2": "21"
                }],
                ["line", {
                    "x1": "12",
                    "x2": "12",
                    "y1": "17",
                    "y2": "21"
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
//#region node_modules/lucide-svelte/dist/icons/moon.svelte
function Moon($$renderer, $$props) {
    Icon($$renderer, spread_props([
        {name: "moon"},
        sanitize_props($$props),
        {
            iconNode: [["path", {"d": "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"}]],
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
//#region node_modules/lucide-svelte/dist/icons/sun.svelte
function Sun($$renderer, $$props) {
    Icon($$renderer, spread_props([
        {name: "sun"},
        sanitize_props($$props),
        {
            iconNode: [
                ["circle", {
                    "cx": "12",
                    "cy": "12",
                    "r": "4"
                }],
                ["path", {"d": "M12 2v2"}],
                ["path", {"d": "M12 20v2"}],
                ["path", {"d": "m4.93 4.93 1.41 1.41"}],
                ["path", {"d": "m17.66 17.66 1.41 1.41"}],
                ["path", {"d": "M2 12h2"}],
                ["path", {"d": "M20 12h2"}],
                ["path", {"d": "m6.34 17.66-1.41 1.41"}],
                ["path", {"d": "m19.07 4.93-1.41 1.41"}]
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
//#region src/lib/services/theme.svelte.ts
var ThemeState = class {
    _themeMode = "system";
    _isDarkMode = false;
	constructor() {
		if (typeof window !== "undefined") {
			const savedMode = localStorage.getItem("theme-mode");
            if (savedMode) this._themeMode = savedMode;
			const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
			this.updateResolvedTheme();
			prefersDark.addEventListener("change", () => {
                if (this._themeMode === "system") this.updateResolvedTheme();
			});
		}
	}
	get dark() {
        return this._isDarkMode;
	}
	get mode() {
        return this._themeMode;
	}
	setMode(mode) {
        this._themeMode = mode;
		localStorage.setItem("theme-mode", mode);
		this.updateResolvedTheme();
	}
	toggle() {
        if (this._themeMode === "system") this.setMode("light");
        else if (this._themeMode === "light") this.setMode("dark");
		else this.setMode("system");
	}
	updateResolvedTheme() {
		if (typeof window === "undefined") return;
        if (this._themeMode === "system") this._isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        else this._isDarkMode = this._themeMode === "dark";
        if (typeof document !== "undefined") if (this._isDarkMode) document.documentElement.classList.add("dark-mode");
		else document.documentElement.classList.remove("dark-mode");
	}
};
var themeState = new ThemeState();
//#endregion
export {Monitor as i, Sun as n, Moon as r, themeState as t};
