import { Question } from "../models/question.model.js"
import {Answer, validate} from "../models/answer.model.js"

class AnswersController{
    async get_all(req, res){
        try{
            const question = await Question.findById(req.params.question);
            let answers = await question.answers()
            return res.send(answers)
        }catch (e) {
            return res.status(500).send(e.message)
        }
    }

    async create(req, res){
        try{
            req.body.question_id = req.params.question;
            req.body.user_id = req.user._id;
            
            const valid = validate(req.body);

            async function passes(){
                let answer = await (new Answer(req.body)).save();
                return res.send(answer);
            }

            function fails(){
                return res.send(valid.errors.all())
            }

            return valid.checkAsync(passes, fails)
        }catch (e) {
            return res.status(500).send(e.message)
        }
    }

    async show(){

    }

    async update(){

    }

    async delete(){

    }
}

export default new AnswersController();