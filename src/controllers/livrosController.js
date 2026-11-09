// Get livros
import { livros } from '../data/livros.js';

export function listarLivros (req, res) {
  res.json(livros);
};

export function buscarLivroPorId (req, res) {
  const id = parseInt(req.params.id);
  const livro = livros.find(l => l.id === id);
  if(livro) {
    return res.json(livro);
  } else{
    return res.status(404).json({ error: "Livro não encontrado"});
  }
};