// Gêneros
export const generos = [
  { id: 1, nome: 'Romance'},
  { id: 2, nome: 'Aventura'},
  { id: 3, nome: 'Fantasia'},
  { id: 4, nome: 'Terror'},
  { id: 5, nome: 'Comédia'},
  { id: 6, nome: 'Drama'},
  { id: 7, nome: 'Ficção Científica'},
  { id: 8, nome: 'Ação'},
];

app.get('/api/generos', (req, res) => {
  res.json(generos);
});

app.get('/api/generos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const genero = generos.find(g => g.id === id);
  if(genero) {
    return res.json(genero);
  } else{
    return res.status(404).json({ error: "Gênero não encontrado"});
  }
});