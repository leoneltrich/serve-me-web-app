<script lang="ts">
    import { onMount } from 'svelte';
    import { getAuthService } from '$lib/services/context';
    import { authState } from '$lib/services/auth/auth.state.svelte';
    import { themeState } from '$lib/services/theme.svelte.ts';

    // 1. Inject the service
    const authService = getAuthService();

    // 2. State (Svelte 5 Runes)
    let username = $state('');
    let password = $state('');
    let isLoading = $state(false);
    let errorMessage = $state<string | null>(null);

    async function handleLogin(e: Event) {
        e.preventDefault();
        isLoading = true;
        errorMessage = null;

        try {
            const user = await authService.login(username, password);
            authState.setUser(user);
            // The $effect in +layout.svelte will handle the redirect automatically
        } catch (err) {
            errorMessage = err instanceof Error ? err.message : 'Invalid credentials';
        } finally {
            isLoading = false;
        }
    }

    function toggleTheme() {
        themeState.toggle();
    }
</script>

<div class="login-wrapper">
    <!-- Theme Toggle Button -->
    <button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle dark mode">
        {#if themeState.isDarkMode}
            <!-- Sun Icon for Light Mode -->
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"
                 stroke-linecap="round" stroke-linejoin="round">
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
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"
                 stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        {/if}
    </button>

    <main class="login-card">
        <div class="card-highlight"></div>
        <header class="login-header">
            <div class="brand-mark">
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2.5" fill="none"
                     stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
            </div>
            <h1 class="login-title">Welcome back</h1>
            <p class="login-subtitle">Sign in to your ServeMe account.</p>
        </header>

        <form class="login-form" onsubmit={handleLogin}>
            {#if errorMessage}
                <div class="error-banner">
                    {errorMessage}
                </div>
            {/if}

            <div class="form-group">
                <div class="input-wrapper">
          <span class="input-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
                    <input
                            class="form-input"
                            type="text"
                            id="username"
                            autocomplete="username"
                            placeholder="username"
                            required
                            bind:value={username}
                            disabled={isLoading}
                    />
                </div>
            </div>

            <div class="form-group">
                <div class="input-wrapper">
          <span class="input-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"
                 stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </span>
                    <input
                            class="form-input"
                            type="password"
                            id="password"
                            autocomplete="current-password"
                            placeholder="password"
                            required
                            bind:value={password}
                            disabled={isLoading}
                    />
                </div>
            </div>

            <button type="submit" class="submit-button" disabled={isLoading}>
                <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
                {#if !isLoading}
                    <svg class="btn-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2"
                         fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                {/if}
            </button>
        </form>
    </main>
</div>

<style>
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

    .card-highlight {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        z-index: 2;
        opacity: 0.5;
    }

    :global(:root.dark-mode) .card-highlight {
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
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
        box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.1);
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

    .error-banner {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.2);
        color: #ef4444;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        font-size: 0.8125rem;
        text-align: center;
    }

    :global(.dark-mode) .error-banner {
        background: rgba(248, 113, 113, 0.1);
        border-color: rgba(248, 113, 113, 0.2);
        color: #f87171;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
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
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
    }

    .form-input::placeholder {
        color: var(--text-muted);
        opacity: 0.6;
    }

    .form-input:focus {
        border-color: var(--input-border-focus);
        background-color: transparent;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1), inset 0 2px 4px rgba(0, 0, 0, 0.02);
    }

    :global(:root.dark-mode) .form-input:focus {
        box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1), inset 0 2px 4px rgba(0, 0, 0, 0.2);
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

    @media (max-width: 640px) {
      .login-card {
        padding: 2rem 1.5rem;
        border-radius: 0;
        max-width: 100%;
        background: transparent;
        border: none;
        box-shadow: none;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
      }
      .card-highlight {
        display: none;
      }
      .login-title {
        font-size: 1.375rem;
      }
      .form-input {
        font-size: 1rem;
      }
      .theme-toggle {
        top: 1rem;
        right: 1rem;
        width: 36px;
        height: 36px;
      }
    }
</style>