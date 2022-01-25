import express from 'express';
import { Router } from 'express';
import { UserController } from '../Controller/user';
import { checkAdminToken, checkToken } from '../middleware/auth';

export const userRouter: Router = express.Router();

userRouter.get('/',UserController.getAllUser)
userRouter.post('/',UserController.userRegister)
userRouter.put('/:userId',checkToken,UserController.updateUser)
userRouter.delete('/:userId',checkAdminToken,UserController.deleteUser)
userRouter.get('/:userId',checkToken,UserController.getUserDetail)
