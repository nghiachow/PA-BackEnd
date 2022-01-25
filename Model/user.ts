import { model, Schema } from "mongoose";
const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName:{
        type: String
    },
    email: {
        unique: true,
        type: String,
        required: true
    },
    role: {
        type: String,
        default: null
    },
    password: {
        required: true,
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    },
})
const User = model('User', userSchema)


export default User