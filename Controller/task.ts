import { Request, Response, NextFunction} from 'express';
import Project from '../Model/project';
import Task from '../Model/tasks'
import jwt from 'jsonwebtoken'

export class TaskController {
    public static addTask = async (req:Request,res:Response) => {
        const data = req.body.token
        const {projectId} = req.params
        try {
            const {name, description, due, owner} = req.body
            await Task.create({
                name: name,
                description: description,
                owner: owner,
                due: due,
                project: projectId
            })
            return res.status(200).json({
                success: true,
                message: 'Add new Task successfully'
            })
        } catch (error) {
            return res.json({
                err: error,
                success: false,
                message: 'Add new Task failed'
            })
        }
    }
    public static updateTask = async (req: Request, res: Response) => {
        const {taskId} = req.params
        const {name, description, due, owner, status} = req.body
        try {
            await Task.findByIdAndUpdate(taskId,{
                name,
                description,
                due,
                owner,
                status
            })    
            return res.status(200).json({
                success: true,
                message: 'Update task successfully'
            })
        } catch (error) {
            return res.json({
                err: error,
                success: false,
                message: 'Update task failed'
            })
        }
    }                            
    public static getTask = async (req: Request,res: Response) => {
        const {taskId, projectId} = req.params
        try {
            await Task.find({project:projectId})
            const detail = await Task.findById(taskId)
            res.status(200).json({
                success: true,
                message: 'Get Task detail successfully',
                data: detail
            })
        } catch (error) {
            res.json({
                err: error,
                success: false,
                message:'Get Task detail failed'
            })
        }
    }
    public static getAllTask = async (req: Request, res: Response, next: NextFunction) => {
        const header = req.header('Authorization')
        const jwtSecret = process.env.JWT_SECRET || " "
        const token = header && header.split(' ')[1]
        if (!token) {
            return res.json({
                success: false,
                message: 'Need token'
            })
        }
        try {
            jwt.verify(token, jwtSecret, async (err, valid: any) => {
                if(valid.userId){
                    const tasks = await Task.find({owner: valid.userId})
                    res.status(200).json({
                        success: true,
                        message: 'get all tasks successfully',
                        data: tasks
                    })
                }
            })
        } catch (error) {
            res.json({
                err: error,
                success: false,
                message: 'get all tasks failed'
            })
        }
    }
    public static getTaskByProject = async (req: Request, res: Response) => {
        const {projectId} = req.params
        try {
            const tasks = await Task.find({project:projectId})
            res.status(200).json({
                success: true,
                message: 'get tasks by project successfully',
                data: tasks
            })
        } catch (error) {
            res.json({
                err: error,
                success: false,
                message: 'get tasks by project failed'
            })
        }
    }
    public static deleteTask = async (req: Request, res: Response) => {
        const {taskId} = req.params
        try {
            await Task.findByIdAndDelete(taskId)
            return res.status(200).json({
                success: true,
                message: 'Task deleted!'
            })
        } catch (error) {
            return res.json({
                err: error,
                success: false,
                message: 'Task deleted failed'
            })
        }
    }
}
