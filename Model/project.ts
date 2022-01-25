import { model, Schema } from "mongoose";
const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
})
const Project = model('Project', projectSchema)


export default Project