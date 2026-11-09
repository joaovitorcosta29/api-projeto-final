// app.js: monta a aplicação Express (rotas, middlewares).
// Quem liga o servidor é o server.js. Separar os dois facilita testes e o deploy.
import express from 'express';

const app = express();

// Permite receber JSON no corpo das requisições (usaremos no próximo encontro)
app.use(express.json());

// Rota de saúde: usada por serviços de nuvem para saber se a API está viva
app.get('/health', (req, res) => {
  res.json({ status: 'ok', horario: new Date().toISOString() });
});

// Rota raiz: apresenta a API
app.get('/', (req, res) => {
  res.json({
    nome: 'Aq vou colocar o nome.',
    versao: '0.1.0',
    rotas: ['GET /health'],
  });
});

// Usuários
const usuarios = [
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

// Gêneros
const generos = [
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

// Livros

const livros = [
  { id: 1, titulo: "Chainsaw Man", isbn: "9781421140258", ano: 2020, status: "disponivel", generoId: 7 , criadoEm: "2026-11-09"},
  { id: 2, titulo: "One Piece", isbn: "9781421140259", ano: 2021, status: "disponivel", generoId: 8 , criadoEm: "2026-11-09"},
  { id: 3, titulo: "Naruto", isbn: "9781421140260", ano: 2022, status: "disponivel", generoId: 8 , criadoEm: "2026-11-09"},
  { id: 4, titulo: "Attack on Titan", isbn: "9781421140261", ano: 2023, status: "disponivel", generoId: 8 , criadoEm: "2026-11-09"},
  { id: 5, titulo: "Harry Potter e a Pedra Filosofal", isbn: "9781421140262", ano: 2020, status: "disponivel", generoId: 8 , criadoEm: "2026-11-09"},
]

app.get('/api/livros', (req, res) => {
  res.json(livros);
});

app.get('/api/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const livro = livros.find(l => l.id === id);
  if(livro) {
    return res.json(livro);
  } else{
    return res.status(404).json({ error: "Livro não encontrado"});
  }
});

export default app;