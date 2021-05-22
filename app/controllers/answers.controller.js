import { Question } from "../models/question.model.js"
import { Answer, validate } from "../models/answer.model.js";

class AnswersController {
    async get_all(req, res) {
        try {
            const question = await Question.findById(req.params.question);
            let answers = await question.answers()
            return res.send(answers)
        } catch (e) {
            return res.status(500).send(e.message)
        }
    }

    async create(req, res) {
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

    async show(req, res) {
        try {
            const answer = await Answer.findById(req.params.id);
            if (!answer)
                return res.status(404).send({message: "Answer not found"});
            return res.send(answer);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async update(req, res) {
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

    async delete(req, res) {
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