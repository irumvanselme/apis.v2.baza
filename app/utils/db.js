import mongoose from "mongoose";

export const createForegeinKey = (model, required = true) => ({
    type: mongoose.Schema.Types.ObjectId,
    ref: model,
    required: required,
});
