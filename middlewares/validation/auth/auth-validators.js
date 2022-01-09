import { ResultStatus, HttpCode } from '../../../lib/constants';
import { signUpSchema, logInSchema } from './auth-schemas';

export const validateSignUp = async (req, res, next) => {
  try {
    await signUpSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: ResultStatus.ERROR,
      code: HttpCode.BAD_REQUEST,
      message: `missing required values: ${error.message.replace(/"/g, '')}`,
    });
  }

  next();
};

export const validateLogIn = async (req, res, next) => {
  try {
    await logInSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: ResultStatus.ERROR,
      code: HttpCode.BAD_REQUEST,
      message: `missing required values: ${error.message.replace(/"/g, '')}`,
    });
  }

  next();
};
