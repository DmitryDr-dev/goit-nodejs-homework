import User from '../model/user';
import Contact from '../model/contact';
import UserRepository from './user/user.repository';
import ContactRepository from './contact/contact.repository';

const userRepository = new UserRepository(User);
const contactRepository = new ContactRepository(Contact);

export { userRepository, contactRepository };
