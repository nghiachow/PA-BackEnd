import {IUser} from './user'
export interface IMember extends IUser{
    firstName: string,
    lastName: string,
    register(): void
}