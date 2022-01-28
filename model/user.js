import mongoose from 'mongoose';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import { Subscription } from '../lib/constants';
import gravatar from 'gravatar';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: 'username',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate(value) {
        const re =
          /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        return re.test(String(value).trim().toLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    subscription: {
      type: String,
      enum: {
        values: Object.values(Subscription),
        message: 'Invalid Subscription',
      },
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true);
      },
    },
    verifyToken: {
      type: String,
      default: randomUUID,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassport = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

export default User;
