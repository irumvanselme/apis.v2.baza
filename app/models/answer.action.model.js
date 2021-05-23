import mongoose from "mongoose"
import {createForeignKey} from "../utils/db";

const questionActionSchema = new mongoose.Schema({
    user: createForeignKey("User"),
    answer: createForeignKey("Answer"),
    action_type: {
        required: true,
        type: number,
        enum: [1, 0]
    }
});

const Action = mongoose.model("QuestionAction", questionActionSchema);

export {
    Action
}