import {
  userService,
  authService,
  FileStorage,
  EmailService,
  Mailer,
} from '../../services';
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

  const userData = await userService.createUser(req.body);
  const emailService = new EmailService(process.env.NODE_ENV, new Mailer());

  await emailService.sendVerifyingEmail(
    email,
    userData.name,
    userData.verifyToken,
  );

  delete userData.verifyToken;

  res.status(HttpCode.OK).json({
    status: ResultStatus.SUCCESS,
    code: HttpCode.OK,
    data: { ...userData },
  });
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

const updateAvatar = async (req, res, next) => {
  const file = req.file;
  const user = res.locals.user;

  const fileStorage = new FileStorage(file, user);
  const avatarUrl = await fileStorage.updateAvatar();

  if (avatarUrl) {
    return res.status(HttpCode.OK).json({
      status: ResultStatus.SUCCESS,
      code: HttpCode.OK,
      data: {
        avatarUrl,
      },
    });
  }

  return res.status(HttpCode.UNAUTHORIZED).json({
    status: ResultStatus.ERROR,
    code: HttpCode.UNAUTHORIZED,
    message: 'Not authorized',
  });
};

const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.id;
  const user = await authService.findUserByVerifyToken(verifyToken);

  if (user) {
    return res.status(HttpCode.OK).json({
      status: ResultStatus.SUCCESS,
      code: HttpCode.OK,
      data: {
        message: 'Success',
      },
    });
  }

  return res.status(HttpCode.BAD_REQUEST).json({
    status: ResultStatus.ERROR,
    code: HttpCode.BAD_REQUEST,
    data: {
      message: 'Invalid Token',
    },
  });
};

const resendEmailForVerifyingUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await userService.doesUserExist(email);

  if (user) {
    const { email, name, verifyToken } = user;
    const emailService = new EmailService(process.env.NODE_ENV, new Mailer());
    const result = await emailService.sendVerifyingEmail(
      email,
      name,
      verifyToken,
    );

    if (result) {
      return res.status(HttpCode.OK).json({
        status: ResultStatus.SUCCESS,
        code: HttpCode.OK,
        data: {
          message: 'Success',
        },
      });
    }

    return res.status(HttpCode.SERVICE_UNAVAILABLE).json({
      status: ResultStatus.ERROR,
      code: HttpCode.SERVICE_UNAVAILABLE,
      data: {
        message: 'Service Unavailable',
      },
    });
  }

  return res.status(HttpCode.NOT_FOUND).json({
    status: ResultStatus.ERROR,
    code: HttpCode.NOT_FOUND,
    data: {
      message: 'User not found',
    },
  });
};

export default {
  signUpUser,
  logInUser,
  logOutUser,
  getCurrentUser,
  updateAvatar,
  verifyUser,
  resendEmailForVerifyingUser,
};
