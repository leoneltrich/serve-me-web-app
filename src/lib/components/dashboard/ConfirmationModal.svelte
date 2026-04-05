<script lang="ts">
    import {AlertTriangle} from 'lucide-svelte';
    import Modal from './Modal.svelte';

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

<Modal {isOpen} {title} onclose={handleCancel}>
    <div class="confirm-modal-content">
        <div class="confirm-header-custom">
            <div class="confirm-icon-container" class:danger={isDanger}>
                <AlertTriangle size={24}/>
            </div>
            <div class="confirm-title-area">
                <p class="message">{message}</p>
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
</Modal>

<style>
    .confirm-modal-content {
        display: flex;
        flex-direction: column;
        gap: 1.75rem;
    }

    .confirm-header-custom {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
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

    .confirm-title-area .message {
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

    .confirm-actions button {
        flex: 1;
    }

    .btn-danger {
        background: #ef4444 !important;
        color: white !important;
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

    @media (max-width: 480px) {
        .confirm-actions {
            flex-direction: column-reverse;
        }
    }
</style>
