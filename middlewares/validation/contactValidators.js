import { ResultStatus, HttpCode } from '../../lib/constants';
import {
  createSchema,
  updateSchema,
  updateFavoriteSchema,
} from './contactValidationSchemas';

export const validateCreation = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: ResultStatus.ERROR,
      code: HttpCode.BAD_REQUEST,
      message: `missing required values: ${error.message.replace(/"/g, '')}`,
    });
  }

  next();
};

export const validateUpdate = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: ResultStatus.ERROR,
      code: HttpCode.BAD_REQUEST,
      message: `missing fields: ${error.message.replace(/"/g, '')}`,
    });
  }

  next();
};

export const validateUpdateFavorite = async (req, res, next) => {
  try {
    await updateFavoriteSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: ResultStatus.ERROR,
      code: HttpCode.BAD_REQUEST,
      message: `missing field favorite: ${error.message.replace(/"/g, '')}`,
    });
  }

  next();
};
