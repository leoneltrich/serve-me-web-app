<script lang="ts">
    import type {Snippet} from 'svelte';
    import {X} from 'lucide-svelte';

    let {title, children, onclose, isOpen = true} = $props<{
        title: string;
        children: Snippet;
        onclose: () => void;
        isOpen?: boolean;
    }>();

</script>

{#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div class="modal-backdrop" onclick={onclose} role="presentation">
      <div class="modal-container" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
          <header class="modal-header">
              <h2>{title}</h2>
              <button class="close-button" onclick={onclose} aria-label="Close modal">
                  <X size={20}/>
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
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
      box-sizing: border-box;
      animation: fadeIn 0.2s ease-out;
  }

  .modal-container {
    background: var(--card-bg);
      /* Make modal slightly more opaque than standard cards for better contrast */
      background-color: rgba(255, 255, 255, 0.98);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 20px;
    width: 100%;
    max-width: 500px;
      box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.45);
      display: flex;
      flex-direction: column;
    overflow: hidden;
      animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  :global(.dark-mode) .modal-container {
      background-color: rgba(24, 24, 27, 0.95);
      border-color: rgba(255, 255, 255, 0.15);
      box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.7);
  }

  @media (max-width: 640px) {
      .modal-backdrop {
          align-items: flex-end;
          padding: 0;
      }

      .modal-container {
          max-width: 100%;
          border-radius: 24px 24px 0 0;
          border-bottom: none;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          animation: slideUpMobile 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }
  }

  .modal-header {
      padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--card-border);
  }

  @media (max-width: 640px) {
      .modal-header {
          padding: 1.25rem 1.5rem;
      }
  }

  .modal-header h2 {
    margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
    color: var(--text-main);
      letter-spacing: -0.01em;
  }

  .close-button {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
      padding: 0.5rem;
      border-radius: 10px;
    transition: all 0.2s;
    display: flex;
      align-items: center;
      justify-content: center;
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
      max-height: 80vh;
    overflow-y: auto;
  }

  @keyframes fadeIn {
      from {
          opacity: 0;
      }
      to {
          opacity: 1;
      }
  }

  @keyframes slideUp {
      from {
          transform: translateY(20px);
          opacity: 0;
      }
      to {
          transform: translateY(0);
          opacity: 1;
      }
  }

  @keyframes slideUpMobile {
      from {
          transform: translateY(100%);
      }
      to {
          transform: translateY(0);
      }
  }
</style>
