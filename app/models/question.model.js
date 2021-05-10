import mongoose from "mongoose";
import Validator from "../config/validator.js";
import { createForeignKey } from "../utils/db.js";
import {Answer} from "./answer.model.js";

const questionSchema = new mongoose.Schema({
    user_id: createForeignKey("User"),
    title: {
        required: true,
        type: String,
        minlength: 4,
    },
    body: {
        type: String,
        minlength: 10,
    },
    image: {
        type: String,
        minlength: 5,
    },
    topic_ids: [createForeignKey("Topic")],
    tag_ids: [createForeignKey("Tag")],
    action_ids: [createForeignKey("Action")],
    perfect_answer_id: createForeignKey("Answer", false),
});

questionSchema.methods.answers = function () {
    return Answer.find({question_id: this._id});
}

const Question = mongoose.model("Question", questionSchema);

const validate = (data) => {
    const rules = {
        title: "required|string|min:4|unique:Question",
        body: "string|min:10",
        image: "string|min:5",
        topic_ids: "array",
        "topic_ids.*": "required|exists:Topic",
        tag_ids: "array",
        "tag_ids.*": "required|exists:Tag",
        answer_ids: "array",
        "answer_ids.*": "required|exists:Answer",
        action_ids: "array",
        "action_ids.*": "required|exists:Answer",
        perfect_answer_id: "exists:Answer",
    };

    return new Validator(data, rules);
};

export { Question, validate };
