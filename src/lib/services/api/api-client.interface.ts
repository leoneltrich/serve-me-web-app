export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export interface ApiClient {
  post<T>(path: string, body: unknown): Promise<ApiResponse<T>>;
  get<T>(path: string): Promise<ApiResponse<T>>;
  // We can add put, delete, etc. as needed
}
