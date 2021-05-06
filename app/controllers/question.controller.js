import { Question, validate } from "../models/question.model.js";

class QuestionController {
    async get_all(req, res) {
        try {
            const questions = await Question.find();
            return res.send(questions);
        } catch (e) {
            return res.status(500).send(e);
        }
    }
}

export default new QuestionController();
