import { Schema, model } from "mongoose";
import Validator from "../config/validator";
import { createForeignKey } from "../utils/db";
import { Comment } from "../interfaces/comment";

const commentSchema = new Schema({
    user_id: createForeignKey("User"),
    answer_id: createForeignKey("Answer"),
    body: {required: true, type: String, minlength: 10},
});

const Comment = model("Comment", commentSchema);

const validate = (data: Comment) => {
    const rules = {
        answer_id: "required|exists:Answer",
        body: "required|string|min:10",
    };

    return new Validator(data, rules);
};

export {Comment, validate};
