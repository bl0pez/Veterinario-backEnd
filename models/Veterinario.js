import pkg from 'mongoose';
const { Schema, model } = pkg;

import bcrypt from 'bcryptjs';
import generateId from '../helpers/generate.js';

const VeterinarioSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        message: 'El nombre es obligatorio'
    },
    password: {
        type: String,
        required: true,
        trim: true,
        message: 'La contraseña es obligatoria'
    },
    email: {
        type: String,
        required: true,
        unique: true,
        email: true,
        trim: true,
        message: 'El email es obligatorio'
    },
    phone: {
        type: String,
        default: null,
        trim: true
    },
    website: {
        type: String,
        default: null,
        trim: true
    },
    token: {
        type: String,
        default: generateId(),
    },
    veryfied: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true, //TODO: createdAT, updateAT
        versionKey: false,
    }
);

VeterinarioSchema.pre('save', async function (next) {

    // Vertifica si el password ya fue modificado
    if(!this.isModified('password')){
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

VeterinarioSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

VeterinarioSchema.methods.toJSON = function(){
    const {token, password, ...veterinario} = this.toObject();
    return veterinario;
}

export default model('Veterinario', VeterinarioSchema);