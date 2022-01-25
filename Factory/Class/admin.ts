import User from "../../Model/user";
import bcrypt from 'bcrypt';
import { IUser } from "../Interface/user";
export class Admin implements IUser{
    constructor(
        public email: string,
        public password: string,
        public role: string,
    ){}
    async register(){
        const hashpassword = await bcrypt.hash(this.password, 10)
        const user = {
            email: this.email,
            password: hashpassword,
            role: this.role
        }
        await User.create(user)
    }
    
}