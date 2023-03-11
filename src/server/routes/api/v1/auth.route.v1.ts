import { Router } from 'express';
import { loginUser } from '@controllers/auth.controller';

const router = Router();

router.get('/user/login', loginUser);

export default router;
