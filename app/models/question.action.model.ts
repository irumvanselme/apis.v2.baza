import { model, Schema } from "mongoose"
import { createForeignKey } from "../utils/db";

const questionActionSchema = new Schema({
    user: createForeignKey("User"),
    question: createForeignKey("Question"),
    action_type: {
        required: true,
        type: Number,
        enum: [1, 0]
    }
});

const Action = model("QuestionAction", questionActionSchema);

export {
    Action
}