<script lang="ts">
  import type { AdminUser } from '$lib/services/interfaces';
  
  let { user, onedit, ondelete } = $props<{
    user: AdminUser;
    onedit: () => void;
    ondelete: () => void;
  }>();

  const initials = $derived(user.username.charAt(0).toUpperCase());
</script>

<div class="user-card">
  <div class="card-header">
    <div class="user-avatar">
      {initials}
    </div>
    <div class="user-info">
      <h3>{user.username}</h3>
      <span class="badge" class:admin={user.is_admin}>
        {user.is_admin ? 'Administrator' : 'Standard User'}
      </span>
    </div>
  </div>

  <div class="card-actions">
    <button class="action-btn edit" onclick={onedit} title="Edit User">
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
      <span>Edit</span>
    </button>
    <button class="action-btn delete" onclick={ondelete} title="Delete User">
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    </button>
  </div>
</div>

<style>
  .user-card {
    background: var(--card-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: var(--card-shadow);
  }

  .user-card:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.95);
    border-color: rgba(37, 99, 235, 0.2);
    box-shadow: 0 12px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  }

  :global(.dark-mode) .user-card:hover {
    background: rgba(24, 24, 27, 0.85);
    border-color: rgba(56, 189, 248, 0.3);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .user-avatar {
    width: 48px;
    height: 48px;
    background: var(--primary-gradient);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.25rem;
    flex-shrink: 0;
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
  }

  .user-info h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-main);
    letter-spacing: -0.01em;
  }

  .badge {
    font-size: 0.75rem;
    font-weight: 600;
    background: rgba(0, 0, 0, 0.05);
    color: var(--text-muted);
    padding: 0.125rem 0.5rem;
    border-radius: 6px;
    display: inline-block;
    margin-top: 0.25rem;
  }

  :global(.dark-mode) .badge {
    background: rgba(255, 255, 255, 0.05);
  }

  .badge.admin {
    background: rgba(139, 92, 246, 0.1);
    color: #8b5cf6;
  }

  .card-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    padding-top: 1rem;
    border-top: 1px solid var(--card-border);
  }

  .action-btn {
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 10px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .action-btn.edit {
    background: var(--brand-bg);
    color: var(--brand-color);
    padding: 0.5rem 1.25rem;
    font-weight: 600;
    font-size: 0.8125rem;
    flex: 1;
  }

  .action-btn.edit:hover {
    filter: brightness(0.95);
  }

  .action-btn.delete:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }

  :global(.dark-mode) .action-btn.edit:hover {
    background: rgba(56, 189, 248, 0.15);
  }
</style>
