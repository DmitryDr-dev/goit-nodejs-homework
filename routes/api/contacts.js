import { Router } from 'express';
import contactsControllers from '../../controllers/contacts';
import {
  validateCreation,
  validateUpdate,
  validateUpdateFavorite,
} from '../../middlewares/validation/contactValidators';

const router = new Router();

router.get('/', contactsControllers.getContacts);
router.get('/:contactId', contactsControllers.getContactById);
router.post('/', validateCreation, contactsControllers.addContact);
router.delete('/:contactId', contactsControllers.removeContact);
router.put('/:contactId', validateUpdate, contactsControllers.updateContact);
router.patch(
  '/:contactId/favorite',
  validateUpdateFavorite,
  contactsControllers.updateContact,
);

export default router;
