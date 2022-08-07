import { Router } from 'express';
import { post_paciente, delete_paciente, get_paciente, get_pacientes, put_paciente } from '../controllers/paciente.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = Router();


router.route('/')
    .post(checkAuth ,post_paciente)
    .get(checkAuth, get_pacientes);

router.route('/:id')
    .get(checkAuth, get_paciente)
    .put(checkAuth, put_paciente)
    .delete(checkAuth, delete_paciente);


export default router;

