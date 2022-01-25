import express from 'express';
import { Router } from 'express';
import { SubTaskController } from '../Controller/subTask';
import { checkToken } from '../middleware/auth';

export const subTaskRouter: Router = express.Router();

subTaskRouter.get('/:taskId',checkToken,SubTaskController.getSubTaskByTask)
subTaskRouter.get('/:taskId/:subTaskId',checkToken,SubTaskController.getSubTask)
subTaskRouter.post('/:taskId',checkToken,SubTaskController.addSubTask)
subTaskRouter.put('/:subTaskId',checkToken,SubTaskController.updateSubTask)
subTaskRouter.delete('/:subTaskId',checkToken,SubTaskController.deleteSubTask)
