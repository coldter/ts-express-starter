import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios';

export interface RequestConfig extends AxiosRequestConfig {}

export interface Response<T = any> extends AxiosResponse<T> {}

export class ServerRequest {
  private request: AxiosStatic;
  private baseUrl: string;
  private baseConfig?: RequestConfig;

  constructor(baseUrl: string, config?: RequestConfig) {
    this.request = axios;
    this.baseUrl = baseUrl;
    this.baseConfig = config || {};
  }

  public get<T = any>(url: string, config?: RequestConfig): Promise<Response<T>> {
    return this.request.get<T, Response<T>>(this.baseUrl + url, config || this.baseConfig);
  }

  public post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<Response<T>> {
    return this.request.post<T, Response<T>>(this.baseUrl + url, data, config || this.baseConfig);
  }

  public put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<Response<T>> {
    return this.request.put<T, Response<T>>(this.baseUrl + url, data, config || this.baseConfig);
  }

  public delete<T = any>(url: string, config?: RequestConfig): Promise<Response<T>> {
    return this.request.delete<T, Response<T>>(this.baseUrl + url, config || this.baseConfig);
  }

  public patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<Response<T>> {
    return this.request.patch<T, Response<T>>(this.baseUrl + url, data, config || this.baseConfig);
  }

  public static isRequestError(error: unknown): boolean {
    return (error as AxiosError).isAxiosError;
  }

  public static extractErrorMessage(error: any): string {
    if (!this.isRequestError(error)) {
      return 'Unknown error';
    }

    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return (axiosError.response.data as any).message || `error: ${axiosError.response.status}`;
    }

    return 'Unknown error';
  }
}
