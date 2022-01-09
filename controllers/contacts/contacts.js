import { contactService } from '../../services';
import { HttpCode, ResultStatus } from '../../lib/constants';

const getContacts = async (req, res, next) => {
  const { id: userId } = res.locals.user;
  const result = await contactService.getContacts(userId);

  if (!result) {
    return res.status(HttpCode.NOT_FOUND).json({
      status: ResultStatus.ERROR,
      code: HttpCode.NOT_FOUND,
      message: 'Not Found',
    });
  }

  return res.status(HttpCode.OK).json({
    status: ResultStatus.SUCCESS,
    code: HttpCode.OK,
    data: result,
  });
};

const getContactById = async (req, res, next) => {
  const { id: userId } = res.locals.user;
  const { contactId } = req.params;
  const result = await contactService.getContactById(userId, contactId);

  if (!result) {
    return res.status(HttpCode.NOT_FOUND).json({
      status: ResultStatus.ERROR,
      code: HttpCode.NOT_FOUND,
      message: 'Not Found',
    });
  }

  return res.status(HttpCode.OK).json({
    status: ResultStatus.SUCCESS,
    code: HttpCode.OK,
    data: result,
  });
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { id: userId } = res.locals.user;
  const result = await contactService.removeContact(userId, contactId);

  if (!result) {
    return res.status(HttpCode.NOT_FOUND).json({
      status: ResultStatus.ERROR,
      code: HttpCode.NOT_FOUND,
      message: 'Not Found',
    });
  }

  return res.status(HttpCode.OK).json({
    status: ResultStatus.SUCCESS,
    code: HttpCode.OK,
    data: result,
  });
};

const addContact = async (req, res, next) => {
  const { id: userId } = res.locals.user;
  const result = await contactService.addContact(userId, req.body);
  console.log(result);

  if (!result) {
    return res.status(HttpCode.NOT_IMPLEMENTED).json({
      status: ResultStatus.ERROR,
      code: HttpCode.NOT_IMPLEMENTED,
      message: 'Error on creating contact',
    });
  }

  return res.status(HttpCode.CREATED).json({
    status: ResultStatus.SUCCESS,
    code: HttpCode.CREATED,
    data: result,
  });
};

const updateContact = async (req, res, next) => {
  const {
    params: { contactId },
    body,
  } = req;
  const { id: userId } = res.locals.user;

  const result = await contactService.updateContact(userId, contactId, body);

  if (!result) {
    return res.status(HttpCode.NOT_FOUND).json({
      status: ResultStatus.ERROR,
      code: HttpCode.NOT_FOUND,
      message: 'Not Found',
    });
  }

  return res.status(HttpCode.OK).json({
    status: ResultStatus.SUCCESS,
    code: HttpCode.OK,
    data: result,
  });
};

export default {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
