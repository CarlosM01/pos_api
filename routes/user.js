import express from 'express';
import { register, login, profile, updateProfile, deleteUser } from '../controllers/user.js';
import { authenticateToken } from '../middlewares/auth.js'

const authRouter = express.Router();

authRouter.post('/register', authenticateToken, register);
authRouter.post('/login', login);
authRouter.get('/profile', authenticateToken, profile);
authRouter.put('/profile', authenticateToken, updateProfile);
authRouter.delete('/profile', authenticateToken, deleteUser );


export default authRouter;