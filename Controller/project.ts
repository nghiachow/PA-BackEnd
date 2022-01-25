import { Request, Response} from 'express';
import Project from '../Model/project';

export class ProjectController {
    public static addProject = async (req: Request, res: Response) => {
        try {
            const {name, description} = req.body
            await Project.create({
                name,
                description
            })
            return res.status(200).json({
                success: true,
                message: 'Add new project successfully'
            })
        } catch (error) {
            return res.json({
                err: error,
                success: false,
                message: 'Add new project false'
            })
        }
    }
    public static updateProject = async (req: Request, res: Response) => {
        try {
            const {projectId} = req.params
            const {name, description} = req.body
            await Project.findByIdAndUpdate(projectId,{
                name : name,
                description : description
            })
            res.status(200).json({
                success: true,
                message: 'Update project successfully'
            })
        } catch (error) {
            res.json({
                err: error,
                success: false,
                message: 'Update project failed'
            })
        }
    }
    public static getProject =async (req: Request, res: Response) => {
        const {projectId} = req.params
        try {
            const detail : any = await Project.findById(projectId)
            return res.status(200).json({
                success: true,
                message: 'get project detail successfullly',
                data: detail
            })
        } catch (error) {
            res.json({
                err:error,
                success: false,
                message: 'get project detail failed'
            })
        }
    }
    public static deleteProject = async (req: Request, res: Response) => {
        const {projectId} = req.params
        try {
            await Project.findByIdAndDelete(projectId)
            return res.status(200).json({
                success: true,
                message: 'Project deleted!'
            })
        } catch (error) {
            return res.json({
                err: error,
                success: false,
                message: 'Project deleted failed'
            })
        }
    }
    public static getAllProject = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({})
            return res.status(200).json({
                success: true,
                message: 'Get all projects successfully',
                data: projects
            })
        } catch (error) {
            return res.json({
                err: error,
                success: false,
                message:'Get all projects failed'
            })
        }
    }
}