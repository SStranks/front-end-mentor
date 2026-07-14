import mongoose from 'mongoose';
import validator from 'validator';

interface IUser {
  email: string;
  name: string;
  photo: string;
  role: string;
  upvotes: mongoose.Types.ObjectId[];
  username: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    lowercase: true,
    require: [true, 'An email address is required'],
    type: String,
    unique: true,
    validate: [validator.default.isEmail, 'A valid email address is required'],
  },
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
  upvotes: [
    {
      ref: 'Request',
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  username: {
    required: true,
    trim: true,
    type: String,
    unique: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
