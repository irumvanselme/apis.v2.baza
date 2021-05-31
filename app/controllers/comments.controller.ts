import { Comment, validate } from "../models/comment.model"
import { Request, Response } from "express";
import { RequestWithUser } from "../interfaces/requests/RequestWithUser";

class CommentsController {
    async get_all(req: Request, res: Response) {
        try {
            let comments = await Comment.find({ answer_id: req.params.answer })
            return res.send(comments)
        } catch (e) {
            return res.status(500).send(e.message)
        }
    }

    async create(req: RequestWithUser, res: Response) {
        try {
            req.body.answer_id = req.params.answer;
            req.body.user_id = req.user._id;

            const valid = validate(req.body);

            const passes = async function() {
                let comment = await (new Comment(req.body)).save();
                return res.send(comment);
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
            const comment = await Comment.findById(req.params.id);
            if (!comment)
                return res.status(404).send({message: "Answer not found"});
            return res.send(comment);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async update(req: RequestWithUser, res: Response) {
        try {
            req.body.user_id = req.user._id;

            const valid = validate(req.body);

            const passes = async function () {
                let comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
                return res.send(comment);
            }

            const fails = function () {
                return res.send(valid.errors.all())
            }

            return valid.checkAsync(passes, fails)
        } catch (e) {
            return res.status(500).send(e.message)
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const deletedComment = await Comment.findByIdAndDelete(req.params.id);
            if (!deletedComment)
                return res
                    .status(500)
                    .send({message: "Failed to delete the topi "});
            return res.send(deletedComment);
        } catch (e) {
            return res.status(500).send(e);
        }
    }
}

export default new CommentsController();