import { Router } from 'express';
import authControllers from '../../controllers/auth/auth';
import { guard } from '../../middlewares/guard';
import {
  validateSignUp,
  validateLogIn,
} from '../../middlewares/validation/auth/auth-validators';

const router = new Router();

router.post('/signup', validateSignUp, authControllers.signUpUser);
router.post('/login', validateLogIn, authControllers.logInUser);
router.post('/logout', guard, authControllers.logOutUser);
router.get('/current', guard, authControllers.getCurrentUser);

export default router;
