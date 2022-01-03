import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import contacts from './contacts.json';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const listContacts = async () => {
  return contacts;
};

const getContactById = async contactId => {
  const result = contacts.find(contact => contact.id === contactId);
  return result;
};

const removeContact = async contactId => {};

const addContact = async body => {
  try {
    const newContact = { id: randomUUID(), ...body };
    const newData = [...contacts, newContact];
    await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(newData, null, 2),
    );
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
