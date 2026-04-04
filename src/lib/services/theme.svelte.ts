export type ThemeMode = 'system' | 'light' | 'dark';

export class ThemeState {
    private _themeMode = $state<ThemeMode>('system');
    private _isDarkMode = $state(false);

  constructor() {
    if (typeof window !== 'undefined') {
      // Load saved mode
      const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
      if (savedMode) {
          this._themeMode = savedMode;
      }

      // Initialize system listener
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Set initial state
      this.updateResolvedTheme();

      // Listen for system changes
      prefersDark.addEventListener('change', () => {
          if (this._themeMode === 'system') {
          this.updateResolvedTheme();
        }
      });
    }
  }

    get dark() {
        return this._isDarkMode;
    }

    get mode() {
        return this._themeMode;
    }

  setMode(mode: ThemeMode) {
      this._themeMode = mode;
    localStorage.setItem('theme-mode', mode);
    this.updateResolvedTheme();
  }

  toggle() {
    // Cycle: system -> light -> dark -> system
      if (this._themeMode === 'system') {
      this.setMode('light');
      } else if (this._themeMode === 'light') {
      this.setMode('dark');
    } else {
      this.setMode('system');
    }
  }

  private updateResolvedTheme() {
    if (typeof window === 'undefined') return;

      if (this._themeMode === 'system') {
          this._isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
          this._isDarkMode = this._themeMode === 'dark';
    }

    if (typeof document !== 'undefined') {
        if (this._isDarkMode) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
    }
  }
}

export const themeState = new ThemeState();
