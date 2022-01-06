import { getContacts } from './getContacts';
import { getContactById } from './getContactById';
import { removeContact } from './removeContacts';
import { addContact } from './addContact';

const contactsControllers = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
};

export default contactsControllers;
