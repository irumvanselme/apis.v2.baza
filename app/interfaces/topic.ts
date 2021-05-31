import { Types } from "mongoose";

export interface Topic {
    _id?: Types.ObjectId,
    name: string,
    description: string
}