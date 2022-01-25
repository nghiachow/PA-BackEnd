import express from 'express';
import { Router } from 'express';
import { UserController } from '../Controller/user';
import { checkAdminToken, checkToken } from '../middleware/auth';

export const AuthRouter: Router = express.Router();

AuthRouter.post('/authenticate',UserController.userLogin)
AuthRouter.put('/resetPassword',checkAdminToken,UserController.resetPassword)
AuthRouter.get('/account',checkToken,UserController.getUserByJWT)