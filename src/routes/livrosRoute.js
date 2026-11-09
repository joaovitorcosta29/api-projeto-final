import { Router } from 'express';
import { listarLivros, buscarLivroPorId } from '../controllers/livrosController.js';

const router = Router();

router.get('/livros', listarLivros);
router.get('/livros/:id', buscarLivroPorId);

export default router;