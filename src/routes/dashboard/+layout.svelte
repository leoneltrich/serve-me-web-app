<script lang="ts">
    import Sidebar from '$lib/components/dashboard/Sidebar.svelte';
    import Header from '$lib/components/dashboard/Header.svelte';
    import LogoutModal from '$lib/components/dashboard/LogoutModal.svelte';
    import {authState} from '$lib/services/auth/auth.state.svelte';
    import {uiState} from '$lib/services/ui.svelte';

    let { children } = $props();
</script>

{#if authState.isAuthenticated}
    <div class="dashboard-layout" class:sidebar-open={uiState.isSidebarOpen}>
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

    <LogoutModal />
  </div>
{/if}

<style>
    :root {
        --sidebar-width: 240px;
    }

  .dashboard-layout {
    display: flex;
    min-height: 100vh;
    background-color: transparent;
    position: relative;
    z-index: 1;
  }

  .main-container {
    flex: 1;
      margin-left: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
      transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

    .sidebar-open .main-container {
        margin-left: var(--sidebar-width);
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
      -webkit-backdrop-filter: blur(4px);
      z-index: 290;
    border: none;
    cursor: default;
    display: none;
      animation: fadeIn 0.3s ease;
  }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
  }

  @media (max-width: 1024px) {
      .sidebar-open .main-container {
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
