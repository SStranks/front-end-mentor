import type { Router } from 'express';

import express from 'express';

import {
  createInvoice,
  deleteInvoice,
  getAllInvoices,
  getInvoice,
  updateInvoice,
  updateInvoiceStatus,
} from '#Controllers/invoiceController.js';

const invoiceRouter: Router = express.Router();

invoiceRouter.route('/').get(getAllInvoices).post(createInvoice);

invoiceRouter.route('/:id').get(getInvoice).patch(updateInvoice).delete(deleteInvoice);

invoiceRouter.route('/:id/status').patch(updateInvoiceStatus);

export default invoiceRouter;
