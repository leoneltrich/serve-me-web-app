<script lang="ts">
    import {fade} from 'svelte/transition';
    import {AlertTriangle} from 'lucide-svelte';

    let {
        isOpen,
        title,
        message,
        confirmLabel = 'Confirm',
        cancelLabel = 'Cancel',
        isDanger = false,
        isLoading = false,
        onconfirm,
        onclose
    } = $props<{
        isOpen: boolean;
        title: string;
        message: string;
        confirmLabel?: string;
        cancelLabel?: string;
        isDanger?: boolean;
        isLoading?: boolean;
        onconfirm: () => void;
        onclose: () => void;
    }>();

    function handleCancel() {
        if (!isLoading) {
            onclose();
        }
    }
</script>

{#if isOpen}
    <div
            class="confirm-backdrop"
            onclick={handleCancel}
            onkeydown={(e) => e.key === 'Escape' && handleCancel()}
            role="button"
            tabindex="0"
            transition:fade={{ duration: 200 }}
    >
        <div
                class="confirm-card"
                onclick={(e) => e.stopPropagation()}
                onkeydown={(e) => {
        if (e.key === 'Escape') handleCancel();
        e.stopPropagation();
      }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-title"
                tabindex="-1"
        >
            <div class="confirm-header">
                <div class="confirm-icon-container" class:danger={isDanger}>
                    <AlertTriangle size={24}/>
                </div>
                <div class="confirm-title-area">
                    <h2 id="confirm-title">{title}</h2>
                    <p>{message}</p>
                </div>
            </div>

            <div class="confirm-actions">
                <button
                        class="modal-btn-cancel"
                        onclick={handleCancel}
                        disabled={isLoading}
                >
                    {cancelLabel}
                </button>
                <button
                        class="modal-btn-confirm"
                        class:btn-danger={isDanger}
                        onclick={onconfirm}
                        disabled={isLoading}
                >
                    {#if isLoading}
                        <span class="spinner"></span>
                    {:else}
                        {confirmLabel}
                    {/if}
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    .confirm-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2100;
        padding: 1.5rem;
        cursor: default;
        animation: fadeIn 0.2s ease-out;
    }

    .confirm-card {
        background: var(--card-bg);
        background-color: rgba(255, 255, 255, 0.98);
        border: none;
        border-radius: 24px;
        width: 100%;
        max-width: 400px;
        padding: 1.75rem;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
        animation: scaleIn 0.25s cubic-bezier(0.2, 1, 0.3, 1);
    }

    :global(.dark-mode) .confirm-card {
        background-color: rgba(24, 24, 27, 0.98);
        border: none;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
    }

    @media (max-width: 640px) {
        .confirm-backdrop {
            align-items: flex-end;
            padding: 0;
        }

        .confirm-card {
            max-width: 100%;
            border-radius: 24px 24px 0 0;
            border-bottom: none;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1.5rem 1.5rem 2rem;
            animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
    }

    .confirm-header {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1.75rem;
    }

    .confirm-icon-container {
        width: 44px;
        height: 44px;
        background: var(--brand-bg);
        color: var(--brand-color);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .confirm-icon-container.danger {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
    }

    .confirm-title-area h2 {
        font-size: 1.125rem;
        font-weight: 700;
        color: var(--text-main);
        margin: 0 0 0.25rem 0;
        letter-spacing: -0.01em;
    }

    .confirm-title-area p {
        font-size: 0.9375rem;
        color: var(--text-muted);
        margin: 0;
        line-height: 1.5;
    }

    .confirm-actions {
        display: flex;
        gap: 0.75rem;
        width: 100%;
    }

    .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.96);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes slideUp {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(0);
        }
    }

    @media (max-width: 480px) {
        .confirm-actions {
            flex-direction: column-reverse;
        }

        .confirm-actions button {
            width: 100%;
        }
    }
</style>
