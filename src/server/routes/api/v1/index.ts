import { Router } from 'express';
import { verifyAuthBearerToken } from '@middlewares/bearerAuth.middleware';
import authRoute from './auth.route.v1';
import usersRoute from './user.route.v1';

const router = Router();

/**
 * * Routes
 */
router.use('/auth', authRoute);

// * Protected user routes with auth middleware
router.use('/user', verifyAuthBearerToken, usersRoute);

export default router;
