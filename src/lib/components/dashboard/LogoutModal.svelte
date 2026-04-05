<script lang="ts">
  import {uiState} from '$lib/services/ui.svelte';
  import {authState} from '$lib/services/auth/auth.state.svelte';
  import {getAuthService} from '$lib/services/context';
  import {goto} from '$app/navigation';
  import Modal from './Modal.svelte';
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
      await goto('/login');
    }
  }

  function handleCancel() {
    if (!isLoggingOut) {
      uiState.closeLogoutConfirmation();
    }
  }
</script>

<Modal
        isOpen={uiState.isLogoutConfirmationOpen}
        title="Sign Out"
        onclose={handleCancel}
>
  <div class="logout-modal-content">
    <div class="logout-header-custom">
      <div class="logout-icon-container">
        <LogOut size={24}/>
      </div>
      <div class="logout-title-area">
        <p class="subtitle">Ready to leave?</p>
      </div>
    </div>

    <div class="logout-body">
      <p>You'll need to sign back in to access your dashboard.</p>
    </div>

    <div class="logout-actions">
      <button
              class="modal-btn-cancel"
              onclick={handleCancel}
              disabled={isLoggingOut}
      >
        Stay
      </button>
      <button
              class="primary-button logout-btn"
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
</Modal>

<style>
  .logout-modal-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .logout-header-custom {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
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

  .logout-title-area .subtitle {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin: 0;
    font-weight: 500;
  }

  .logout-body p {
    font-size: 0.9375rem;
    color: var(--text-muted);
    line-height: 1.5;
    margin: 0;
  }

  .logout-actions {
    display: flex;
    gap: 0.75rem;
    width: 100%;
  }

  .logout-actions button {
    flex: 1;
    padding: 0.75rem 1.5rem;
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

  @media (max-width: 480px) {
    .logout-actions {
      flex-direction: column-reverse;
    }
  }
</style>
