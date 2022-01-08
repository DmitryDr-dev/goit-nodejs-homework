import { getContacts } from './getContacts';
import { getContactById } from './getContactById';
import { removeContact } from './removeContacts';
import { addContact } from './addContact';
import { updateContact } from './updateContact';

const contactsControllers = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

export default contactsControllers;
