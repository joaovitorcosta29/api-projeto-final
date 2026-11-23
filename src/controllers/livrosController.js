// Controller: as regras de cada operação de livros. Os dados vêm do banco (Prisma).
import { prisma } from '../lib/prisma.js';

// GET /api/livros
export async function listar(req, res) {
  const livros = await prisma.livro.findMany({ orderBy: { id: 'asc' } });
  res.json(livros);
}

// GET /api/livros/:id
export async function buscarPorId(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ erro: 'O id precisa ser um número' });
  }
  const livro = await prisma.livro.findUnique({ where: { id } });
  if (!livro) {
    return res.status(404).json({ erro: 'Livro não encontrado' });
  }
  res.json(livro);
}

// POST /api/livros
export async function criar(req, res) {
  // req.body vem vazio (undefined) se o cliente não enviar JSON; ?? {} evita o erro
  const { titulo, isbn, ano, status, generoId } = req.body ?? {};
  if (!titulo) {
    return res.status(400).json({ erro: 'O campo titulo é obrigatório' });
  }
  if (!generoId) {
    return res.status(400).json({ erro: 'O campo generoId é obrigatório' });
  }
  const genero = await prisma.genero.findUnique({ where: { id: Number(generoId) } });
  if (!genero) {
    return res.status(400).json({ erro: 'generoId não existe' });
  }
  // campos que não chegaram ficam undefined: o banco usa o valor padrão ou deixa vazio
  const novo = await prisma.livro.create({
    data: {
      titulo,
      isbn,
      ano,
      status,
      generoId: genero.id,
    },
  });
  res.status(201).json(novo);
}

// PUT /api/livros/:id
export async function atualizar(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ erro: 'O id precisa ser um número' });
  }
  const existe = await prisma.livro.findUnique({ where: { id } });
  if (!existe) {
    return res.status(404).json({ erro: 'Livro não encontrado' });
  }
  const dados = req.body ?? {};
  if (dados.titulo === '') {
    return res.status(400).json({ erro: 'O campo titulo não pode ficar vazio' });
  }
  // campos que não chegaram ficam undefined, e o Prisma não os altera
  const atualizado = await prisma.livro.update({
    where: { id },
    data: {
      titulo: dados.titulo,
      isbn: dados.isbn,
      ano: dados.ano,
      status: dados.status,
    },
  });
  res.json(atualizado);
}

// DELETE /api/livros/:id
export async function excluir(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ erro: 'O id precisa ser um número' });
  }
  const existe = await prisma.livro.findUnique({ where: { id } });
  if (!existe) {
    return res.status(404).json({ erro: 'Livro não encontrado' });
  }
  await prisma.livro.delete({ where: { id } });
  res.status(204).send();
}