import { userService } from '../../services';
import { HttpCode, ResultStatus } from '../../lib/constants';

const signUpUser = async (req, res, next) => {
  const { email } = req.body;
  const result = await userService.doesUserExist(email);
  if (result) {
    return res.status(HttpCode.CONFLICT).json({
      status: ResultStatus.ERROR,
      code: HttpCode.CONFLICT,
      message: 'Invalid credentials',
    });
  }

  const data = await userService.createUser(req.body);
  res
    .status(HttpCode.OK)
    .json({ status: ResultStatus.SUCCESS, code: HttpCode.OK, data });
};
const logInUser = (req, res, next) => {};
const logOutUser = (req, res, next) => {};

export default { signUpUser, logInUser, logOutUser };
