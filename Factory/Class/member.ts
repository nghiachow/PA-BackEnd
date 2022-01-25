import {IUser} from '../Interface/user'
import User from "../../Model/user";
import bcrypt from 'bcrypt';
export class Member implements IUser{
    constructor(
        public email: string,
        public password: string,
        public firstName: String,
        public lastName: String,
        public role: string,
    ){}
    async register(){
        const hashpassword = await bcrypt.hash(this.password, 10)
        const user = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: hashpassword,
            role: this.role
        }
        await User.create(user)
    }
    
}