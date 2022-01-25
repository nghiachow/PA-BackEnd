import { Admin } from './Class/admin'
import { Member } from './Class/member'
import { IMember } from './Interface/member'

export class Factory {
    createUser = (data: IMember, type: string) =>{
        const {firstName, lastName, email, password} = data
        if(type === 'admin'){
            return new Admin(email, password, 'admin')
        }
        if(type === 'member'){
            return new Member(email, password, firstName, lastName, 'member')
        }
    }
}