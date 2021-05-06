import mongoose from "mongoose";
import Validator from "../config/validator.js";
import { createForegeinKey } from "../utils/db.js";

const questionSchema = new mongoose.Schema({
    user_id: createForegeinKey("User"),
    title: {
        required: true,
        type: String,
        minlength: 4,
    },
    body: {
        required: true,
        type: String,
        minlength: 10,
    },
    image: {
        type: String,
        minlength: 5,
    },
    topic_ids: [createForegeinKey("Topic")],
    tag_ids: [createForegeinKey("Tag")],
    answer_ids: [createForegeinKey("Answer")],
    action_ids: [createForegeinKey("Action")],
    perfect_answer_id: createForegeinKey("Answer", false),
});

const Question = mongoose.model("Question", questionSchema);

const validate = (data) => {
    const rules = {
        title: "required|string|min:4",
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
        perfect_answer_id: "required|exists:Answer",
    };

    return new Validator(data, rules);
};

export { Question, validate };
