import { Router } from 'express';
import { listarGeneros, buscarGeneroPorId } from '../controllers/generosController.js';

const router = Router();

router.get('/generos', listarGeneros);
router.get('/generos/:id', buscarGeneroPorId);

export default router;