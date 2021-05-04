import mongoose from "mongoose";
import Validator from "validatorjs";
import { createForegeinKey } from "../utils/db.js";

const answerSchema = new mongoose.Schema({
    user_id: createForegeinKey("User"),
    body: { required: true, type: String, minlength: 10 },
    image: { type: String, minlength: 5 },
});

const Answer = mongoose.model("Answer", answerSchema);

const validate = (data) => {
    const rules = {
        name: "string|required|min:4",
        description: "string|min:10",
    };

    return new Validator(data, rules);
};

export { Answer, validate };
