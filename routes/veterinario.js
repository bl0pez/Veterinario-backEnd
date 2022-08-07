import { Router } from 'express';
import { confirmEmail, login, recoveryPassword, register, checkToken, newPassword } from '../controllers/auth.js';
import { profile, put_password, put_profile } from '../controllers/user.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = Router();



//rutas de autenticacion
router.post('/login', login);

router.post('/register', register);

router.post('/recovery-password', recoveryPassword);
router.route('/recovery-password/:token').get(checkToken).post(newPassword);

router.get('/confirm/:token', confirmEmail); 

//rutas de usuario
router.get('/profile', checkAuth , profile);
router.put('/profile/:id', checkAuth, put_profile);
router.put('/password', checkAuth, put_password);



export default router;
