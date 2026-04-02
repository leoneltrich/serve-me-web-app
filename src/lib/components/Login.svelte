<script lang="ts">
  import { onMount } from 'svelte';

  let isDarkMode = $state(false);
  let mouseX = $state(0);
  let mouseY = $state(0);

  function handleMouseMove(e: MouseEvent) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  onMount(() => {
    // Check initial OS preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial state
    isDarkMode = prefersDark.matches;
    updateTheme(isDarkMode);

    // Listen for OS preference changes
    const handler = (e: MediaQueryListEvent) => {
      isDarkMode = e.matches;
      updateTheme(isDarkMode);
    };
    
    prefersDark.addEventListener('change', handler);
    return () => prefersDark.removeEventListener('change', handler);
  });

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    updateTheme(isDarkMode);
  }

  function updateTheme(dark: boolean) {
    if (dark) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }
</script>

<svelte:window onmousemove={handleMouseMove} />

<div class="login-wrapper">
  <!-- Interactive Mouse Glow -->
  <div class="mouse-glow" style="--mouse-x: {mouseX}px; --mouse-y: {mouseY}px;"></div>

  <!-- Ambient background orbs for depth -->
  <div class="ambient-orb orb-1"></div>
  <div class="ambient-orb orb-2"></div>
  <div class="ambient-texture"></div>

  <!-- Theme Toggle Button -->
  <button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle dark mode">
    {#if isDarkMode}
      <!-- Sun Icon for Light Mode -->
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    {:else}
      <!-- Moon Icon for Dark Mode -->
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    {/if}
  </button>

  <main class="login-card">
    <div class="card-highlight"></div>
    <header class="login-header">
      <div class="brand-mark">
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      </div>
      <h1 class="login-title">Welcome back</h1>
      <p class="login-subtitle">Sign in to your ServeMe workspace.</p>
    </header>

    <form class="login-form" onsubmit={(e) => e.preventDefault()}>
      <div class="form-group">
        <label class="form-label" for="username">Username</label>
        <div class="input-wrapper">
          <span class="input-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
          <input 
            class="form-input" 
            type="text" 
            id="username" 
            autocomplete="username" 
            placeholder="e.g. admin_user" 
            required 
          />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="password">Password</label>
        <div class="input-wrapper">
          <span class="input-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </span>
          <input 
            class="form-input" 
            type="password" 
            id="password" 
            autocomplete="current-password"
            placeholder="••••••••" 
            required 
          />
        </div>
      </div>

      <button type="submit" class="submit-button">
        <span>Sign In</span>
        <svg class="btn-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </form>
  </main>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  /* CSS Variables for Theming */
  :global(:root) {
    --bg-base: #f8fafc;
    --bg-orb-1: rgba(59, 130, 246, 0.15); /* Soft blue */
    --bg-orb-2: rgba(147, 51, 234, 0.1);  /* Soft purple */
    --mouse-glow: rgba(59, 130, 246, 0.05); /* Extremely subtle soft blue glow */
    --card-bg: rgba(255, 255, 255, 0.85);
    --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.05);
    --text-main: #0f172a;
    --text-muted: #64748b;
    --input-bg: #ffffff;
    --input-border: #e2e8f0;
    --input-border-focus: #3b82f6;
    --input-text: #1e293b;
    --input-icon: #94a3b8;
    --primary-gradient: linear-gradient(135deg, #2563eb, #3b82f6);
    --primary-hover: linear-gradient(135deg, #1d4ed8, #2563eb);
    --primary-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
    --brand-bg: #eff6ff;
    --brand-color: #2563eb;
    --toggle-bg: #ffffff;
    --toggle-border: #e2e8f0;
  }

  :global(:root.dark-mode) {
    --bg-base: #09090b; /* Very dark rich background */
    --bg-orb-1: rgba(56, 189, 248, 0.08); /* Dark mode blue glow */
    --bg-orb-2: rgba(168, 85, 247, 0.06); /* Dark mode purple glow */
    --mouse-glow: rgba(56, 189, 248, 0.05); /* Extremely subtle dark mode blue glow */
    --card-bg: rgba(24, 24, 27, 0.65);
    --card-border: rgba(255, 255, 255, 0.08);
    --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 20px 25px -5px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --input-bg: rgba(9, 9, 11, 0.5);
    --input-border: #27272a;
    --input-border-focus: #38bdf8;
    --input-text: #f1f5f9;
    --input-icon: #52525b;
    --primary-gradient: linear-gradient(135deg, #0ea5e9, #38bdf8);
    --primary-hover: linear-gradient(135deg, #0284c7, #0ea5e9);
    --primary-shadow: 0 4px 14px rgba(56, 189, 248, 0.2);
    --brand-bg: rgba(56, 189, 248, 0.1);
    --brand-color: #38bdf8;
    --toggle-bg: #18181b;
    --toggle-border: #27272a;
  }

  :global(body) {
    background-color: var(--bg-base);
    color: var(--text-main);
    margin: 0;
    padding: 0;
    font-family: 'Poppins', system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.4s ease, color 0.4s ease;
    overflow-x: hidden;
  }

  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
    padding: 1rem;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
  }

  /* --- Depth & Texture Elements --- */
  .mouse-glow {
    position: fixed;
    top: 0;
    left: 0;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
    background: radial-gradient(
      circle,
      var(--mouse-glow) 0%,
      transparent 80%
    );
    transform: translate(calc(var(--mouse-x, 0px) - 50%), calc(var(--mouse-y, 0px) - 50%));
    transition: transform 2s cubic-bezier(0.05, 0.9, 0.1, 1);
    opacity: 0.2;
  }
  .ambient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    z-index: -2;
    pointer-events: none;
    transition: background-color 0.6s ease;
  }

  .orb-1 {
    top: 10%;
    left: 20%;
    width: 40vw;
    height: 40vw;
    background: var(--bg-orb-1);
    animation: float 20s ease-in-out infinite alternate;
  }

  .orb-2 {
    bottom: 10%;
    right: 15%;
    width: 35vw;
    height: 35vw;
    background: var(--bg-orb-2);
    animation: float 25s ease-in-out infinite alternate-reverse;
  }

  .ambient-texture {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E");
    z-index: -1;
    pointer-events: none;
    mix-blend-mode: overlay;
  }

  @keyframes float {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(30px, 50px) scale(1.1); }
  }
  /* -------------------------------- */

  .theme-toggle {
    position: absolute;
    top: 1.5rem;
    right: 2rem;
    background: var(--toggle-bg);
    color: var(--text-main);
    border: 1px solid var(--toggle-border);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    z-index: 10;
  }

  .theme-toggle:hover {
    transform: scale(1.08) rotate(5deg);
    border-color: var(--brand-color);
    color: var(--brand-color);
  }

  .login-card {
    position: relative;
    background: var(--card-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    width: 100%;
    max-width: 450px;
    padding: 2rem 1.8rem;
    border-radius: 16px;
    border: 1px solid var(--card-border);
    box-shadow: var(--card-shadow);
    box-sizing: border-box;
    transition: all 0.4s ease;
    overflow: hidden;
  }

  /* Subtle top highlight on the card to simulate light hitting the edge */
  .card-highlight {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    z-index: 2;
    opacity: 0.5;
  }
  :global(:root.dark-mode) .card-highlight {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  }

  .login-header {
    text-align: center;
    margin-bottom: 2.5rem;
    position: relative;
    z-index: 2;
  }

  .brand-mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    background: var(--brand-bg);
    color: var(--brand-color);
    border-radius: 16px;
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
    box-shadow: inset 0 2px 4px rgba(255,255,255,0.1);
  }

  .login-title {
    font-size: 1.75rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--text-main);
    margin: 0 0 0.5rem 0;
    transition: color 0.3s ease;
  }

  .login-subtitle {
    font-size: 0.9375rem;
    color: var(--text-muted);
    margin: 0;
    transition: color 0.3s ease;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    position: relative;
    z-index: 2;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .form-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-main);
    transition: color 0.3s ease;
    padding-left: 0.25rem;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-icon {
    position: absolute;
    left: 1rem;
    color: var(--input-icon);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s ease;
    pointer-events: none;
  }

  .form-input {
    width: 100%;
    padding: 0.875rem 1rem 0.875rem 2.75rem;
    font-family: inherit;
    font-size: 0.9375rem;
    color: var(--input-text);
    background-color: var(--input-bg);
    border: 1px solid var(--input-border);
    border-radius: 12px;
    outline: none;
    transition: all 0.2s ease;
    box-sizing: border-box;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
  }

  .form-input::placeholder {
    color: var(--text-muted);
    opacity: 0.6;
  }

  .form-input:focus {
    border-color: var(--input-border-focus);
    background-color: transparent;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1), inset 0 2px 4px rgba(0,0,0,0.02);
  }

  :global(:root.dark-mode) .form-input:focus {
    box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1), inset 0 2px 4px rgba(0,0,0,0.2);
  }

  .input-wrapper:focus-within .input-icon {
    color: var(--brand-color);
  }

  .submit-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.75rem;
    margin-top: 0.5rem;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    color: #ffffff;
    background: var(--primary-gradient);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: var(--primary-shadow);
  }

  .submit-button:hover {
    background: var(--primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
  }
  
  :global(:root.dark-mode) .submit-button:hover {
    box-shadow: 0 6px 20px rgba(56, 189, 248, 0.25);
  }

  .submit-button:active {
    transform: translateY(0);
    box-shadow: var(--primary-shadow);
  }

  .btn-icon {
    transition: transform 0.3s ease;
  }

  .submit-button:hover .btn-icon {
    transform: translateX(3px);
  }
</style>