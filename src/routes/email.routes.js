'use strict';
import express from 'express';
import EmailController from '../controllers/email.controller';

const router = express.Router();
const emailController = new EmailController();
router.post('/', (req, res) => emailController.send(req, res));

export default router;
