export interface User {
  username: string;
  // Add other fields if the backend returns them later (id, role, etc)
}

export interface AuthError {
  message: string;
  code?: string;
}
