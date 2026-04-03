import type { IServerService, Server, AccessResponse, AccessStatus } from './interfaces';

export class MockServerService implements IServerService {
  private servers = $state<Server[]>([
    { servername: 'minecraft-survival', port: 25565, protocol: 'TCP/UDP' },
    { servername: 'media-server-01', port: 8080, protocol: 'TCP' },
    { servername: 'db-production', port: 5432, protocol: 'TCP' }
  ]);

  async getServers(): Promise<Server[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.servers]), 500);
    });
  }

  async getServer(name: string): Promise<Server> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const server = this.servers.find(s => s.servername === name);
        if (server) resolve({ ...server });
        else reject(new Error('Server not found'));
      }, 300);
    });
  }

  async createServer(server: Server): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.servers.push({ ...server });
        resolve();
      }, 500);
    });
  }

  async updateServer(name: string, server: Server): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.servers.findIndex(s => s.servername === name);
        if (index !== -1) {
          this.servers[index] = { ...server };
          resolve();
        } else {
          reject(new Error('Server not found'));
        }
      }, 500);
    });
  }

  async deleteServer(name: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.servers.findIndex(s => s.servername === name);
        if (index !== -1) {
          this.servers.splice(index, 1);
        }
        resolve();
      }, 500);
    });
  }

  async requestAccess(serverId: string): Promise<AccessResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'success',
          message: `IP has been whitelisted for ${serverId}.`,
          expires_in: '12h'
        });
      }, 800);
    });
  }

  async checkAccessStatus(server: string): Promise<AccessStatus> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          server,
          ip: '192.168.1.50',
          is_active: Math.random() > 0.3,
          expiration: Date.now() + 1000 * 60 * 60 * 2, // 2 hours
          time_remaining: '2h 0m'
        });
      }, 400);
    });
  }
}
