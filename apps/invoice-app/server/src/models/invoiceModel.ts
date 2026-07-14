import type { IAddress } from './addressSchema.js';

import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import validator from 'validator';

import formatDate from '#Utils/formatDate.js';

import { addressSchema } from './addressSchema.js';

interface IItem {
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface IInvoice {
  clientAddress: IAddress;
  clientEmail: string;
  clientName: string;
  createdAt: Date;
  description: string;
  items: IItem[];
  paymentDue: string;
  paymentTerms: number;
  senderAddress: IAddress;
  slug: string;
  status: 'paid' | 'pending' | 'draft';
  total: number;
}

const itemSchema = new mongoose.Schema<IItem>(
  {
    name: {
      maxlength: [100, 'Item name can be no longer than 100 characters'],
      required: true,
      type: String,
    },
    price: {
      min: [0, 'Price must be a positive number'],
      required: true,
      type: Number,
    },
    quantity: {
      required: true,
      type: Number,
    },
  },
  {
    id: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: IInvoice & { __v?: number; _id?: mongoose.Types.ObjectId }) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

itemSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

itemSchema.virtual('total').get(function () {
  return this.quantity * this.price;
});

// Convert Date to dd/month(mmm)/yyyy
function convertDate(date: Date) {
  return formatDate(date);
}

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

// ------------------------------------------------------------------- //
// ------------------------     SCHEMA     --------------------------- //
// ------------------------------------------------------------------- //

const invoiceSchema = new mongoose.Schema<IInvoice>(
  {
    // TODO:  After creating sign-up functionality; have option when creating/updating invoice to use the default user address or add a new one.
    // senderAddress: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    // },
    clientAddress: {
      required: true,
      type: addressSchema,
    },
    clientEmail: {
      required: true,
      type: String,
      validate: [validator.default.isEmail, 'Email must be a valid email address'],
    },
    clientName: {
      required: true,
      type: String,
    },
    createdAt: {
      default: Date.now(),
      type: Date,
      set: (str: string) => {
        const dateParts = str.split('/');
        const newDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
        return new Date(newDate);
      },
    },
    description: {
      maxlength: [100, 'Description can be no longer than 100 characters'],
      required: true,
      trim: true,
      type: String,
    },
    items: [
      {
        type: itemSchema,
      },
    ],
    paymentTerms: {
      default: 30,
      enum: [1, 7, 14, 30],
      required: true,
      type: Number,
    },
    senderAddress: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
    },
    slug: {
      default: nanoid(),
      immutable: true,
      type: String,
    },
    status: {
      default: 'draft',
      enum: ['paid', 'pending', 'draft'],
      required: true,
      type: String,
    },
  },
  {
    id: false,
    toJSON: {
      getters: true,
      virtuals: true,
      transform: (_doc, ret: IInvoice) => {
        const { createdAt: createdAtOld, ...rest } = ret;
        const createdAt = convertDate(createdAtOld);
        return { createdAt, ...rest };
      },
    },
    toObject: { virtuals: true },
  }
);

invoiceSchema.virtual('paymentDue').get(function () {
  const { createdAt, paymentTerms } = this;
  const newDate = convertDate(new Date(createdAt.setDate(createdAt.getDate() + paymentTerms)));
  return newDate;
});

invoiceSchema.virtual('total').get(function () {
  return this.items.reduce((acc, cur) => {
    return acc + cur.total;
  }, 0);
});

invoiceSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
