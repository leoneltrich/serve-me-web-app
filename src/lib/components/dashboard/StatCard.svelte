<script lang="ts">
  let { title, value, icon, colorClass = 'users' } = $props();

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
    <p class="stat-number">{value}</p>
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
</style>
