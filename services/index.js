import { userRepository, contactRepository } from '../repositories';
import UserService from './user/user-service';
import AuthService from './auth/auth-service';
import ContactService from './contact/contact-service';
import FileStorage from './file-storage/file-storage';
import EmailService from './email-service/email-service';
import Mailer from './mailer/mailer';

const userService = new UserService(userRepository);
const authService = new AuthService(userRepository);
const contactService = new ContactService(contactRepository);

export {
  userService,
  authService,
  contactService,
  FileStorage,
  EmailService,
  Mailer,
};
