import Joi from 'joi';

const createSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
}).or('name', 'email', 'phone');

export const validateCreation = async (req, res, next) => {
  try {
    const value = await createSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({
      message: `missing required values: ${error.message.replace(/"/g, '')}`,
    });
  }

  next();
};

export const validateUpdate = async (req, res, next) => {
  try {
    const value = await updateSchema.validateAsync(req.body);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `missing fields: ${error.message.replace(/"/g, '')}` });
  }

  next();
};
