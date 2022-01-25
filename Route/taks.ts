import express from 'express';
import { Router } from 'express';
import { TaskController } from '../Controller/task';
import { checkToken } from '../middleware/auth';

export const taskRouter: Router = express.Router();

taskRouter.get('/all',checkToken,TaskController.getAllTask)
taskRouter.get('/:projectId',checkToken,TaskController.getTaskByProject)
taskRouter.get('/:projectId/:taskId',checkToken,TaskController.getTask)
taskRouter.post('/:projectId',checkToken,TaskController.addTask)
taskRouter.put('/:projectId/:taskId',checkToken,TaskController.updateTask)
taskRouter.delete('/:projectId/:taskId',checkToken,TaskController.deleteTask)
