import contactsServices from '../../services/contacts';
import { HTTP_CODE } from '../../lib/constants';

export async function getContacts(req, res, next) {
  const contacts = await contactsServices.listContacts();
  console.log(contacts);
  if (contacts) {
    return res
      .status(HTTP_CODE.OK)
      .json({ status: 'success', code: HTTP_CODE.OK, data: { ...contacts } });
  }
}
