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
    try {
      const { email, subscription } = await this.userRepository.createUser(
        body,
      );

      return {
        email,
        subscription,
      };
    } catch (error) {
      console.error(`Error occurred on creating user: ${error.message}`);
      return null;
    }
  }

  async getUser(email, password) {
    try {
      const user = await this.userRepository.findByEmail(email);
      const isPassportValid = await user?.isValidPassport(password);

      if (!isPassportValid) {
        return null;
      }

      return user;
    } catch (error) {
      console.error(`Error occurred on fetching user: ${error.message}`);
      return null;
    }
  }

  async findUserById(id) {
    try {
      const user = await this.userRepository.findById(id);
      return user;
    } catch (error) {
      console.error(`Error occurred on fetching user: ${error.message}`);
      return null;
    }
  }
}

export default UserService;
