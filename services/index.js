import { userRepository, contactRepository } from '../repositories';
import UserService from './user/user-service';
import AuthService from './auth/auth-service';
import ContactService from './contact/contact-service';

const userService = new UserService(userRepository);
const authService = new AuthService(userRepository);
const contactService = new ContactService(contactRepository);

export { userService, authService, contactService };
