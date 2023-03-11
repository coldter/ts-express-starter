import { Router } from 'express';
import authRoute from './auth.route.v1';

const router = Router();

/**
 * * Routes
 */
router.use('/auth', authRoute);

export default router;
