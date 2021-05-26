import {Role} from '../models/role.model';
import {Request,Response} from 'express';
import { User } from '../models/user.model';

export class RoleController{

    async getAll(req:Request, res:Response){
        try{
            let roles = await Role.find();
            return res.send(roles);
        }catch(e){return res.send(e).status(500)}
    }

    async getOne(req:Request, res:Response){
        try{
            let user = await User.findById(req.params.id)
            if(!user) return res.send({message:'Role not found'}).status(404);
            else return res.send(user);
        }catch(e){return res.send(e).status(500)}
    }
    async create(req:Request, res:Response){

    }
    async update(req:Request, res:Response){

    }
}