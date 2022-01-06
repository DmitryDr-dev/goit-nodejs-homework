import contactsServices from '../../services/contacts';
import { HttpCode, ResultStatus } from '../../lib/constants';

export async function updateContact(req, res, next) {
  const {
    params: { contactId },
    body,
  } = req;

  const result = await contactsServices.updateContact(contactId, body);

  if (result.status === ResultStatus.SUCCESS) {
    return res.status(HttpCode.OK).json({
      status: ResultStatus.SUCCESS,
      code: HttpCode.OK,
      data: result.data,
    });
  }

  res.status(HttpCode.NOT_FOUND).json({
    status: ResultStatus.ERROR,
    code: HttpCode.NOT_FOUND,
    message: 'Not Found',
  });
}
