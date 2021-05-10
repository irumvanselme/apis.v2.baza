import mongoose from "mongoose";
import Validator from "../config/validator.js";
import { createForeignKey } from "../utils/db.js";

const commentSchema = new mongoose.Schema({
    user_id: createForeignKey("User"),
    body: { required: true, type: String, minlength: 10 },
});

const Comment = mongoose.model("Comment", commentSchema);

const validate = (data) => {
    const rules = {
        user_id: "required|exists:User",
        body: "required|string|min:10",
    };

    return new Validator(data, rules);
};

export { Comment, validate };
