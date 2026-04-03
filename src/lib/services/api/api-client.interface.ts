export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export interface ApiClient {
  post<T>(path: string, body: unknown): Promise<ApiResponse<T>>;
  get<T>(path: string): Promise<ApiResponse<T>>;
  put<T>(path: string, body: unknown): Promise<ApiResponse<T>>;
  delete<T>(path: string): Promise<ApiResponse<T>>;
}
