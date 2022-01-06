import contactsServices from '../../services/contacts';
import { HttpCode, ResultStatus } from '../../lib/constants';

export async function getContactById(req, res, next) {
  const { contactId } = req.params;
  const result = await contactsServices.getContactById(contactId);
  console.log(result);
  if (result.status === ResultStatus.SUCCESS) {
    return res.status(HttpCode.OK).json({
      status: ResultStatus.SUCCESS,
      code: HttpCode.OK,
      data: result.data,
    });
  }

  return res.status(HttpCode.OK).json({
    status: ResultStatus.SUCCESS,
    code: HttpCode.OK,
    message: 'Not Found',
  });
}
