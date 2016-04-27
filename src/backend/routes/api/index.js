import { Router as router } from 'express';
import authRoutes from './auth';
const routes = router();

// Add new REST Endpoints here
routes.use('/auth', authRoutes);

export default routes;
