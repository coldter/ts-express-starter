import { Router } from 'express';
import { verifyAuthToken } from '@middlewares/auth.middleware';
import authRoute from './auth.route.v1';
import usersRoute from './user.route.v1';

const router = Router();

/**
 * * Routes
 */
router.use('/auth', authRoute);

// * Protected user routes with auth middleware
router.use('/user', verifyAuthToken, usersRoute);

export default router;
