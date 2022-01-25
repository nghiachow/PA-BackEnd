import { Request, Response} from 'express';
import SubTask from '../Model/subtask'

export class SubTaskController {
    public static addSubTask = async (req:Request,res:Response) => {
        const {taskId} = req.params
        try {
            const {name, due, description} = req.body
            await SubTask.create({
                name: name,
                due: due,
                description: description,
                task: taskId
            })
            return res.status(200).json({
                success: true,
                message: 'Add new SubTask successfully'
            })
        } catch (error) {
            return res.json({
                err: error,
                success: false,
                message: 'Add new SubTask failed'
            })
        }
    }
    public static updateSubTask = async (req: Request, res: Response) => {
        const {subTaskId} = req.params
        const {name, description, due, status} = req.body
        try {
            await SubTask.findByIdAndUpdate(subTaskId,{
                name,
                description,
                due,
                status
            })    
            return res.status(200).json({
                success: true,
                message: 'Update SubTask successfully'
            })
        } catch (error) {
            return res.json({
                err: error,
                success: false,
                message: 'Update SubTask failed'
            })
        }
    }                            
    public static getSubTask = async (req: Request,res: Response) => {
        const {taskId, subTaskId} = req.params
        try {
            await SubTask.find({task:taskId})
            const detail = await SubTask.findById(subTaskId)
            res.status(200).json({
                success: true,
                message: 'Get SubTask detail successfully',
                data: detail
            })
        } catch (error) {
            res.json({
                err: error,
                success: false,
                message:'Get SubTask detail failed'
            })
        }
    }
    public static getSubTaskByTask = async (req: Request, res: Response) => {
        const {taskId} = req.params
        try {
            const tasks = await SubTask.find({task:taskId})
            res.status(200).json({
                success: true,
                message: 'Get sub-tasks by task successfully',
                data: tasks
            })
        } catch (error) {
            res.json({
                err: error,
                success: false,
                message: 'Get sub-tasks by task failed'
            })
        }
    }
    public static deleteSubTask = async (req: Request, res: Response) => {
        const {subTaskId} = req.params
        try {
            await SubTask.findByIdAndDelete(subTaskId)
            return res.status(200).json({
                success: true,
                message: 'Sub-task deleted!'
            })
        } catch (error) {
            return res.json({
                err: error,
                success: false,
                message: 'Sub-task deleted failed'
            })
        }
    }
}
