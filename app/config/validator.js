import mongoose from "mongoose";
import Validator from "validatorjs";

Validator.registerAsync(
    "unique",
    async function (username, attribute, req, passes) {
        const Model = mongoose.model(attribute);

        let test = {};
        test[req] = username;

        let data = await Model.findOne(test);
        if (data) return passes(false, `The  ${req} is already taken`);
        else return passes();
    }
);

Validator.registerAsync(
    "exists",
    async function (value, attribute, req, passes) {
        const Model = mongoose.model(attribute);

        let test = {};
        test[formatAttribute(req)] = value;
        console.log(test);

        let data = await Model.findOne(test);
        if (!data) passes(false, `The  ${req} is not available`);
        else passes();
    }
);

Validator.register("object_id", function (value, requirement, attribute) {
    return mongoose.Types.ObjectId.isValid(value);
});

function formatAttribute(data) {
    if (data.includes("_id")) return "_id";
    else return data;
}

export default Validator;
