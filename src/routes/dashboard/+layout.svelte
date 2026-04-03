<script lang="ts">
  import Sidebar from '$lib/components/dashboard/Sidebar.svelte';
  import Header from '$lib/components/dashboard/Header.svelte';
  import { authState } from '$lib/services/auth/auth.state.svelte';

  let { children } = $props();
</script>

{#if authState.isAuthenticated}
  <div class="dashboard-layout">
    <Sidebar />
    
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

  @media (max-width: 1024px) {
    .main-container {
      margin-left: 0; /* Responsive: Sidebar would become a drawer here */
    }
  }
</style>
