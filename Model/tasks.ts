import { model, Schema } from "mongoose";
const TaskSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    due: {
        type: Date
    },
    owner: {
        type: String,
    },
    status: {
        type: Number,
        default:0
    },
    project: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now
    },
})
const Task = model('Task', TaskSchema)


export default Task