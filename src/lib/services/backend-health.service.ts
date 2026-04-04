import type {ApiClient} from './api/api-client.interface';
import type {IHealthService, SystemHealth} from './interfaces';
import {BaseService} from './base.service';

export class BackendHealthService extends BaseService implements IHealthService {
  constructor(client: ApiClient) {
    super(client);
  }

  async getHealth(): Promise<SystemHealth> {
    return this.get<SystemHealth>('/health');
  }

  async getServicesHealth(): Promise<SystemHealth> {
    return this.get<SystemHealth>('/health/services');
  }
}
