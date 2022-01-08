import { Router } from 'express';
import authControllers from '../../controllers/auth';

const router = new Router();

router.post('/signup', authControllers.signUpUser);
router.post('/login', authControllers.logInUser);
router.post('/logout', authControllers.logOutUser);

export default router;
