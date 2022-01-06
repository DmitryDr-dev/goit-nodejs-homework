import Contact from '../../model/contact';

export async function listContacts() {
  const result = await Contact.find();
  return result;
}
