export const uiState = $state({
  isSidebarOpen: false,
  isLogoutConfirmationOpen: false,
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  },
  closeSidebar() {
    this.isSidebarOpen = false;
  },
  openLogoutConfirmation() {
    this.isLogoutConfirmationOpen = true;
  },
  closeLogoutConfirmation() {
    this.isLogoutConfirmationOpen = false;
  }
});
