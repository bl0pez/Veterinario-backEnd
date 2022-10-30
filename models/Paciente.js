import pkg from 'mongoose';
const { Schema, model } = pkg;

const PacienteSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        message: 'El nombre es obligatorio'
    },
    owner: {
        type: String,
        required: true,
        message: 'El nombre del dueño es obligatorio'
    },
    email: {
        type: String,
        email: true,
        required: true,
        message: 'El email es obligatorio'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    symptom: {
        type: String,
        required: true,
        message: 'Los síntomas son obligatorios'
    },
    veterinary: {
        type: Schema.Types.ObjectId,
        ref: 'Veterinario',
        required: true
    },
}
    , {
        timestamps: true, //TODO: createdAT, updateAT
        versionKey: false,
    }
);


export default model('Paciente', PacienteSchema);