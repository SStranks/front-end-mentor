import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import axios from 'axios';

import { ENV } from '@Config/env';

import handleServiceError from './ApiServiceErrors';

export interface IApiClient {
  delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  get<TResponse>(url: string): Promise<TResponse>;
  patch<TRequest, TResponse>(url: string, data: TRequest, config?: AxiosRequestConfig): Promise<TResponse>;
  post<TRequest, TResponse>(url: string, data: TRequest, config?: AxiosRequestConfig): Promise<TResponse>;
}

export default class ApiClient implements IApiClient {
  private readonly client: AxiosInstance;

  protected createAxiosClient(): AxiosInstance {
    return axios.create({
      baseURL: `${ENV.apiHost}/api/v1`,
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
    });
  }

  constructor() {
    this.client = this.createAxiosClient();
  }

  async get<TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> {
    try {
      const res = await this.client.get<TResponse>(url, config);
      return res.data;
    } catch (error) {
      handleServiceError(error);
    }
    return {} as TResponse;
  }

  async post<TRequest, TResponse>(url: string, data: TRequest, config?: AxiosRequestConfig) {
    try {
      const res = await this.client.post<TResponse>(url, data, config);
      return res.data;
    } catch (error) {
      handleServiceError(error);
    }
    return {} as TResponse;
  }

  async patch<TRequest, TResponse>(url: string, data: TRequest, config?: AxiosRequestConfig) {
    try {
      const res = await this.client.patch<TResponse>(url, data, config);
      return res.data;
    } catch (error) {
      handleServiceError(error);
    }
    return {} as TResponse;
  }

  async delete(url: string, config?: AxiosRequestConfig) {
    try {
      const res = await this.client.delete(url, config);
      return res;
    } catch (error) {
      handleServiceError(error);
    }
    return {} as AxiosResponse;
  }
}
