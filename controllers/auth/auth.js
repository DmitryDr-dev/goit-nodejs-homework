import { userService, authService } from '../../services';
import { HttpCode, ResultStatus } from '../../lib/constants';

const signUpUser = async (req, res, next) => {
  const { email } = req.body;
  const result = await userService.doesUserExist(email);
  if (result) {
    return res.status(HttpCode.CONFLICT).json({
      status: ResultStatus.ERROR,
      code: HttpCode.CONFLICT,
      message: 'Email in Use',
    });
  }

  const data = await userService.createUser(req.body);
  res
    .status(HttpCode.OK)
    .json({ status: ResultStatus.SUCCESS, code: HttpCode.OK, data });
};

const logInUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userService.isUserValid(email, password);
  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: ResultStatus.ERROR,
      code: HttpCode.UNAUTHORIZED,
      message: 'Invalid Credentials',
    });
  }

  const token = authService.getToken(user);
  await authService.setToken(user.id, token);

  res.status(HttpCode.OK).json({
    status: ResultStatus.SUCCESS,
    code: HttpCode.OK,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

const logOutUser = async (req, res, next) => {
  await authService.setToken(req.user.id, null);
  res
    .status(HttpCode.NO_CONTENT)
    .json({ status: ResultStatus.SUCCESS, code: HttpCode.OK });
};

const getCurrentUser = async (req, res, next) => {
  const { id: userId } = res.locals.user;
  const user = await userService.findUserById(userId);
  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: ResultStatus.ERROR,
      code: HttpCode.UNAUTHORIZED,
      message: 'Invalid Credentials',
    });
  }

  const token = authService.getToken(user);
  await authService.setToken(user.id, token);

  res.status(HttpCode.OK).json({
    status: ResultStatus.SUCCESS,
    code: HttpCode.OK,
    data: {
      name: user.name,
      email: user.email,
      subscription: user.subscription,
    },
  });
};

export default { signUpUser, logInUser, logOutUser, getCurrentUser };
