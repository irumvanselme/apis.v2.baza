import { Schema, model } from "mongoose";
import Validator from "../config/validator";
import { Topic } from "../interfaces/topic";

const topicSchema = new Schema({
    name: { required: true, type: String, minlength: 4 },
    description: { type: String, minlength: 10 },
});

const Topic = model("Topic", topicSchema);

const validate = (data: Topic) => {
    const rules = {
        name: "string|required|min:4|exists:Topic",
        description: "string|min:10",
    };

    return new Validator(data, rules);
};

export { Topic, validate };
