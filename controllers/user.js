import Veterinario from "../models/Veterinario.js";

const profile = (req, res) => {

    const { veterinary } = req;
    res.json(
        veterinary
    );
}


const put_profile = async (req, res) => {

    try {
        const { id } = req.params;
        const { name, email, phone, website } = req.body;

        const veterinario = await Veterinario.findById(id);

        if (!veterinario) {
            const error = new Error("Veterinario no encontrado");
            return res.status(404).json({ message: error.message });
        }

        if (veterinario.email !== email) {
            const existeEmail = await Veterinario.findOne({ email });
            if (existeEmail) {
                const error = new Error("Email no disponible");
                return res.status(400).json({ message: error.message });
            }
        }

        veterinario.name = name;
        veterinario.email = email;
        veterinario.phone = phone;
        veterinario.website = website;

        const veterinarioActualizado = await veterinario.save();

        res.json({
            message: "Veterinario actualizado",
            veterinarioActualizado
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const put_password = async (req, res) => {
    
    try {
        const { password, newPassword } = req.body;
        const { _id } = req.veterinary;

        const veterinario = await Veterinario.findById(_id);

        const validPassword = await veterinario.comparePassword(password);

        if (!validPassword) {
            const error = new Error("Contraseña actual incorrecta");
            return res.status(400).json({ message: error.message });
        }

        veterinario.password = newPassword;
        const passwordUpdate = await veterinario.save();

        res.json({
            message: "Contraseña actualizada",
        });


    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}


export {
    profile,
    put_profile,
    put_password
}