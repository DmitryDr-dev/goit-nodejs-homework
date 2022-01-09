import { ResultStatus } from '../../lib/constants';

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async doesUserExist(email) {
    try {
      const user = await this.userRepository.findByEmail(email);
      return user;
    } catch (error) {
      console.error(`Error occurred on checking user: ${error.message}`);
      return null;
    }
  }

  async createUser(body) {
    const { email, subscription } = await this.userRepository.createUser(body);

    return {
      email,
      subscription,
    };
  }
}

export default UserService;
