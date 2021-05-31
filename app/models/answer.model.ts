import { Schema, model} from "mongoose";
import Validator from "../config/validator";
import { createForeignKey } from "../utils/db";
import { Answer } from "../interfaces/answer";

const answerSchema = new Schema({
    user_id: createForeignKey("User"),
    question_id: createForeignKey("Question"),
    body: { required: true, type: String, minlength: 10 },
    image: { type: String, minlength: 5 },
});

const Answer = model("Answer", answerSchema);

const validate = (data: Answer) => {
    const rules = {
        body: "required|string|min:4",
        question_id: "required|exists:Question",
        image: "string|url",
    };

    return new Validator(data, rules);
};

export { Answer, validate };
