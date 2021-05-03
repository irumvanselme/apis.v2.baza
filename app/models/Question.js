import mongoose from "mongoose";
import Validator from "validatorjs";
import { createForegeinKey } from "./../utils/db.js";

const questionSchema = new mongoose.Schema({
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
    answers: [createForegeinKey("Answer")],
    actions: [createForegeinKey("Action")],
    perfect_answer_id: createForegeinKey("Answer", false),
});

const Question = mongoose.model("Question", questionSchema);

const validate = (data) => {
    const rules = {
        name: "string|required|min:4",
        description: "string|min:10",
    };

    return new Validator(data, rules);
};

export { Question, validate };
