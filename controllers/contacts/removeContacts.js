import contactsServices from '../../services/contacts';
import { HttpCode, ResultStatus } from '../../lib/constants';

export async function removeContact(req, res, next) {
  const { contactId } = req.params;
  const result = await contactsServices.removeContact(contactId);
  console.log(result);

  if (result.status === ResultStatus.SUCCESS) {
    return res.status(HttpCode.OK).json({
      status: ResultStatus.SUCCESS,
      code: HttpCode.OK,
      data: result.data,
    });
  }

  return res.status(HttpCode.NOT_FOUND).json({
    status: ResultStatus.ERROR,
    code: HttpCode.NOT_FOUND,
    message: 'Not Found',
  });
}
