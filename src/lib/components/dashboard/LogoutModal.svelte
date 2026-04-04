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
    transition:fade={{ duration: 250 }}
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
        <div class="logout-icon-wrapper">
          <div class="logout-icon-glow"></div>
          <div class="logout-icon-container">
            <LogOut size={32}/>
          </div>
        </div>
      </div>
      
      <div class="logout-content">
        <h2 id="logout-title">Sign Out</h2>
        <p>Are you sure you want to end your session? You will be redirected to the login page.</p>
      </div>

      <div class="logout-actions">
        <button 
          class="cancel-btn" 
          onclick={handleCancel} 
          disabled={isLoggingOut}
        >
          Cancel
        </button>
        <button 
          class="confirm-btn" 
          onclick={handleLogout} 
          disabled={isLoggingOut}
          class:loading={isLoggingOut}
        >
          {#if isLoggingOut}
            <span class="spinner"></span>
            Signing Out...
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
      background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 1.5rem;
    cursor: default;
      animation: fadeIn 0.25s ease-out;
  }

  .logout-card {
    background: var(--card-bg);
      background-color: rgba(255, 255, 255, 0.98);
      border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 28px;
    width: 100%;
    max-width: 420px;
    padding: 3rem 2.5rem 2.5rem;
      box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.45);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    overflow: hidden;
      animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  :global(.dark-mode) .logout-card {
      background-color: rgba(24, 24, 27, 0.95);
      border-color: rgba(255, 255, 255, 0.15);
      box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.7);
  }

  @media (max-width: 640px) {
      .logout-backdrop {
          align-items: flex-end;
          padding: 0;
      }

      .logout-card {
          max-width: 100%;
          border-radius: 28px 28px 0 0;
          border-bottom: none;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2.5rem 1.5rem 2rem;
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }
  }

  .logout-header {
    margin-bottom: 2rem;
  }

  .logout-icon-wrapper {
    position: relative;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logout-icon-glow {
    position: absolute;
    inset: 0;
    background: #ef4444;
    filter: blur(25px);
    opacity: 0.2;
    border-radius: 50%;
  }

  .logout-icon-container {
    position: relative;
    width: 64px;
    height: 64px;
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 0 0 1px rgba(239, 68, 68, 0.2);
  }

  .logout-content h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-main);
    margin: 0 0 1rem 0;
    letter-spacing: -0.02em;
  }

  .logout-content p {
    font-size: 1rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0;
    max-width: 300px;
  }

  .logout-actions {
    display: flex;
    gap: 1rem;
    width: 100%;
    margin-top: 2.5rem;
  }

  .logout-actions button {
    flex: 1;
    padding: 1rem;
    border-radius: 14px;
    font-size: 0.9375rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .cancel-btn {
    background: rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.05);
    color: var(--text-main);
  }

  :global(.dark-mode) .cancel-btn {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.05);
  }

  .cancel-btn:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }

  :global(.dark-mode) .cancel-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.08);
  }

  .confirm-btn {
    background: #ef4444;
    border: none;
    color: white;
    box-shadow: 0 8px 20px -6px rgba(239, 68, 68, 0.4);
  }

  .confirm-btn:hover:not(:disabled) {
    background: #dc2626;
    transform: translateY(-2px);
    box-shadow: 0 12px 25px -6px rgba(239, 68, 68, 0.5);
  }

  .confirm-btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .confirm-btn:disabled, .cancel-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 2.5px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
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
          transform: scale(0.9);
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

  @media (max-width: 480px) {
    .logout-actions {
      flex-direction: column-reverse;
      gap: 0.75rem;
    }
    
    .confirm-btn {
      width: 100%;
    }

    .cancel-btn {
      width: 100%;
    }
  }
</style>
