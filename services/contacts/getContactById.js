import Contact from '../../model/contact';
import { ResultStatus } from '../../lib/constants';

export async function getContactById(contactId) {
  try {
    const result = await Contact.findById(contactId);
    console.log(result);
    return { status: ResultStatus.SUCCESS, data: result };
  } catch (error) {
    console.error(`Error occurred on getting contact by id`);
    return { status: ResultStatus.ERROR, data: null };
  }
}
