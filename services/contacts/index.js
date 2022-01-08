import { listContacts } from './listContacts';
import { getContactById } from './getContactById';
import { removeContact } from './removeContact';
import { addContact } from './addContact';
import { updateContact } from './updateContact';

const contactsServices = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

export default contactsServices;
