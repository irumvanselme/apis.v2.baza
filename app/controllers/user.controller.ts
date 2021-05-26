import {User} from '../models/user.model';
import {Request,Response} from 'express';
    
export class UserController{
    async getAll(req:Request, res:Response){
        try{
            let users = await User.find();
            return res.send(users).status(201);
        }catch(e){ return res.send(e).status(500);}
    }

    async getOne(req:Request, res:Response){
        try{
            let user = await User.findById(req.params.id);
            if(user) return res.send(user).status(201);
            else return res.send({message:'User not found'}).status(404);
        }catch(e){ return res.send(e).status(500)}
    }
    async create(req:Request,res:Response){
        try{    
            let User = req.body
        }catch(e){return res.send(e)}
    }

}
