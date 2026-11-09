// Get Usuários
import { usuarios } from '../data/usuarios.js';

export function listarUsuarios (req, res) {
  res.json(usuarios);
};

export function buscarUsuarioPorId (req, res) {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  if(usuario) {
    return res.json(usuario);
  } else{
    return res.status(404).json({ error: "Usuário não encontrado"});
  }
};