import type { ServerService, Server } from './interfaces';

export class MockServerService implements ServerService {
  private servers = $state<Server[]>([
    { servername: 'media-server-01', port: 8080, protocol: 'TCP' },
    { servername: 'db-master', port: 5432, protocol: 'TCP' },
    { servername: 'game-node', port: 25565, protocol: 'UDP' }
  ]);

  async getServers(): Promise<Server[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.servers;
  }

  async createServer(server: Server): Promise<void> {
    this.servers.push(server);
  }

  async updateServer(name: string, server: Server): Promise<void> {
    const index = this.servers.findIndex(s => s.servername === name);
    if (index !== -1) this.servers[index] = server;
  }

  async deleteServer(name: string): Promise<void> {
    this.servers = this.servers.filter(s => s.servername !== name);
  }
}
