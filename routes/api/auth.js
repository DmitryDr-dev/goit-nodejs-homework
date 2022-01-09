import { Router } from 'express';
import authControllers from '../../controllers/auth/auth';
import { guard } from '../../middlewares/guard';

const router = new Router();

router.post('/signup', authControllers.signUpUser);
router.post('/login', authControllers.logInUser);
router.post('/logout', guard, authControllers.logOutUser);

export default router;
