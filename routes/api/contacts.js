import { Router } from 'express';
import model from '../../model/index.js';

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

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

export default router;
