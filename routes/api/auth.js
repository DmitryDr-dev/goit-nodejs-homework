import { Router } from 'express';
import authControllers from '../../controllers/auth';

const router = new Router();

router.post('/signup', authControllers.signUpUser);

export default router;
