import { Request, Response, Router } from 'express';
import User from '../Model/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Factory } from '../Factory/factory';

export class UserController {
    public static userRegister = async (req: Request, res: Response) => {
        const { email } = req.body;
        const factory = new Factory()
        try {
            const user = await User.findOne({ email })
            if (!user) {
                const model = factory.createUser(req.body, req.body.role)
                model?.register()
                return res.status(200).json({
                    success: true,
                    message: 'User register successful',
                })
            }
            else {
                res.json({
                    success: false,
                    message: 'Email is already existed'
                })
            }
        } catch (error) {
            return res.json({
                err: error,
            })
        }
    }
    public static userLogin = async (req: Request, res: Response) => {
        const { email, password } = req.body
        try {
            const user: any = await User.findOne({ email })
            const jwtSecret: string = process.env.JWT_SECRET || " "
            if (!user) {
                return res.json({
                    success: false,
                    message: 'Wrong email or Password!' 
                })
            }
            else if (user) {
                await bcrypt.compare(password, user.password, (err, same) => {
                    if (same) {
                        const { firstName, lastName, email, role } = user
                        const accessToken = jwt.sign({
                            userId: user._id,
                            firstName,
                            lastName,
                            email,
                            role,
                        }, jwtSecret)
                        if (role === 'admin') {
                            return res.status(200).json({
                                success: true,
                                message: 'Login successful',
                                adminToken: accessToken
                            })
                        }
                        else return res.status(200).json({
                            success: true,
                            message: 'Login successful',
                            accessToken
                        })
                    }
                    else
                        return res.json({
                            success: false,
                            message: 'Wrong email or password!'
                        })
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    public static getUserByJWT = async (req: Request, res: Response) => {
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
            jwt.verify(token, jwtSecret, (err, valid: any) => {
                if (valid.userId && valid.role) {
                    res.json({
                        success: true,
                        validInfor: valid
                    })
                }
            })
        } catch (error) {
            return res.json({
                success: false,
                message: 'Invalid token'
            })
        }
    }
    public static changePassword = async (req: Request, res: Response) =>{
        const {id} = req.params
        const {oldPassword, password} = req.body
        try {
            const user :any = await User.findById(id, 'password')
            await bcrypt.compare(oldPassword, user.password, async (err, same) =>{
                if(same){
                    const newPassword = await bcrypt.hash(password, 10)
                    await User.findByIdAndUpdate(id, {password: newPassword})
                    return res.status(200).json({
                        success: true,
                        message: 'Updated password successfully'
                    })
                }
                else if(err){
                    return res.json({
                        success: false,
                        message: 'Wrong password, please try again!'
                    })
                }
            })
        } catch (error) {
            return res.json({
                success: false,
                message: 'Fail to change password'
            })
        }
    }
    public static updateUser = async (req: Request, res: Response) =>{
        try {
            const {userId} = req.params
            const {firstName, lastName, password} = req.body
            const user :any = await User.findById(userId)
            await bcrypt.compare(password, user.password, async (err, same) =>{
                if(same){
                    await User.findByIdAndUpdate(userId, {firstName, lastName})
                    return res.status(200).json({
                        success: true,
                        message: 'Updated your information'
                    })
                }
                else if(err){
                    return res.json({
                        success: false,
                        message: 'Wrong password, please try again!'
                    })
                }
            })
        } catch (error) {
            return res.json({
                success: false,
                message: 'Fail to update information'
            })
        }
    }
    public static update = async (req:Request,res:Response) => {
        try {
            const {userId} = req.params
            const {firstName, lastName} = req.body
            await User.findByIdAndUpdate(userId,{
                firstName: firstName,
                lastName: lastName
            })
            res.status(200).json({
                success: true,
                message:'Update user successfully'
            })
        } catch (error) {
            return res.json({
                err: error,
                success: false,
                message:'Update user failed'
            })
        }
    }
    public static getAllUser = async (req: Request, res: Response) => {
        try {
            const users = await User.find({})
            return res.status(200).json({
                success: true,
                message: 'Get user successfully',
                data: users
            })
        } catch (error) {
            return res.json({
                success: false,
                message: 'Fail to get user'
            })
        }
    }
    public static deleteUser = async (req: Request, res: Response) => {
        const {userId} = req.params
        try {
            await User.findByIdAndDelete(userId)
            res.status(200).json({
                success: true,
                message:'User deleted'
            })
        } catch (error) {
            res.json({
                err : error,
                success: false,
                message:'User deleted failed'
            })
        }
    }
    public static getUserDetail = async (req: Request, res: Response) => {
        const {userId} = req.params
        try {
            const detail : any = await User.findById(userId)
            return res.status(200).json({
                success: true,
                message: 'get user detail successfullly',
                data: detail
            })
        } catch (error) {
            res.json({
                err:error,
                success: false,
                message: 'get user detail failed'
            })
        }
    }
    public static resetPassword = async (req: Request, res: Response) => {
        const {email, password} = req.body
        try {
            await User.findOneAndUpdate({email},{
                password: password
            })
            res.status(200).json({
                success: true,
                message:'Change password successfully'
            })
        } catch (error) {
            res.json({
                err: error,
                success: false,
                message:'Change password failed'
            })
        }
    }
}