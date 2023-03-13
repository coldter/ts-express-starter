import { getUserInfo } from '@controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.get('/me', getUserInfo);

export default router;
