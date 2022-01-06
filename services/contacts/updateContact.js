import Contact from '../../model/contact';
import { ResultStatus } from '../../lib/constants';

export async function updateContact(contactId, body) {
  try {
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { ...body },
      { new: true },
    );
    return { status: ResultStatus.SUCCESS, data: result };
  } catch (error) {
    console.error(`Error on updating contact: ${error.message}`);
    return { status: ResultStatus.ERROR, data: null };
  }
}
