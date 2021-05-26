import mongoose from "mongoose";

export interface Topic {
    _id?: mongoose.Types.ObjectId,
    name: string,
    description: string
}