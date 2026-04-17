import { ApiResponse } from '@/interface'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  const result: ApiResponse<T> = await response.json();

  if (!result.success) {
    if (result.error?.includes('inválido') || result.error?.includes('Token')) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      throw new Error('Sesión expirada');
    }
    throw new Error(result.error || 'Error');
  }

  return result.data as T;
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<{ token: string; user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
  },

  person: {
    getAll: (params?: { type?: string; roleCode?: string }) => {
      const query = params ? '?' + new URLSearchParams(params as any).toString() : '';
      return request<any[]>(`/person${query}`);
    },
    get: (id: string) => request<any>(`/person/${id}`),
    create: (data: any) => request<any>('/person', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => request<any>(`/person/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<any>(`/person/${id}`, { method: 'DELETE' }),
    updateCategory: (oldType: string, newType: string) =>
      request<any>('/person/update-category', { method: 'POST', body: JSON.stringify({ oldType, newType }) }),
  },

  scan: {
    process: (personId: string, type?: 'entry' | 'exit') =>
      request<{ type: string; message: string; log: any; person: any; status?: string }>('/scan', {
        method: 'POST',
        body: JSON.stringify({ personId, type }),
      }),
  },

  logs: {
    getAll: (params?: { personId?: string; date?: string; type?: 'entry' | 'exit' }) => {
      const query = params ? '?' + new URLSearchParams(params as any).toString() : '';
      return request<any[]>(`/logs${query}`);
    },
    getStats: () => request<{ inside: number; todayEntries: number; completed: number }>('/logs/stats'),
    getRecent: (limit: number = 10) => request<any[]>(`/logs/recent?limit=${limit}`),
    getInside: (limit: number = 10) => request<any[]>(`/logs/inside?limit=${limit}`),
  },
}