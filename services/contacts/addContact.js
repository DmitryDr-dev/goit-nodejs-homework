import Contact from '../../model/contact';
import { ResultStatus } from '../../lib/constants';

export async function addContact(body) {
  try {
    const result = await Contact.create(body);
    return { status: ResultStatus.SUCCESS, data: result };
  } catch (error) {
    console.error(`Error on creating new contact: ${error.message}`);
    return { status: ResultStatus.ERROR, data: null };
  }
}
