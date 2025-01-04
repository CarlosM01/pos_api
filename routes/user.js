import express from 'express';
import { register, login, profile, updateProfile, deleteUser } from '../controllers/user.js';
import { authenticateToken } from '../middlewares/auth.js'

const userRouter = express.Router();

userRouter.post('/register', authenticateToken, register);
userRouter.post('/login', login);
userRouter.get('/profile', authenticateToken, profile);
userRouter.put('/profile', authenticateToken, updateProfile);
userRouter.delete('/profile', authenticateToken, deleteUser );


export default userRouter;