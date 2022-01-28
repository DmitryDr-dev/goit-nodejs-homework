import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  getToken(user) {
    const { id, email } = user;
    const payload = { id, email };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '8h' });
    return token;
  }

  async setToken(id, token) {
    await this.userRepository.updateToken(id, token);
  }

  async isTokenValid(token) {
    try {
      const verify = jwt.verify(token, SECRET_KEY);
      return !!verify;
    } catch (e) {
      return false;
    }
  }

  async findUserByVerifyToken(token) {
    const user = await this.userRepository.findUserByVerifyToken(token);

    if (user) {
      await this.userRepository.updateVerifyToken(user.id, true);
      return user;
    }

    return false;
  }
}

export default AuthService;
