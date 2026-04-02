export interface User {
  id: string;
  username: string;
  role?: string;
}

export interface AuthResponse {
  user: User;
  // Note: Session is handled via HttpOnly cookie automatically by the browser
}

export interface AuthError {
  message: string;
  code?: string;
}
