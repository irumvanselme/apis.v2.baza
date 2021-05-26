import mongoose from "mongoose"
import {createForeignKey} from "../utils/db.js";

const questionActionSchema = new mongoose.Schema({
    user: createForeignKey("User"),
    answer: createForeignKey("Answer"),
    action_type: {
        required: true,
        type: Number,
        enum: [1, 0]
    }
});

const Action = mongoose.model("AnswerAction", questionActionSchema);

export {
    Action
}