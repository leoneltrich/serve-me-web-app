export const uiState = $state({
  isSidebarOpen: false,
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  },
  closeSidebar() {
    this.isSidebarOpen = false;
  }
});
