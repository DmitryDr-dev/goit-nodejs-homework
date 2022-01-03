import { Router } from 'express';
import model from '../../model/index.js';
import { validateCreation, validateUpdate } from './validation';

const router = new Router();

router.get('/', async (req, res, next) => {
  const result = await model.listContacts();
  console.log(result);
  res.status(200).json(result);
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const result = await model.getContactById(contactId);
  if (!result) {
    res.status(404).json({ message: 'Not Found' });
  }

  res.status(200).json(result);
});

router.post('/', validateCreation, async (req, res, next) => {
  const newContact = await model.addContact(req.body);
  res.status(201).json(newContact);
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const result = await model.removeContact(contactId);
  if (!result) {
    res.status(404).json({ message: 'Not Found' });
  }
  res.status(200).json({ message: 'Contact Deleted' });
});

router.put('/:contactId', validateUpdate, async (req, res, next) => {
  const { contactId } = req.params;
  const result = await model.updateContact(contactId, req.body);
  if (!result) {
    res.status(404).json({ message: 'Not Found' });
  }

  res.status(200).json(result);
});

export default router;
