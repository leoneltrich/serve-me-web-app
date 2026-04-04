export class UIState {
    private _isSidebarOpen = $state(false);
    private _isLogoutConfirmationOpen = $state(false);

    get isSidebarOpen() {
        return this._isSidebarOpen;
    }

    get isLogoutConfirmationOpen() {
        return this._isLogoutConfirmationOpen;
    }

  toggleSidebar() {
      this._isSidebarOpen = !this._isSidebarOpen;
  }

  closeSidebar() {
      this._isSidebarOpen = false;
  }

  openLogoutConfirmation() {
      this._isLogoutConfirmationOpen = true;
  }

  closeLogoutConfirmation() {
      this._isLogoutConfirmationOpen = false;
  }
}

export const uiState = new UIState();
