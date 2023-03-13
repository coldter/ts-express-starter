import { Router } from 'express';
import { loginUser, registerUser } from '@controllers/auth.controller';
import { validateBody } from '@middlewares/validations.middleware';
import { userRegisterSchema } from '@schemas/auth.schema';

const router = Router();

router.post('/user/signup', validateBody(userRegisterSchema), registerUser);
router.post('/user/login', loginUser);

export default router;
