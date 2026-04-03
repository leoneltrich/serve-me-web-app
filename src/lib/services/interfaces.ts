// src/lib/services/admin/admin-service.interface.ts
export interface AdminUser {
  username: string;
  is_admin: boolean;
}

export interface AdminService {
  getUsers(): Promise<AdminUser[]>;
  createUser(user: AdminUser & { password?: string }): Promise<void>;
  updateUser(user: AdminUser & { password?: string }): Promise<void>;
  deleteUser(username: string): Promise<void>;
}

// src/lib/services/servers/server-service.interface.ts
export interface Server {
  servername: string;
  port: number;
  protocol?: string;
}

export interface ServerService {
  getServers(): Promise<Server[]>;
  createServer(server: Server): Promise<void>;
  updateServer(name: string, server: Server): Promise<void>;
  deleteServer(name: string): Promise<void>;
}
