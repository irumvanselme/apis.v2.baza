import mongoose from "mongoose";
import Validator from "validatorjs";

const topicSchema = new mongoose.Schema({
    name: { required: true, type: String, minlength: 4 },
    description: { type: String, minlength: 10 },
});

const Topic = mongoose.model("Topic", topicSchema);

const validate = (data) => {
    const rules = {
        name: "string|required|min:4",
        description: "string|min:10",
    };

    return new Validator(data, rules);
};

export { Topic, validate };
