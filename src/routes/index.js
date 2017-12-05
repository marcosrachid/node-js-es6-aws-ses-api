'use strict';
import express from 'express';
import emailRoutes from './email.routes';

const router = express.Router();

router.use('/email/api/v1', emailRoutes);

export default router;
