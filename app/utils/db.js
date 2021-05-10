import mongoose from "mongoose";

export const createForeignKey = (model, required = true) => ({
    type: mongoose.Schema.Types.ObjectId,
    ref: model,
    required: required,
});
