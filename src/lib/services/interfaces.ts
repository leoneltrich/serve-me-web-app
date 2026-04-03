export interface AdminUser {
  username: string;
  is_admin: boolean;
}

export interface Server {
  servername: string;
  port: number;
  protocol: string;
}

export interface AccessStatus {
  server: string;
  ip: string;
  is_active: boolean;
  expiration: number | null;
  time_remaining: string | null;
}

export interface AccessResponse {
  status: string;
  message: string;
  expires_in: string;
}

export interface IAdminService {
  getUsers(): Promise<AdminUser[]>;
  createUser(user: AdminUser & { password?: string }): Promise<void>;
  updateUser(user: AdminUser & { password?: string }): Promise<void>;
  deleteUser(username: string): Promise<void>;
}

export interface IServerService {
  getServers(): Promise<Server[]>;
  getServer(name: string): Promise<Server>;
  createServer(server: Server): Promise<void>;
  updateServer(name: string, server: Server): Promise<void>;
  deleteServer(name: string): Promise<void>;
  requestAccess(serverId: string): Promise<AccessResponse>;
  checkAccessStatus(server: string): Promise<AccessStatus>;
}
