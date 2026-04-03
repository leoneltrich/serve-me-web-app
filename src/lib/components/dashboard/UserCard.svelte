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
    <div class="avatar-wrapper">
      <div class="user-avatar">
        {initials}
      </div>
      {#if user.is_admin}
        <div class="admin-indicator" title="Administrator">
          <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" stroke-width="3" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
      {/if}
    </div>
    
    <div class="user-info">
      <h3>{user.username}</h3>
      <div class="role-status" class:admin={user.is_admin}>
        <span class="status-dot"></span>
        <span class="role-text">{user.is_admin ? 'Administrator' : 'Standard User'}</span>
      </div>
    </div>
  </div>

  <div class="card-actions">
    <button class="action-btn edit" onclick={onedit} title="Edit User">
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
      <span>Edit Profile</span>
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
    border-radius: 20px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: var(--card-shadow);
    position: relative;
    overflow: hidden;
  }

  .user-card:hover {
    background: rgba(255, 255, 255, 0.95);
    border-color: rgba(37, 99, 235, 0.2);
    box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1);
  }

  :global(.dark-mode) .user-card:hover {
    background: rgba(24, 24, 27, 0.85);
    border-color: rgba(56, 189, 248, 0.3);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  .avatar-wrapper {
    position: relative;
    flex-shrink: 0;
  }

  .user-avatar {
    width: 52px;
    height: 52px;
    background: var(--primary-gradient);
    color: white;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.5rem;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  }

  .admin-indicator {
    position: absolute;
    bottom: -4px;
    right: -4px;
    width: 20px;
    height: 20px;
    background: #8b5cf6;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--card-bg);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .user-info h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-main);
    letter-spacing: -0.01em;
    line-height: 1.2;
  }

  .role-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-muted);
  }

  .status-dot {
    width: 6px;
    height: 6px;
    background: #94a3b8;
    border-radius: 50%;
  }

  .role-text {
    font-size: 0.8125rem;
    font-weight: 500;
  }

  .role-status.admin {
    color: #8b5cf6;
  }

  .role-status.admin .status-dot {
    background: #8b5cf6;
    box-shadow: 0 0 8px #8b5cf6;
  }

  .card-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--card-border);
  }

  .action-btn {
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.625rem;
    border-radius: 12px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .action-btn.edit {
    background: var(--brand-bg);
    color: var(--brand-color);
    padding: 0.625rem 1.5rem;
    font-weight: 600;
    font-size: 0.875rem;
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
