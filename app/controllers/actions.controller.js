import {Question} from "../models/question.model.js";
import {Action as QuestionAction} from "../models/question.action.model.js";
import {Action as AnswerAction} from "../models/answer.action.model.js";
import {createMessage} from "../utils/functions.js";
import {Answer} from "../models/answer.model.js";

class ActionsController {

    async handle_question_action(req, res) {
        try {
            const question = await Question.findById(req.params.id)
            if (question) {
                let action = await QuestionAction.findOne({question: req.params.id, user: req.user._id})
                if (action) { // delete vote
                    let body = await QuestionAction.findByIdAndDelete(action._id);
                    return res.status(200).send(createMessage("Success", "Successfully Deleted your vote", body))
                } else { // upvote
                    const body = await (new QuestionAction({
                        question: req.params.id,
                        user: req.user._id,
                        action_type: req.params.action = "upvote" ? 1 : 0
                    })).save()
                    return res.status(200).send(createMessage("Success", "Successfully " + req.params.action, body))
                }
            } else return res.status(404).send({message: "Question not found"})
        } catch (e) {
            return res.status(500).send(error);
        }
    }

    async handle_answer_action(req, res) {
        try {
            const answer = await Answer.findById(req.params.id)
            if (answer) {
                let action = await AnswerAction.findOne({answer: req.params.id, user: req.user._id})
                if (action) { // delete vote
                    let body = await AnswerAction.findByIdAndDelete(action._id);
                    return res.status(200).send(createMessage("Success", "Successfully Deleted your vote", body))
                } else { // upvote
                    const body = await (new AnswerAction({
                        answer: req.params.id,
                        user: req.user._id,
                        action_type: req.params.action = "upvote" ? 1 : 0
                    })).save()
                    return res.status(200).send(createMessage("Success", "Successfully " + req.params.action, body))
                }
            } else return res.status(404).send({message: "Answer not found"})
        } catch (e) {
            return res.status(500).send(error);
        }
    }
}

export default new ActionsController();