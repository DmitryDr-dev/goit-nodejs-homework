import Contact from '../../model/contact';
import { ResultStatus } from '../../lib/constants';

export async function removeContact(contactId) {
  try {
    const result = await Contact.findByIdAndRemove(contactId);
    console.log(result);
    return { status: ResultStatus.SUCCESS, data: result };
  } catch (error) {
    console.error(`Error occurred on removing contact: ${error.message}`);
    return { status: ResultStatus.ERROR, data: null };
  }
}
