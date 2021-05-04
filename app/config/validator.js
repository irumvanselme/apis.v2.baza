import mongoose from "mongoose";
import Validator from "validatorjs";

Validator.registerAsync(
    "unique",
    async function (username, attribute, req, passes) {
        const Model = mongoose.model(attribute);

        let test = {};
        test[req] = username;
        console.log(test);

        let data = await Model.findOne(test);
        if (data) passes(false, `The  ${req} is already taken`);
        else passes();
    }
);

Validator.registerAsync(
    "exists",
    async function (username, attribute, req, passes) {
        const Model = mongoose.model(attribute);

        let test = {};
        test[req] = username;
        console.log(test);

        let data = await Model.findOne(test);
        if (!data) passes(false, `The  ${req} is not available`);
        else passes();
    }
);

export default Validator;
