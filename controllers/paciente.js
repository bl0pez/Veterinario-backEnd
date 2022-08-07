import Paciente from "../models/Paciente.js";


const post_paciente = async (req, res) => {    
    try {
        const { name, owner, email, date, symptom } = req.body;
        const { _id } = req.veterinary;
    
        const paciente = new Paciente({
            name, owner, email, date, symptom, veterinary: _id
        });

        const newPaciente = await paciente.save();

        res.json({
            message: "Paciente creado con éxito",
            newPaciente
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }

}

const get_pacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find().where('veterinary').equals(req.veterinary._id);

        res.json(
            pacientes
        )
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
        });
    }

}


const get_paciente = async (req, res) => {
    const { id } = req.params;

    try {
        const paciente = await Paciente.findById(id);


        if (paciente.veterinary._id.toString() !== req.veterinary._id.toString()) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }

        res.json({
            message: "Details of patient",
            patient
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
        });
    }

}

const put_paciente = async (req, res) => {
    const { id } = req.params;
    const { name, owner, email, date, symptom } = req.body;

    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({
            message: 'Patient not found'
        })
    }

    try {
        if (paciente.veterinary._id.toString() !== req.veterinary._id.toString()) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }

        paciente.name = name || paciente.name;
        paciente.owner = owner || paciente.owner;
        paciente.email = email || paciente.email;
        paciente.date = date || paciente.date;
        paciente.symptom = symptom || paciente.symptom;

        await paciente.save();

        res.json({
            message: "Patient updated successfully",
            paciente
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
        });
    }

}


const delete_paciente = async (req, res) => {
    const { id } = req.params;

    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({
            message: 'Patient not found'
        })
    }

    try {
        if (paciente.veterinary._id.toString() !== req.veterinary._id.toString()) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }

        await paciente.remove();
        res.json({
            message: "Patient deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
        });
    }
}


export {
    post_paciente,
    get_pacientes,
    get_paciente,
    put_paciente,
    delete_paciente,
}