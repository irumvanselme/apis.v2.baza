import mongoose from "mongoose";
import Validator from "validatorjs";

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
    topic_ids: [getForegeinKey("Topic")],
    tag_ids: [getForegeinKey("Tag")],
    answers: [getForegeinKey("Answer")],
    perfect_answer_id: getForegeinKey("Answer"),
});

const Question = mongoose.model("Question", questionSchema);

const validate = (data) => {
    const rules = {
        name: "string|required|min:4",
        description: "string|min:10",
    };

    return new Validator(data, rules);
};

const getForegeinKey = (model) => ({
    type: mongoose.Schema.Types.ObjectId,
    ref: model,
    required: true,
});

export { Question, validate };
