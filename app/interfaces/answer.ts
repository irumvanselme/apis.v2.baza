import { Types } from "mongoose";

export interface Answer {
    _id?: Types.ObjectId
    body: string,
    user_id?: Types.ObjectId
    question_id: Types.ObjectId,
    image?: string,
}