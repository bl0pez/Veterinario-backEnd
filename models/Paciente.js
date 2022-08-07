import pkg from 'mongoose';
const { Schema, model } = pkg;

const PacienteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    email: {
        type: String,
        email: true,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    symptom: {
        type: String,
        required: true
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