import Joi from 'joi';

export const signUpSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  subscription: Joi.string().optional(),
});

export const logInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
