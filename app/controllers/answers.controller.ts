import { Answer, validate } from "../models/answer.model.js";
import { Request, Response } from "express";
import { RequestWithUser } from "../interfaces/requests/RequestWithUser";

class AnswersController {
    async get_all(req: Request, res: Response) {
        try {
            const answers = await Answer.find({question_id: req.params.question})
            return res.send(answers)
        } catch (e) {
            return res.status(500).send(e.message)
        }
    }

    async create(req: RequestWithUser, res: Response) {
        try {
            req.body.question_id = req.params.question;
            req.body.user_id = req.user._id;

            const valid = validate(req.body);

            const passes = async function () {
                let answer = await (new Answer(req.body)).save();
                return res.send(answer);
            }

            const fails = function () {
                return res.send(valid.errors.all())
            }

            valid.checkAsync(passes, fails)
        } catch (e) {
            return res.status(500).send(e.message)
        }
    }

    async show(req: Request, res: Response) {
        try {
            const answer = await Answer.findById(req.params.id);
            if (!answer)
                return res.status(404).send({message: "Answer not found"});
            return res.send(answer);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async update(req: RequestWithUser, res: Response) {
        try {
            req.body.user_id = req.user._id;

            const valid = validate(req.body);

            const passes = async function (){
                let answer = await Answer.findByIdAndUpdate(req.params.id, req.body, { new: true });
                return res.send(answer);
            }

            const fails = function(){
                return res.send(valid.errors.all())
            }

            return valid.checkAsync(passes, fails)
        } catch (e) {
            return res.status(500).send(e.message)
        }
    }

    async delete(req: Request, res: Response) {
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