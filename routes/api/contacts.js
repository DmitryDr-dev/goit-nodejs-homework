import { Router } from 'express';
import contactsControllers from '../../controllers/contacts/contacts';
import {
  validateCreation,
  validateUpdate,
  validateUpdateFavorite,
} from '../../middlewares/validation/contactValidators';
import { guard } from '../../middlewares/guard';

const router = new Router();

router.get('/', guard, contactsControllers.getContacts);
router.get('/:contactId', guard, contactsControllers.getContactById);
router.post('/', guard, validateCreation, contactsControllers.addContact);
router.delete('/:contactId', guard, contactsControllers.removeContact);
router.put(
  '/:contactId',
  guard,
  validateUpdate,
  contactsControllers.updateContact,
);
router.patch(
  '/:contactId/favorite',
  guard,
  validateUpdateFavorite,
  contactsControllers.updateContact,
);

export default router;
