// Usuários
export const usuarios = [
  { id: 1, nome: "João" , email: "joao@gmail.com", senhaHash: "12345678", criadoEm: "2026-11-09"},
  { id: 2, nome: "Maria" , email: "maria@gmail.com", senhaHash: "87654321", criadoEm: "2026-11-09"},
  { id: 3, nome: "Enzo" , email: "enzo@gmail.com", senhaHash: "11223344", criadoEm: "2026-11-09"},
  { id: 4, nome: "Isac" , email: "isac@gmail.com", senhaHash: "99887766", criadoEm: "2026-11-09"},
  { id: 5, nome: "Ana" , email: "ana@gmail.com", senhaHash: "55667788", criadoEm: "2026-11-09"},
];

app.get('/api/usuarios', (req, res) => {
  res.json(usuarios);
});

app.get('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  if(usuario) {
    return res.json(usuario);
  } else{
    return res.status(404).json({ error: "Usuário não encontrado"});
  }
})