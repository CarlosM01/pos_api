import express from 'express';
import { register, login, profile } from '../controllers/user.js';
import { authenticateToken } from '../middlewares/auth.js'

const authRouter = express.Router();

authRouter.post('/register', authenticateToken, register);
authRouter.post('/login', login);
authRouter.get('/profile', authenticateToken, profile);

export default authRouter;