import type { RequestHandler } from 'express';

import type { IUser } from '#Models/userModel.js';
import type { CreateInvoiceDTO, UpdateInvoiceDTO, UpdateInvoiceStatusDTO } from '#Types/api.js';

import Invoice from '#Models/invoiceModel.js';
import User from '#Models/userModel.js';
import AppError from '#Utils/appError.js';
import catchAsync from '#Utils/catchAsync.js';

const getAllInvoices: RequestHandler = catchAsync(
  // NOTE:  'total' is a virtual; requires 'items', which are then removed from return data
  async (_req, res, next) => {
    const invoices = await Invoice.find(
      {},
      'id slug paymentDue clientName paymentTerms createdAt items total status'
    ).transform((docs) => {
      return docs.map((doc) => {
        const { _id, slug, paymentDue, clientName, total, status } = doc;
        return { id: _id.toString(), clientName, paymentDue, slug, status, total };
      });
    });

    if (invoices.length === 0) return next(new AppError('No documents for current user', 404));

    return res.status(200).json({
      data: {
        invoices,
      },
      results: invoices.length,
      status: 'success',
    });
  }
);

const getInvoice: RequestHandler<{ id: string }> = catchAsync(async (req, res, next) => {
  const invoice = await Invoice.findById(req.params['id']).populate({
    model: User,
    path: 'senderAddress',
    select: 'address',
    transform: (doc: IUser) => doc.address,
  });

  if (!invoice) return next(new AppError('No document found with that ID', 404));

  return res.status(200).json({
    status: 'success',
    data: {
      invoice,
    },
  });
});

const createInvoice: RequestHandler<object, object, CreateInvoiceDTO> = catchAsync(async (req, res, _next) => {
  const invoice = await Invoice.create(req.body);

  return res.status(201).json({
    status: 'success',
    data: {
      invoice,
    },
  });
});

const updateInvoice: RequestHandler<{ id: string }, object, UpdateInvoiceDTO> = catchAsync(async (req, res, next) => {
  const invoice = await Invoice.findByIdAndUpdate(req.params['id'], req.body, {
    new: true,
    runValidators: true,
  });

  if (!invoice) return next(new AppError('No document found with that ID', 404));

  return res.status(200).json({
    status: 'success',
    data: {
      invoice,
    },
  });
});

const updateInvoiceStatus: RequestHandler<{ id: string }, object, UpdateInvoiceStatusDTO> = catchAsync(
  async (req, res, next) => {
    const { status } = req.body;
    const invoice = await Invoice.findByIdAndUpdate(
      req.params['id'],
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!invoice) return next(new AppError('No document found with that ID', 404));

    return res.status(200).json({
      status: 'success',
      data: {
        invoice,
      },
    });
  }
);

const deleteInvoice: RequestHandler<{ id: string }> = catchAsync(async (req, res, next) => {
  const invoice = await Invoice.findByIdAndDelete(req.params.id);

  if (!invoice) return next(new AppError('No document found with that ID', 404));

  return res.status(204).json({
    status: 'success',
    data: undefined,
  });
});

export { createInvoice, deleteInvoice, getAllInvoices, getInvoice, updateInvoice, updateInvoiceStatus };
