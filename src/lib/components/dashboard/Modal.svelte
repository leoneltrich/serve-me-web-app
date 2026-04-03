<script lang="ts">
  let { isOpen, title, onclose, children } = $props();

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && isOpen) {
      onclose();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown}/>

{#if isOpen}
  <div class="modal-backdrop" onclick={onclose} role="presentation">
    <div class="modal-container" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
      <header class="modal-header">
        <h2>{title}</h2>
        <button class="close-button" onclick={onclose} aria-label="Close modal">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </header>
      <main class="modal-content">
        {@render children()}
      </main>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }

  @media (max-width: 640px) {
    .modal-backdrop {
      padding: 0;
      align-items: flex-end;
    }
  }

  .modal-container {
    background: var(--card-bg);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    width: 100%;
    max-width: 500px;
    border-radius: 16px;
    border: 1px solid var(--card-border);
    box-shadow: var(--card-shadow);
    overflow: hidden;
    animation: modal-appear 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @media (max-width: 640px) {
    .modal-container {
      border-radius: 20px 20px 0 0;
      max-width: 100%;
      animation: modal-slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }

  @keyframes modal-appear {
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  @keyframes modal-slide-up {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

  .modal-header {
    padding: 1.25rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--card-border);
  }

  @media (max-width: 640px) {
    .modal-header {
      padding: 1rem 1.25rem;
    }

    .modal-content {
      padding: 1.25rem !important;
    }
  }

  .modal-header h2 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
    color: var(--text-main);
  }

  .close-button {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 6px;
    transition: all 0.2s;
    display: flex;
  }

  .close-button:hover {
    background: rgba(0, 0, 0, 0.05);
    color: var(--text-main);
  }

  :global(.dark-mode) .close-button:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .modal-content {
    padding: 1.5rem;
    max-height: 85vh;
    overflow-y: auto;
  }
</style>
