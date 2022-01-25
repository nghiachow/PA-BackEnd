import express from 'express';
import { Router } from 'express';
import { ProjectController } from '../Controller/project';
import { checkToken } from '../middleware/auth';

export const projectRouter: Router = express.Router();

projectRouter.get('/',checkToken,ProjectController.getAllProject)
projectRouter.post('/',checkToken,ProjectController.addProject)
projectRouter.put('/:projectId',checkToken,ProjectController.updateProject) 
projectRouter.delete('/:projectId',checkToken,ProjectController.deleteProject)
projectRouter.get("/:projectId",checkToken,ProjectController.getProject)
