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
}

export default AuthService;
