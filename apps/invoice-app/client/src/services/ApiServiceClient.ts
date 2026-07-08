// NOTE:  ! This file is not complete. Basic working structure. Depends on backend API types
import type { IApiClient } from './ApiHttp';

export type TBody = { [x: string]: unknown };

interface TApiExpressResponse<T> {
  data: T;
  status: string;
  results?: number;
}

export interface IItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface IAddress {
  city: string;
  country: string;
  postCode: string;
  street: string;
}

export interface IInvoice {
  id: string;
  clientAddress: IAddress;
  clientEmail: string;
  clientName: string;
  createdAt: string;
  description: string;
  items: IItem[];
  paymentDue: string;
  paymentTerms: number;
  senderAddress: IAddress;
  slug: string;
  status: string;
  total: number;
}

export interface IResAllInvoices {
  invoices: IInvoice[];
}

export interface IResInvoice {
  invoice: IInvoice;
}

export interface IApiServiceClient {
  deleteInvoice(id: string): Promise<number | boolean>;
  getAllInvoices(): Promise<IInvoice[] | undefined>;
  getInvoice(id: string): Promise<IInvoice | undefined>;
  patchInvoice(id: string, data: TBody): Promise<IInvoice | undefined>;
  patchInvoiceStatus(id: string): Promise<IInvoice | undefined>;
  postInvoice(data: TBody): Promise<IInvoice | undefined>;
}

export default class ApiServiceClient implements IApiServiceClient {
  ApiServiceClient: IApiClient;

  constructor(ApiClient: IApiClient) {
    this.ApiServiceClient = ApiClient;
  }

  async getAllInvoices(): Promise<IInvoice[]> {
    const response = await this.ApiServiceClient.get<TApiExpressResponse<IResAllInvoices>>('/invoices');
    const {
      data: { invoices: responseData },
    } = response;
    return responseData;
  }

  async getInvoice(id: string): Promise<IInvoice> {
    const response = await this.ApiServiceClient.get<TApiExpressResponse<IResInvoice>>(`/invoices/${id}`);
    const {
      data: { invoice: responseData },
    } = response;
    return responseData;
  }

  async postInvoice(data: TBody): Promise<IInvoice> {
    const response = await this.ApiServiceClient.post<TBody, TApiExpressResponse<IResInvoice>>('/invoices', data);
    const {
      data: { invoice: responseData },
    } = response;
    return responseData;
  }

  async patchInvoice(id: string, data: TBody): Promise<IInvoice> {
    const response = await this.ApiServiceClient.patch<TBody, TApiExpressResponse<IResInvoice>>(
      `/invoices/${id}`,
      data
    );
    const {
      data: { invoice: responseData },
    } = response;
    return responseData;
  }

  async patchInvoiceStatus(id: string): Promise<IInvoice> {
    const response = await this.ApiServiceClient.patch<TBody, TApiExpressResponse<IResInvoice>>(
      `/invoices/${id}/status`,
      { status: 'paid' }
    );
    const {
      data: { invoice: responseData },
    } = response;
    return responseData;
  }

  async deleteInvoice(id: string) {
    const response = await this.ApiServiceClient.delete(`/invoices/${id}`);
    const { status: statusCode } = response;
    return statusCode;
  }
}
