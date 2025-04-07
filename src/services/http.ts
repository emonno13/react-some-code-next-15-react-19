// HTTP client utility using fetch

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type RequestOptions = {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  credentials?: RequestCredentials;
  cache?: RequestCache;
};

type ApiError = {
  message: string;
  status: number;
  data?: unknown;
};

const defaultOptions: RequestOptions = {
  credentials: 'include',
  cache: 'no-store',
  headers: {
    'Content-Type': 'application/json',
  },
};

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const mergedOptions: RequestOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  if (mergedOptions.body) {
    mergedOptions.body = JSON.stringify(mergedOptions.body);
  }

  const response = await fetch(
    `${BASE_URL}${endpoint}`,
    mergedOptions as RequestInit
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message:
        response.status === 401
          ? 'Authentication failed. Please check your credentials.'
          : `HTTP error! status: ${response.status}`,
      status: response.status,
    }));
    const errorMessage =
      error.message ||
      `HTTP error! status: ${response.status} - ${response.statusText}`;
    const customError = new Error(errorMessage) as Error & ApiError;
    customError.status = response.status;
    customError.data = error;
    throw customError;
  }

  return response.json();
}

export const http = {
  get: <T>(
    endpoint: string,
    options?: Omit<RequestOptions, 'body' | 'method'>
  ) => request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(
    endpoint: string,
    body: unknown,
    options?: Omit<RequestOptions, 'body' | 'method'>
  ) => request<T>(endpoint, { ...options, method: 'POST', body }),

  put: <T>(
    endpoint: string,
    body: unknown,
    options?: Omit<RequestOptions, 'body' | 'method'>
  ) => request<T>(endpoint, { ...options, method: 'PUT', body }),

  delete: <T>(
    endpoint: string,
    options?: Omit<RequestOptions, 'body' | 'method'>
  ) => request<T>(endpoint, { ...options, method: 'DELETE' }),
};
