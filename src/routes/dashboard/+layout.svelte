<script lang="ts">
  import Sidebar from '$lib/components/dashboard/Sidebar.svelte';
  import Header from '$lib/components/dashboard/Header.svelte';
  import { authState } from '$lib/services/auth/auth.state.svelte';
  import { uiState } from '$lib/services/ui.svelte';

  let { children } = $props();
</script>

{#if authState.isAuthenticated}
  <div class="dashboard-layout">
    <Sidebar />
    
    {#if uiState.isSidebarOpen}
      <button class="sidebar-overlay" onclick={() => uiState.closeSidebar()} aria-label="Close sidebar"></button>
    {/if}

    <div class="main-container">
      <Header />
      <main class="content">
        {@render children()}
      </main>
    </div>
  </div>
{/if}

<style>
  .dashboard-layout {
    display: flex;
    min-height: 100vh;
    background-color: transparent;
    position: relative;
    z-index: 1;
  }

  .main-container {
    flex: 1;
    margin-left: 240px; /* Width of Sidebar */
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    transition: margin-left 0.3s ease;
  }

  .content {
    flex: 1;
    padding: 2rem;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
    z-index: 2;
  }

  .sidebar-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    z-index: 250; /* Between header (150) and sidebar (300) is wrong, sidebar is 300, overlay should be 299 */
    border: none;
    cursor: default;
    display: none;
  }

  @media (max-width: 1024px) {
    .main-container {
      margin-left: 0;
    }

    .sidebar-overlay {
      display: block;
    }

    .content {
      padding: 1.5rem;
    }
  }

  @media (max-width: 640px) {
    .content {
      padding: 1rem;
    }
  }
</style>
