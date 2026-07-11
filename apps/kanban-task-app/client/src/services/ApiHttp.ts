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

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const res = await this.client.get<T>(url, config);
      return res.data;
    } catch (error) {
      throw handleServiceError(error);
    }
  }

  async post<T, U>(url: string, data: U, config?: AxiosRequestConfig) {
    try {
      const res = await this.client.post<T>(url, data, config);
      return res.data;
    } catch (error) {
      throw handleServiceError(error);
    }
  }

  async patch<T, U>(url: string, data: U, config?: AxiosRequestConfig) {
    try {
      const res = await this.client.patch<T>(url, data, config);
      return res.data;
    } catch (error) {
      throw handleServiceError(error);
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    try {
      const res = await this.client.delete<T>(url, config);
      return res;
    } catch (error) {
      throw handleServiceError(error);
    }
  }
}
