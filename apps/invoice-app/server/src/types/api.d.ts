import type { IInvoice } from '#Models/invoiceModel.ts';

export interface UpdateInvoiceStatusDTO {
  status: IInvoice['status'];
}

export type UpdateInvoiceDTO = IInvoice;

export type CreateInvoiceDTO = IInvoice;
