import mongoose from 'mongoose';
import { MIN_AGE, MAX_AGE } from '../lib';

const { Schema, model } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  age: {
    type: Number,
    min: MIN_AGE,
    max: MAX_AGE,
    default: null,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model('contact', contactSchema);

export default Contact;
