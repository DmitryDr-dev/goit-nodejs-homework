import Contact from '../../model/contact';
import { ResultStatus } from '../../lib/constants';

export async function listContacts() {
  try {
    const result = await Contact.find();
    console.log(result);
    return { status: ResultStatus.SUCCESS, data: result };
  } catch (error) {
    console.error(`Error occurred on getting messages ${error.message}`);
    return { status: ResultStatus.ERROR, data: null };
  }
}
