import { Schema, model } from "mongoose"
import { createForeignKey } from "../utils/db";

const questionActionSchema = new Schema({
    user: createForeignKey("User"),
    answer: createForeignKey("Answer"),
    action_type: {
        required: true,
        type: Number,
        enum: [1, 0]
    }
});

const Action = model("AnswerAction", questionActionSchema);

export {
    Action
}