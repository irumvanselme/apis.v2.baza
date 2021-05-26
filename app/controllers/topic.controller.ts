import { Topic, validate } from "../models/topic.model.js";
import express from "express";

class TopicController {
    async get_all(req: express.Request, res: express.Response) {
        try {
            const topics = await Topic.find();
            return res.send(topics);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async get_one(req: express.Request, res: express.Response) {
        try {
            const topic = await Topic.findById(req.params.id);
            if (!topic)
                return res.status(404).send({ message: "Topic not found" });
            return res.send(topic);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async create(req: express.Request, res: express.Response) {
        try {
            const valid = validate(req.body);

            valid.fails(function () {
                return res.status(400).send(valid.errors.all());
            });

            let topic = new Topic(req.body);
            let newTopic = await topic.save();

            if (newTopic) return res.send(newTopic);
            return res
                .status(400)
                .send({ message: "Failed to create a new topic" });
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async edit(req: express.Request, res: express.Response) {
        try {
            const valid = validate(req.body);
            if (valid.fails(undefined))
                return res.status(400).send(valid.errors.all());

            const updatedTopic = await Topic.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedTopic)
                return res
                    .status(500)
                    .send({ message: "Failed to update the topic " });
            return res.send(updatedTopic);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async delete(req: express.Request, res: express.Response) {
        try {
            const deletedTopic = await Topic.findByIdAndDelete(req.params.id);
            if (!deletedTopic)
                return res
                    .status(500)
                    .send({ message: "Failed to delete the topic " });
            return res.send(deletedTopic);
        } catch (e) {
            return res.status(500).send(e);
        }
    }
}

export default new TopicController();
