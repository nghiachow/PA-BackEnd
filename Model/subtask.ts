import { model, Schema } from "mongoose";
const SubTaskSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    due: {
        type: Date
    },
    description: {
        type: String,
    },
    status: {
        type: String
    },
    task: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
})
const SubTask = model('SubTask', SubTaskSchema)


export default SubTask