import jwt from 'jsonwebtoken';
import { HttpCode, ResultStatus } from '../lib/constants';
import { authService, userService } from '../services';

export const guard = async (req, res, next) => {
  const token = req.get('Authorization')?.split(' ')[1];
  console.log(token);
  const isValid = authService.isTokenValid(token);
  console.log('isValid', isValid);

  if (!token || !isValid) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: ResultStatus.ERROR,
      code: HttpCode.UNAUTHORIZED,
      message: 'Not Authorized',
    });
  }

  const payload = jwt.decode(token);
  const user = await userService.findUserById(payload.id);

  if (!user || user.token !== token) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: ResultStatus.ERROR,
      code: HttpCode.UNAUTHORIZED,
      message: 'Not Authorized',
    });
  }

  res.locals.user = user;

  next();
};
