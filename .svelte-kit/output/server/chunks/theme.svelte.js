import "./server.js";
//#region src/lib/services/theme.svelte.ts
var ThemeState = class {
	themeMode = "system";
	isDarkMode = false;
	constructor() {
		if (typeof window !== "undefined") {
			const savedMode = localStorage.getItem("theme-mode");
			if (savedMode) this.themeMode = savedMode;
			const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
			this.updateResolvedTheme();
			prefersDark.addEventListener("change", () => {
				if (this.themeMode === "system") this.updateResolvedTheme();
			});
		}
	}
	get dark() {
		return this.isDarkMode;
	}
	get mode() {
		return this.themeMode;
	}
	setMode(mode) {
		this.themeMode = mode;
		localStorage.setItem("theme-mode", mode);
		this.updateResolvedTheme();
	}
	toggle() {
		if (this.themeMode === "system") this.setMode("light");
		else if (this.themeMode === "light") this.setMode("dark");
		else this.setMode("system");
	}
	updateResolvedTheme() {
		if (typeof window === "undefined") return;
		if (this.themeMode === "system") this.isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
		else this.isDarkMode = this.themeMode === "dark";
		if (typeof document !== "undefined") if (this.isDarkMode) document.documentElement.classList.add("dark-mode");
		else document.documentElement.classList.remove("dark-mode");
	}
};
var themeState = new ThemeState();
//#endregion
export { themeState as t };
