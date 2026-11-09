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