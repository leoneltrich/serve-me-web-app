import type { ApiClient } from '../api/api-client.interface';
import type { IHealthService, SystemHealth } from '../interfaces';

export class BackendHealthService implements IHealthService {
  private readonly client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getHealth(): Promise<SystemHealth> {
    const response = await this.client.get<SystemHealth>('/health');
    
    if (response.error || !response.data) {
      throw new Error(response.error || 'Failed to fetch system health');
    }

    return response.data;
  }

  async getServicesHealth(): Promise<SystemHealth> {
    const response = await this.client.get<SystemHealth>('/health/services');
    
    if (response.error || !response.data) {
      throw new Error(response.error || 'Failed to fetch detailed services health');
    }

    return response.data;
  }
}
