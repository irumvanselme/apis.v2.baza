import { Answer, validate } from "../models/answer.model.js";
import express from "express";

class AnswersController {
    async get_all(req: express.Request, res: express.Response) {
        try {
            const answers = await Answer.find({question_id: req.params.question})
            return res.send(answers)
        } catch (e) {
            return res.status(500).send(e.message)
        }
    }

    async create(req: express.Request, res: express.Response) {
        try {
            req.body.question_id = req.params.question;
            req.body.user_id = req.user._id;

            const valid = validate(req.body);

            async function passes() {
                let answer = await (new Answer(req.body)).save();
                return res.send(answer);
            }

            function fails() {
                return res.send(valid.errors.all())
            }

            valid.checkAsync(passes, fails)
        } catch (e) {
            return res.status(500).send(e.message)
        }
    }

    async show(req: express.Request, res: express.Response) {
        try {
            const answer = await Answer.findById(req.params.id);
            if (!answer)
                return res.status(404).send({message: "Answer not found"});
            return res.send(answer);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async update(req: express.Request, res: express.Response) {
        try {
            req.body.user_id = req.user._id;

            const valid = validate(req.body);

            async function passes() {
                let answer = await Answer.findByIdAndUpdate(req.params.id, req.body, { new: true });
                return res.send(answer);
            }

            function fails() {
                return res.send(valid.errors.all())
            }

            return valid.checkAsync(passes, fails)
        } catch (e) {
            return res.status(500).send(e.message)
        }
    }

    async delete(req: express.Request, res: express.Response) {
        try {
            const deletedAnswer = await Answer.findByIdAndDelete(req.params.id);
            if (!deletedAnswer)
                return res
                    .status(500)
                    .send({message: "Failed to delete the topi "});
            return res.send(deletedAnswer);
        } catch (e) {
            return res.status(500).send(e);
        }
    }
}

export default new AnswersController();