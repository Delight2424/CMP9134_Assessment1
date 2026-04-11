export type User = {
  _id: string;
  forename: string;
  email: string;
  role: "COMMANDER" | "VIEWER";
  createdAt?: string;
  updatedAt?: string;
};

export type RobotMap = {
  width: number;
  height: number;
  grid: number[][];
};

export type AuthResponse = {
  success: boolean;
  message: string;
  token?: string;
  data?: {
    id: string;
    forename: string;
    email: string;
    role: "COMMANDER" | "VIEWER";
  };
  error?: string;
};

export type RobotStatus = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  battery: number;
  status: string;
};

export type AuditEntry = {
  _id: string;
  userEmail: string | null;
  userForename: string | null;
  action: string;
  payload: Record<string, unknown>;
  success: boolean;
  errorMessage: string | null;
  createdAt: string;
};

export type PaginatedAuditResponse = {
  success: boolean;
  message: string;
  data: AuditEntry[];
  pagination: {
    totalEntries: number;
    currentPage: number;
    totalPages: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

export interface TelemetryData {
  battery?: number;
  status?: string;
  position?: {
    x: number;
    y: number;
  };
  sensors?: {
    E: number;
    N: number;
    S: number;
    W: number;
    lidar?: number[];
  };
}
