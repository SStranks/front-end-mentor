import mongoose from 'mongoose';

interface IAddress {
  city: string;
  country: string;
  postCode: string;
  street: string;
}

const addressSchema = new mongoose.Schema<IAddress>(
  {
    city: {
      required: true,
      type: String,
    },
    country: {
      required: true,
      type: String,
    },
    postCode: {
      required: true,
      type: String,
    },
    street: {
      required: true,
      type: String,
    },
  },
  {
    id: false,
  }
);

export type { IAddress };
export { addressSchema };
