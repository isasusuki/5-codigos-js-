const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para permitir que o servidor entenda JSON no corpo das requisições
app.use(express.json());

// Banco de dados simulado na memória (Array de objetos)
let bancoDeLivros = [
    { id: 1, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", paginas: 1200, lido: true },
    { id: 2, titulo: "1984", autor: "George Orwell", paginas: 328, lido: false }
];

// 1. LISTAR TODOS OS LIVROS (GET)
app.get('/livros', (req, res) => {
    res.status(200).json(bancoDeLivros);
});

// 2. BUSCAR UM LIVRO POR ID (GET)
app.get('/livros/:id', (req, res) => {
    const idParam = parseInt(req.params.id);
    const livro = bancoDeLivros.find(l => l.id === idParam);
    
    if (!livro) {
        return res.status(404).json({ erro: "Livro não encontrado." });
    }
    
    res.status(200).json(livro);
});

// 3. ADICIONAR UM NOVO LIVRO (POST)
app.post('/livros', (req, res) => {
    const { titulo, autor, paginas, lido } = req.body;

    // Validação simples de campos obrigatórios
    if (!titulo || !autor || !paginas) {
        return res.status(400).json({ erro: "Campos 'titulo', 'autor' e 'paginas' são obrigatórios." });
    }

    const novoLivro = {
        id: bancoDeLivros.length > 0 ? bancoDeLivros[bancoDeLivros.length - 1].id + 1 : 1,
        titulo,
        autor,
        paginas: parseInt(paginas),
        lido: lido || false // Padrão falso se não for enviado
    };

    bancoDeLivros.push(novoLivro);
    res.status(201).json({ mensagem: "Livro adicionado com sucesso!", livro: novoLivro });
});

// 4. ATUALIZAR UM LIVRO EXISTENTE (PUT)
app.put('/livros/:id', (req, res) => {
    const idParam = parseInt(req.params.id);
    const { titulo, autor, paginas, lido } = req.body;
    
    const indiceLivro = bancoDeLivros.findIndex(l => l.id === idParam);
    
    if (indiceLivro === -1) {
        return res.status(404).json({ erro: "Livro não encontrado para atualização." });
    }

    // Atualiza apenas os campos enviados, mantendo os antigos caso contrário
    bancoDeLivros[indiceLivro] = {
        id: idParam,
        titulo: titulo || bancoDeLivros[indiceLivro].titulo,
        autor: autor || bancoDeLivros[indiceLivro].autor,
        paginas: paginas ? parseInt(paginas) : bancoDeLivros[indiceLivro].paginas,
        lido: lido !== undefined ? lido : bancoDeLivros[indiceLivro].lido
    };

    res.status(200).json({ mensagem: "Livro atualizado!", livro: bancoDeLivros[indiceLivro] });
});

// 5. DELETAR UM LIVRO (DELETE)
app.delete('/livros/:id', (req, res) => {
    const idParam = parseInt(req.params.id);
    const indiceLivro = bancoDeLivros.findIndex(l => l.id === idParam);

    if (indiceLivro === -1) {
        return res.status(404).json({ erro: "Livro não encontrado para exclusão." });
    }

    const livroRemovido = bancoDeLivros.splice(indiceLivro, 1);
    res.status(200).json({ mensagem: "Livro deletado com sucesso!", livro: livroRemovido[0] });
});

// Inicialização do servidor na porta configurada
app.listen(PORT, () => {
    console.log(`Simulador de livros rodando em http://localhost:${PORT}`);
});
