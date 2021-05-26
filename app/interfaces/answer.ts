import mongoose from "mongoose";

export interface Answer {
    _id?: mongoose.Types.ObjectId
    body: string,
    user_id?: mongoose.Types.ObjectId
    question_id: mongoose.Types.ObjectId,
    image?: string,
}