// import fs from 'fs/promises';
import contacts from './contacts.json';

const listContacts = async () => {
  return contacts;
};

const getContactById = async contactId => {
  const result = contacts.find(contact => contact.id === contactId);
  return result;
};

const removeContact = async contactId => {};

const addContact = async body => {};

const updateContact = async (contactId, body) => {};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
