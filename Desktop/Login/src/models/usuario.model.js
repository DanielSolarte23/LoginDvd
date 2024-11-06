import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    nombre:{
        type:String,
        required: true,
        trim: true
    },
    correo:{
        type:String,
        required: true,
        trim:true,
        unique: true
    },
    contraseña: {
        type: String,
        required: true,
        trim: true,
    }
})

export default mongoose.model('User', userShema);