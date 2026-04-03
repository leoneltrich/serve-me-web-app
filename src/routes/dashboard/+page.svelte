<script lang="ts">
  import { authState } from '$lib/services/auth/auth.state.svelte';
  import { getAuthService } from '$lib/services/context';
  import { goto } from '$app/navigation';

  const authService = getAuthService();

  async function handleLogout() {
    await authService.logout();
    authState.setUser(null);
    goto('/login');
  }
</script>

<div class="dashboard-page">
  <main class="dashboard-content">
    <h1>Dashboard</h1>
    <p>Welcome back, <strong>{authState.user?.username}</strong>!</p>
    
    <button onclick={handleLogout} class="logout-btn">
      Sign Out
    </button>
  </main>
</div>

<style>
  .dashboard-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: 'Poppins', sans-serif;
    background-color: #f3f4f6;
  }

  :global(.dark-mode) .dashboard-page {
    background-color: #09090b;
    color: white;
  }

  .dashboard-content {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    text-align: center;
  }

  :global(.dark-mode) .dashboard-content {
    background: #18181b;
    border: 1px solid #27272a;
  }

  .logout-btn {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
</style>
