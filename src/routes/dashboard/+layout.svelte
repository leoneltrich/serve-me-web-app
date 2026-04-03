<script lang="ts">
  import Sidebar from '$lib/components/dashboard/Sidebar.svelte';
  import Header from '$lib/components/dashboard/Header.svelte';

  let { children } = $props();
</script>

<div class="dashboard-layout">
  <Sidebar />
  
  <div class="main-container">
    <Header />
    <main class="content">
      {@render children()}
    </main>
  </div>
</div>

<style>
  .dashboard-layout {
    display: flex;
    min-height: 100vh;
    background-color: #f8fafc;
  }

  :global(.dark-mode) .dashboard-layout {
    background-color: #09090b;
  }

  .main-container {
    flex: 1;
    margin-left: 240px; /* Width of Sidebar */
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    padding: 2rem;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }

  @media (max-width: 1024px) {
    .main-container {
      margin-left: 0; /* Responsive: Sidebar would become a drawer here */
    }
  }
</style>
