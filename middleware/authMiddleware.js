import jwt from 'jsonwebtoken'
import Veterinario from '../models/Veterinario.js';


const checkAuth = async(req, res, next) => {
    try {
        const token = req.headers.authorization;

        if(!token || !token.startsWith('Bearer')){
            const error = new Error('No token provided');
            return res.status(401).json({
                message: error.message
            });
            
        }
        
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.veterinary = await Veterinario.findById(decoded.id);

        next();


    } catch (error) {
        res.status(403).json({
            message: 'Token is not valid'
        });
    }

}



export default checkAuth;