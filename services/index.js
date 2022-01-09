import { userRepository } from '../repositories';
import UserService from './user/user.service';

const userService = new UserService(userRepository);

export { userService };
