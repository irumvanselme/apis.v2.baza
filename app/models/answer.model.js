import mongoose from "mongoose";
import Validator from "../config/validator.js";
import { createForeignKey } from "../utils/db.js";

const answerSchema = new mongoose.Schema({
    user_id: createForeignKey("User"),
    question_id: createForeignKey("Question"),
    body: { required: true, type: String, minlength: 10 },
    image: { type: String, minlength: 5 },
});

const Answer = mongoose.model("Answer", answerSchema);

const validate = (data) => {
    const rules = {
        name: "string|required|min:4",
        question_id: "required|exists:Question",
        description: "string|min:10",
        image: "string|url|min:5",
    };

    return new Validator(data, rules);
};

export { Answer, validate };
