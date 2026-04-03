<script lang="ts">
  let { title, value, icon, colorClass = 'users', loading = false } = $props();

  let cardRef: HTMLDivElement;
  let mouseX = $state(0);
  let mouseY = $state(0);
  let opacity = $state(0);

  function handleMouseMove(e: MouseEvent) {
    if (!cardRef) return;
    const rect = cardRef.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    opacity = 1;
  }

  function handleMouseLeave() {
    opacity = 0;
  }
</script>

<div 
  bind:this={cardRef}
  class="stat-card" 
  onmousemove={handleMouseMove} 
  onmouseleave={handleMouseLeave}
  role="presentation"
>
  <!-- Ripple/Spotlight Effect -->
  <div 
    class="ripple-effect" 
    style="
      background: radial-gradient(600px circle at {mouseX}px {mouseY}px, rgba(255,255,255,0.06), transparent 40%);
      opacity: {opacity};
    "
  ></div>

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
    background: var(--card-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 1.5rem;
    border-radius: 16px;
    border: 1px solid var(--card-border);
    display: flex;
    align-items: center;
    gap: 1.25rem;
    box-shadow: var(--card-shadow);
    position: relative;
    overflow: hidden;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }

  /* No translation or border change on hover for a cleaner feel */
  .stat-card:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  :global(.dark-mode) .stat-card:hover {
    background: rgba(24, 24, 27, 0.75);
    border-color: rgba(255, 255, 255, 0.12);
  }

  .ripple-effect {
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: opacity 0.5s ease;
    z-index: 1;
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
  }

  .stat-icon.users { background: var(--brand-bg); color: var(--brand-color); }
  .stat-icon.servers { background: rgba(16, 185, 129, 0.1); color: #10b981; }
  .stat-icon.system { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
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
