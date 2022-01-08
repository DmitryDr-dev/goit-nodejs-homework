import { HttpCode, ResultStatus } from '../../lib/constants';
import contactsServices from '../../services/contacts';

export async function addContact(req, res, next) {
  const result = await contactsServices.addContact(req.body);
  if (result.status === ResultStatus.SUCCESS) {
    return res.status(HttpCode.CREATED).json({
      status: ResultStatus.SUCCESS,
      code: HttpCode.CREATED,
      data: result.data,
    });
  }

  return res.status(HttpCode.NOT_IMPLEMENTED).json({
    status: ResultStatus.ERROR,
    code: HttpCode.NOT_IMPLEMENTED,
    message: 'Error on creating contact',
  });
}
