import mongoose from 'mongoose';
import validatorjs from 'validatorjs';
const UserSchema = new mongoose.Schema({
    first_name:{
        type:String,
        minLength:[3,'The firstname should be atleast 3 characters'],
        required:true
    },
    last_name:{
        type:String,
        minLength:[3,'The lastname should be atleast 3 characters']
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    username:{
        type:String,
        unique:[true,'The username should be unique'],
        minLength:[4,'The username should be atleast 4 characters'],
        maxLength:[10,'The username should not go beyond 10 characters']
    },
    password:{
        type:String,
        minLength:[5,'The password should be atleast 5 characters'],
        
    },
    role_id:{
        type: mongoose.Types.ObjectId,
        required:true
    }
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
})

UserSchema.virtual('role',{
        ref:"Role",
        localField:"role_id",
        foreignField:"_id",
        justOne:true
})

const User = mongoose.model('User',UserSchema);
export {User}