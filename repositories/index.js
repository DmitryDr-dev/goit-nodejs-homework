import User from '../model/user';
import UserRepository from './user/user.repository';

const userRepository = new UserRepository(User);

export { userRepository };
