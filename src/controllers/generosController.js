// Get Gêneros
import { generos } from '../data/generos.js';

export function listarGeneros (req, res) {
  res.json(generos);
};

export function buscarGeneroPorId (req, res) {
  const id = parseInt(req.params.id);
  const genero = generos.find(g => g.id === id);
  if(genero) {
    return res.json(genero);
  } else{
    return res.status(404).json({ error: "Gênero não encontrado"});
  }
};