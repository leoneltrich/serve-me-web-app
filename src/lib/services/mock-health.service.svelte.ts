import type { IHealthService, SystemHealth } from './interfaces';

export class MockHealthService implements IHealthService {
  async getHealth(): Promise<SystemHealth> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      status: 'UP',
      last_updated: new Date().toISOString(),
      services: {
        'auth-service': {
          name: 'Authentication Service',
          status: 'UP',
          url: 'http://auth:8000',
          last_checked: new Date().toISOString(),
          latency_ms: 12,
          message: 'All systems operational'
        },
        'server-service': {
          name: 'Server Management',
          status: 'UP',
          url: 'http://servers:8000',
          last_checked: new Date().toISOString(),
          latency_ms: 45,
          message: 'All systems operational'
        },
        'database': {
          name: 'Main Database',
          status: 'UP',
          url: 'postgresql://db:5432',
          last_checked: new Date().toISOString(),
          latency_ms: 5,
          message: 'Connections stable'
        }
      }
    };
  }

  async getServicesHealth(): Promise<SystemHealth> {
    return this.getHealth();
  }
}
