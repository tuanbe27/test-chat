import express from 'express';
// controllers
import authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', authController.register);

export default router;
