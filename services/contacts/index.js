import { listContacts } from './listContacts';
import { getContactById } from './getContactById';
import { removeContact } from './removeContact';
import { addContact } from './addContact';

const contactsServices = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

export default contactsServices;
