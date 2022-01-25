export interface IUser{    
    email: string,
    password: string,
    role: string,
    register(): void 
}