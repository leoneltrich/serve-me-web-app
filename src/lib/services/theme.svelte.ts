export class ThemeState {
  isDarkMode = $state(false);

  constructor() {
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      this.isDarkMode = prefersDark.matches;
      this.updateBody();
    }
  }

  get dark() { return this.isDarkMode; }

  toggle() {
    this.isDarkMode = !this.isDarkMode;
    this.updateBody();
  }

  set(val: boolean) {
    this.isDarkMode = val;
    this.updateBody();
  }

  private updateBody() {
    if (typeof document !== 'undefined') {
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
    }
  }
}

export const themeState = new ThemeState();
