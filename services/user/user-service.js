import fs from 'fs/promises';
import path from 'path';
const AVATAR_DIR = process.env.AVATAR_DIR;

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
      const { email, subscription, verifyToken } =
        await this.userRepository.createUser(body);

      return {
        email,
        subscription,
        verifyToken,
      };
    } catch (error) {
      console.error(`Error occurred on creating user: ${error.message}`);
      return null;
    }
  }

  async isUserValid(email, password) {
    try {
      const user = await this.userRepository.findByEmail(email);
      const isPassportValid = await user?.isValidPassport(password);

      if (!isPassportValid || !user?.isVerified) {
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

  async updateUserAvatar(file, user) {
    const destinationDir = path.join(AVATAR_DIR, user.id);
    await fs.mkdir(destinationDir, { recursive: true });
    await fs.rename(file.path, path.join(destinationDir, file.filename));
    const avatarUrl = path.normalize(path.join(user.id, file.filename));

    await this.userRepository.updateAvatar(user.id, avatarUrl);
    return avatarUrl;
  }
}

export default UserService;
