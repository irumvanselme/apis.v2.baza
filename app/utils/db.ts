import mongoose from "mongoose";

/**
 * @param model The Database Model Name
 * @param required Is this field required or not
 * */
export const createForeignKey = (model: string, required = true) => ({
    type: mongoose.Schema.Types.ObjectId,
    ref: model,
    required: required,
});