import type {ApiClient} from './api/api-client.interface';

export abstract class BaseService {
    protected readonly client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    /**
     * Performs an API request and handles basic error conditions.
     * @param method The API method to call on the client
     * @param path The API endpoint path
     * @param body Optional request body
     * @param options Configuration for response handling
     */
    protected async request<T>(
        method: 'get' | 'post' | 'put' | 'delete',
        path: string,
        body?: unknown,
        options: { unwrapData?: boolean } = {unwrapData: false}
    ): Promise<T> {
        const response = await this.client[method]<T>(path, body as any);

        if (response.error) {
            throw new Error(response.error);
        }

        if (response.data === undefined && response.status !== 204) {
            // Status 204 No Content is fine for some operations
            if (method !== 'delete') {
                throw new Error('No data received from server');
            }
        }

        if (options.unwrapData && response.data && typeof response.data === 'object' && 'data' in response.data) {
            return (response.data as any).data as T;
        }

        return response.data as T;
    }

    protected async get<T>(path: string, options?: { unwrapData?: boolean }): Promise<T> {
        return this.request<T>('get', path, undefined, options);
    }

    protected async post<T>(path: string, body?: unknown, options?: { unwrapData?: boolean }): Promise<T> {
        return this.request<T>('post', path, body, options);
    }

    protected async put<T>(path: string, body?: unknown, options?: { unwrapData?: boolean }): Promise<T> {
        return this.request<T>('put', path, body, options);
    }

    protected async delete<T>(path: string, options?: { unwrapData?: boolean }): Promise<T> {
        return this.request<T>('delete', path, undefined, options);
    }
}
