import { Comment, validate } from "../models/comment.model.js"
import express from "express";

class CommentsController {
    async get_all(req: express.Request, res: express.Response) {
        try {
            let comments = await Comment.find({answer_id: req.params.answer})
            return res.send(comments)
        } catch (e) {
            return res.status(500).send(e.message)
        }
    }

    async create(req: express.Request, res: express.Response) {
        try {
            req.body.answer_id = req.params.answer;
            req.body.user_id = req.user._id;

            const valid = validate(req.body);

            async function passes() {
                let comment = await (new Comment(req.body)).save();
                return res.send(comment);
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
            const comment = await Comment.findById(req.params.id);
            if (!comment)
                return res.status(404).send({message: "Answer not found"});
            return res.send(comment);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async update(req: express.Request, res: express.Response) {
        try {
            req.body.user_id = req.user._id;

            const valid = validate(req.body);

            async function passes() {
                let comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
                return res.send(comment);
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