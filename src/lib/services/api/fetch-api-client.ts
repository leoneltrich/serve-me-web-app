import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { ApiClient, ApiResponse } from './api-client.interface';

export class FetchApiClient implements ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string = PUBLIC_API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async post<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        // CRITICAL: Required for the browser to receive and send HttpOnly cookies
        credentials: 'include',
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return {
        status: 500,
        error: error instanceof Error ? error.message : 'Network connection failed',
      };
    }
  }

  async get<T>(path: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method: 'GET',
        credentials: 'include',
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return {
        status: 500,
        error: error instanceof Error ? error.message : 'Network connection failed',
      };
    }
  }

  async put<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return {
        status: 500,
        error: error instanceof Error ? error.message : 'Network connection failed',
      };
    }
  }

  async delete<T>(path: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return {
        status: 500,
        error: error instanceof Error ? error.message : 'Network connection failed',
      };
    }
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const status = response.status;
    
    if (!response.ok) {
      // Try to extract error message from body if available
      let error = response.statusText;
      try {
        const body = await response.json();
        error = body.message || body.error || error;
      } catch { /* ignore parse errors */ }
      
      return { status, error };
    }

    try {
      const data = await response.json();
      return { status, data };
    } catch {
      // Handle successful responses with no body
      return { status, data: {} as T };
    }
  }
}
