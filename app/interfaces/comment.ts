import { Types } from "mongoose";

export interface Comment {
    _id?: Types.ObjectId
    body: string,
    user_id?: Types.ObjectId
    question_id: Types.ObjectId,
}