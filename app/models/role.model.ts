import mongoose from 'mongoose';
const RoleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    actions:{
        type:Array,
        default:['ask']
    }
})

const Role = mongoose.model('Role',RoleSchema);
export{Role}