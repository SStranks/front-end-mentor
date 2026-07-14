import type { IAddress } from '#Models/addressSchema.js';

import mongoose from 'mongoose';
import validator from 'validator';

import { addressSchema } from '#Models/addressSchema.js';

export interface IUser {
  address: IAddress;
  email: string;
  invoices: mongoose.Types.ObjectId[];
  name: string;
  photo: string;
  role: string;
  username: string;
}

const userSchema = new mongoose.Schema<IUser>({
  address: {
    required: true,
    type: addressSchema,
  },
  email: {
    lowercase: true,
    require: [true, 'An email address is required'],
    type: String,
    unique: true,
    validate: [validator.default.isEmail, 'A valid email address is required'],
  },
  invoices: [
    {
      ref: 'Invoice',
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  name: {
    required: [true, 'A name is required'],
    type: String,
  },
  photo: {
    type: String,
  },
  role: {
    default: 'user',
    enum: ['user', 'admin'],
    type: String,
  },
  username: {
    required: true,
    trim: true,
    type: String,
    unique: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
