import { listContacts } from './listContacts';
import { getContactById } from './getContactById';
import { removeContact } from './removeContact';

const contactsServices = {
  listContacts,
  getContactById,
  removeContact,
};

export default contactsServices;
