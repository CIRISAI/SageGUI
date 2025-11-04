/**
 * HTTP transport layer for CIRIS API communication
 */

export interface TransportOptions {
  baseURL: string;
  apiKey?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  params?: Record<string, any>;
  data?: any;
  headers?: Record<string, string>;
}

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class Transport {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private timeout: number;

  constructor(options: TransportOptions) {
    this.baseURL = options.baseURL;
    this.timeout = options.timeout || 30000;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...(options.apiKey && { Authorization: `Bearer ${options.apiKey}` }),
      ...options.headers,
    };
  }

  async request<T>(config: RequestConfig): Promise<T> {
    const url = new URL(config.path, this.baseURL);

    if (config.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url.toString(), {
        method: config.method,
        headers: {
          ...this.defaultHeaders,
          ...config.headers,
        },
        body: config.data ? JSON.stringify(config.data) : undefined,
        signal: controller.signal,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new APIError(
          error.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          error
        );
      }

      return response.json();
    } catch (error: any) {
      if (error instanceof APIError) throw error;
      if (error.name === 'AbortError') {
        throw new APIError('Request timeout', 408);
      }
      throw new APIError('Network error', 0, error);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>({ method: 'GET', path, params });
  }

  async post<T>(path: string, data?: any): Promise<T> {
    return this.request<T>({ method: 'POST', path, data });
  }

  async put<T>(path: string, data?: any): Promise<T> {
    return this.request<T>({ method: 'PUT', path, data });
  }

  async patch<T>(path: string, data?: any): Promise<T> {
    return this.request<T>({ method: 'PATCH', path, data });
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>({ method: 'DELETE', path });
  }
}
