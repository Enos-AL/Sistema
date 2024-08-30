const express = require('express');
const router = express.Router();
const { sql, connectToDatabase } = require('../config/db');
const alterarUsuario = require('../controllers/alterarUsuario');
const excluirUsuario = require('../controllers/excluirUsuario');

// Garante que a conexão com o banco de dados seja estabelecida
connectToDatabase();

// Adicione essa lógica na rota de localização de usuário
router.get('/localizar', async (req, res) => {
    const { nome } = req.query;

    try {
        // Realiza a consulta ao banco de dados
        const pool = await sql.connect();
        const usuarios = await pool.request()
            .input('nome', sql.NVarChar, nome)
            .query(`SELECT * FROM Usuarios WHERE Nome LIKE @nome + '%'`);

        if (usuarios.recordset.length === 1 && usuarios.recordset[0].Nome === nome) {
            // Nome completo correspondente encontrado
            res.json(usuarios.recordset[0]);
        } else if (usuarios.recordset.length > 1 || (usuarios.recordset.length === 1 && usuarios.recordset[0].Nome !== nome)) {
            // Vários usuários ou um usuário com nome parcial encontrado
            res.status(400).json({ message: 'Usuário encontrado, mas é necessário digitar o nome completo para localizar todos os dados.' });
        } else {
            // Nenhum usuário encontrado
            res.status(404).json({ message: 'Esse usuário não consta no Banco de Dados' });
        }
    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error);
        res.status(500).json({ message: 'Erro ao acessar o banco de dados.' });
    }
});

// Rota para alterar um usuário por ID
router.put('/alterar/:id', alterarUsuario.alterarUsuario); // Altera um usuário existente

// Rota para excluir um usuário por ID
router.delete('/excluir/:id', excluirUsuario.excluirUsuario); // Exclui um usuário existente

module.exports = router;
