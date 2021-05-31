import {Question, validate} from "../models/question.model.js";
import { Request, Response } from "express";
import { RequestWithUser } from "../interfaces/requests/RequestWithUser";

class QuestionController {
    async get_all(req: Request, res: Response) {
        try {
            const questions = await Question.find();
            return res.send(questions);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async feed(req: Request, res: Response){
        try {
            const questions = await Question.find();
            return res.send(questions);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async create(req: RequestWithUser, res: Response) {
        try {
            const valid = validate(req.body);

            const passes = async function () {
                const question = await new Question({
                    user_id: req.user._id,
                    ...valid.input,
                }).save()

                return res.send(question)
            }

            const fails = function () {
                return res.send(valid.errors.all())
            }

            valid.checkAsync(passes, fails)
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    async get_one(req: Request, res: Response) {
        try {
            const question = await Question.findById(req.params.id);
            if (!question)
                return res.status(404).send({ message: "Question Not found " });
            return res.send(question);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async update(req: Request, res: Response) {
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

    async delete(req: Request, res: Response) {
        try {
            return res.send(await Question.findByIdAndDelete(req.params.id));
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

export default new QuestionController();
