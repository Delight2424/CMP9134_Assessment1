import axios from "axios";
import { clearAuth, getToken } from "../utils/auth";

const API_BASE = "http://localhost:4000/api";

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  },
);

export const api = {
  signup: async (body: {
    forename: string;
    email: string;
    password: string;
  }) => {
    const response = await apiClient.post("/auth/signup", body);
    return response.data;
  },

  signin: async (body: { email: string; password: string }) => {
    const response = await apiClient.post("/auth/signin", body);
    return response.data;
  },

  signout: async () => {
    const response = await apiClient.post("/auth/signout");
    return response.data;
  },

  getRobotStatus: async () => {
    const response = await apiClient.get("/robot/status");
    return response.data;
  },

  getRobotMap: async () => {
    const response = await apiClient.get("/robot/map");
    return response.data;
  },

  moveRobot: async (body: { x: number; y: number }) => {
    const response = await apiClient.post("/robot/move", body);
    return response.data;
  },

  resetRobot: async () => {
    const response = await apiClient.post("/robot/reset");
    return response.data;
  },

  getSensors: async () => {
    const response = await apiClient.get("/robot/sensor");
    return response.data;
  },

  getAuditEntries: async (page = 1, limit = 10) => {
    const response = await apiClient.get(`/audit?page=${page}&limit=${limit}`);
    return response.data;
  },

  getUsers: async () => {
    const response = await apiClient.get("/users");
    return response.data;
  },

  updateUserRole: async (id: string, role: "COMMANDER" | "VIEWER") => {
    const response = await apiClient.patch(`/users/${id}/role`, { role });
    return response.data;
  },
};
