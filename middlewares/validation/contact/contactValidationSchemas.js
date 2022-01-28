import Joi from 'joi';
import { MAX_AGE, MIN_AGE } from '../../../lib/constants';

export const createSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
  favorite: Joi.bool().optional(),
});

export const updateSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
  favorite: Joi.bool().optional(),
}).or('name', 'email', 'phone', 'age');

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});
