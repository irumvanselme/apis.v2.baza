import {Question, validate} from "../models/question.model.js";
import express from "express";

class QuestionController {
    async get_all(req: express.Request, res: express.Response) {
        try {
            const questions = await Question.find();
            return res.send(questions);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async feed(req: express.Request, res: express.Response){
        try {
            const questions = await Question.find();
            return res.send(questions);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async create(req: express.Request, res: express.Response) {
        try {
            const valid = validate(req.body);

            async function passes() {
                const question = await new Question({
                    user_id: req.user._id,
                    ...valid.input,
                }).save()

                return res.send(question)
            }

            async function fails() {
                return res.send(valid.errors.all())
            }

            valid.checkAsync(passes, fails)
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    async get_one(req: express.Request, res: express.Response) {
        try {
            const question = await Question.findById(req.params.id);
            if (!question)
                return res.status(404).send({ message: "Question Not found " });
            return res.send(question);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async update(req: express.Request, res: express.Response) {
        try {
            const valid = validate(req.body);
            valid.fails(function () {
                return res.status(400).send(valid.errors.all());
            });

            const question = await Question.findByIdAndUpdate(
                req.params.id,
                valid.input,
                { new: true }
            );
            return res.send(question);
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    async delete(req: express.Request, res: express.Response) {
        try {
            return res.send(await Question.findByIdAndDelete(req.params.id));
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

export default new QuestionController();