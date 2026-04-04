<script lang="ts">
  import {uiState} from '$lib/services/ui.svelte';
  import {authState} from '$lib/services/auth/auth.state.svelte';
  import {getAuthService} from '$lib/services/context';
  import {goto} from '$app/navigation';
  import {fade} from 'svelte/transition';
  import {LogOut} from 'lucide-svelte';

  const authService = getAuthService();
  let isLoggingOut = $state(false);

  async function handleLogout() {
    isLoggingOut = true;
    try {
      await authService.logout();
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      authState.setUser(null);
      uiState.closeLogoutConfirmation();
      isLoggingOut = false;
      goto('/login');
    }
  }

  function handleCancel() {
    if (!isLoggingOut) {
      uiState.closeLogoutConfirmation();
    }
  }
</script>

{#if uiState.isLogoutConfirmationOpen}
  <div 
    class="logout-backdrop" 
    onclick={handleCancel} 
    onkeydown={(e) => e.key === 'Escape' && handleCancel()}
    role="button"
    tabindex="0"
    transition:fade={{ duration: 200 }}
  >
    <div 
      class="logout-card" 
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => {
        if (e.key === 'Escape') handleCancel();
        e.stopPropagation();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-title"
      tabindex="-1"
    >
      <div class="logout-header">
        <div class="logout-icon-container">
          <LogOut size={24}/>
        </div>
        <div class="logout-title-area">
          <h2 id="logout-title">Sign Out</h2>
          <p>Ready to leave?</p>
        </div>
      </div>
      
      <div class="logout-content">
        <p>You'll need to sign back in to access your dashboard.</p>
      </div>

      <div class="logout-actions">
        <button 
          class="cancel-btn" 
          onclick={handleCancel} 
          disabled={isLoggingOut}
        >
          Stay
        </button>
        <button 
          class="confirm-btn" 
          onclick={handleLogout} 
          disabled={isLoggingOut}
          class:loading={isLoggingOut}
        >
          {#if isLoggingOut}
            <span class="spinner"></span>
          {:else}
            Sign Out
          {/if}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .logout-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 1.5rem;
    cursor: default;
    animation: fadeIn 0.2s ease-out;
  }

  .logout-card {
    background: var(--card-bg);
    background-color: rgba(255, 255, 255, 0.98);
    border: none;
    border-radius: 24px;
    width: 100%;
    max-width: 360px;
    padding: 1.75rem;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    animation: scaleIn 0.25s cubic-bezier(0.2, 1, 0.3, 1);
  }

  :global(.dark-mode) .logout-card {
    background-color: rgba(24, 24, 27, 0.98);
    border: none;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
  }
  @media (max-width: 640px) {
    .logout-backdrop {
      align-items: flex-end;
      padding: 0;
    }

    .logout-card {
      max-width: 100%;
      border-radius: 24px 24px 0 0;
      border-bottom: none;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 1.5rem 1.5rem 2rem;
      animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
  }

  .logout-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }

  .logout-icon-container {
    width: 44px;
    height: 44px;
    background: var(--brand-bg);
    color: var(--brand-color);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .logout-title-area h2 {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-main);
    margin: 0;
    letter-spacing: -0.01em;
  }

  .logout-title-area p {
    font-size: 0.8125rem;
    color: var(--text-muted);
    margin: 0;
    font-weight: 500;
  }

  .logout-content p {
    font-size: 0.9375rem;
    color: var(--text-muted);
    line-height: 1.5;
    margin: 0 0 1.75rem 0;
  }

  .logout-actions {
    display: flex;
    gap: 0.75rem;
    width: 100%;
  }

  .logout-actions button {
    flex: 1;
    padding: 0.75rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .cancel-btn {
    background: rgba(0, 0, 0, 0.04);
    border: none;
    color: var(--text-main);
  }

  :global(.dark-mode) .cancel-btn {
    background: rgba(255, 255, 255, 0.06);
  }

  .cancel-btn:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.08);
  }

  :global(.dark-mode) .cancel-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
  }

  .confirm-btn {
    background: #0f172a;
    border: none;
    color: white;
  }

  :global(.dark-mode) .confirm-btn {
    background: #f8fafc;
    color: #0f172a;
  }

  .confirm-btn:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .confirm-btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .confirm-btn:disabled, .cancel-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  :global(.dark-mode) .spinner {
    border-color: rgba(0, 0, 0, 0.1);
    border-top-color: #0f172a;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
</style>
