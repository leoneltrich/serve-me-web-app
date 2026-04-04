<script lang="ts">
  let { title, value, icon, colorClass = 'users', loading = false } = $props();

  let cardRef: HTMLDivElement;
  let mouseX = $state(0);
  let mouseY = $state(0);
  let opacity = $state(0);
</script>

<div 
  bind:this={cardRef}
  class="glass-card stat-card" 
  role="presentation"
>
  <div class="stat-icon {colorClass}">
    {@render icon()}
  </div>
  <div class="stat-info">
    <h3>{title}</h3>
    {#if loading}
      <div class="value-spinner"></div>
    {:else}
      <p class="stat-number">{value}</p>
    {/if}
  </div>
</div>

<style>
  .stat-card {
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  @media (max-width: 640px) {
    .stat-card {
      padding: 0.75rem 1rem;
      gap: 0.75rem;
      border-radius: 12px;
    }
  }

  .stat-icon {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    .stat-icon {
      width: 36px;
      height: 36px;
      border-radius: 9px;
    }

    :global(.stat-icon svg) {
      width: 18px;
      height: 18px;
    }
  }

  .stat-icon.users { background: var(--brand-bg); color: var(--brand-color); }
  .stat-icon.servers { background: rgba(16, 185, 129, 0.1); color: #10b981; }

  .stat-icon.system {
    background: var(--brand-bg);
    color: var(--brand-color);
  }
  .stat-icon.health-up { background: rgba(16, 185, 129, 0.1); color: #10b981; }
  .stat-icon.health-down { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
  .stat-icon.health-degraded { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
  .stat-icon.health-starting { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
  .stat-icon.health-unknown { background: rgba(156, 163, 175, 0.1); color: #9ca3af; }

  .stat-info {
    position: relative;
    z-index: 2;
  }

  .stat-info h3 {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-muted);
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .stat-number {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0.25rem 0 0;
    color: var(--text-main);
    letter-spacing: -0.01em;
  }

  @media (max-width: 640px) {
    .stat-info h3 {
      font-size: 0.65rem;
    }

    .stat-number {
      font-size: 1.125rem;
      margin-top: 0.125rem;
    }
  }

  .value-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-top-color: var(--brand-color);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0.5rem 0 0.25rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
