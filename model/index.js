import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import contacts from './contacts.json';
import { fileURLToPath } from 'url';
import { writeFile } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const listContacts = async () => {
  return contacts;
};

const getContactById = async contactId => {
  const result = contacts.find(contact => contact.id === contactId);
  return result;
};

const removeContact = async contactId => {
  try {
    const indexToDelete = contacts.findIndex(
      contact => contact.id === contactId,
    );

    if (indexToDelete === -1) {
      throw new Error('Contact not found');
    }

    const newContacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(newContacts, null, 2),
    );
    return newContacts;
  } catch (error) {
    console.log(error);
    return null;
  }
};

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

const updateContact = async (contactId, body) => {
  try {
    const contactToUpdate = contacts.find(contact => contact.id === contactId);

    if (!contactToUpdate) {
      throw new Error('Contact not found');
    }

    const updatedContact = { ...contactToUpdate, ...body };

    const updatedContactList = contacts.reduce(
      (acc, contact) =>
        contact.id === contactId ? [...acc, updatedContact] : [...acc, contact],
      [],
    );

    await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(updatedContactList, null, 2),
    );

    return updatedContact;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
