import emailRecoveryPassword from "../helpers/emailRecoveryPassword.js";
import emailRegister from "../helpers/emailRegister.js";
import generateId from "../helpers/generate.js";
import generateJWT from "../helpers/generateJWT.js";
import Veterinario  from "../models/Veterinario.js";

const register = async (req, res) => {

    const {email, password, name} = req.body;

    const emailExist = await Veterinario.findOne({email});

    if(emailExist){
        const error = new Error('Email already exist');
        return res.status(400).json({
           message: error.message
        });
    }

    
    try {

        const user = await Veterinario.create({ email, password, name });
        emailRegister({
            name,
            email,
            token: user.token,
        })
    
        res.json({
            message: "User created successfully",
        })
        
    } catch (error) {
        console.log('ERROR_REGISTER', error.message);
    }
}

const login = async (req, res) => {

    const {email, password} = req.body;

    try {
        const user = await Veterinario.findOne({email});

        if(!user){
            const error = new Error('Credenciales incorrectas');
            return res.status(404).json({
               message: error.message
            });
        }
    
    
        if(!user.veryfied){
            const error = new Error('Verifica tu email para iniciar sesión');
            return res.status(403).json({
               message: error.message
            });
        }
    
        const isPasswordValid = await user.comparePassword(password);
    
        if(!isPasswordValid){
            const error = new Error('Password incorrect');
            return res.status(403).json({
               message: error.message
            });
        }
    
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id),
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }

}

const confirmEmail = async (req, res) => {
    const {token} = req.params;

    
    try {
        const confirmEmail = await Veterinario.findOneAndUpdate({token}, {veryfied: true, token: null} );
    
        if(!confirmEmail){
            const error = new Error('Invalid token');
            return res.status(400).json({
               message: error.message
            });
        }

        res.json({
            message: "Email verified successfully",
        })
        
    } catch (error) {
        console.log('ERROR_CONFIRM_EMAIL', error.message);
    }

}

const recoveryPassword = async (req, res) => {
    const {email} = req.body;

    const existEmail = await Veterinario.findOne({email});
    
    if(!existEmail){
        const error = new Error('Email no encontrado');
        return res.status(400).json({
           message: error.message
        });
    }

    
    
    
    try {
        
        existEmail.token = generateId();
        await existEmail.save();
        
        //Enviar email para recuperar contraseña
        emailRecoveryPassword({
            name: existEmail.name,
            email: existEmail.email,
            token: existEmail.token,
        });
        
        res.json({
            message: "Email para recuperar contraseña enviado",
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }

}

const checkToken = async (req, res) => {
    const { token } = req.params;

    const existToken = await Veterinario.findOne({token});

    if(!existToken){
        const error = new Error('Invalid token');
        return res.status(400).json({
           message: error.message
        });
    }

    res.json({
        message: "Token valid",
    });

}

const newPassword = async(req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const veterinario = await Veterinario.findOne({token});

    if(!veterinario){
        const error = new Error('error token');
        return res.status(400).json({
           message: error.message
        });
    }

    try {
        
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();

        res.json({
            message: "Password cambiada correctamente",
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }

}

export {
    register,
    login,
    confirmEmail,
    recoveryPassword,
    checkToken,
    newPassword,
}