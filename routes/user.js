import express from 'express';
import { register, login, profile } from '../controllers/user.js';
import { authenticateToken } from '../middlewares/auth.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, profile);

export default router;