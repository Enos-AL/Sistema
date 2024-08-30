const express = require('express');
const router = express.Router();
const { sql, connectToDatabase } = require('../config/db');
const excluirUsuario = require('../controllers/excluirUsuario');

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
            res.status(200).json(usuarios.recordset[0]);
        } else if (usuarios.recordset.length > 1 || (usuarios.recordset.length === 1 && usuarios.recordset[0].Nome !== nome)) {
            // Vários usuários ou um usuário com nome parcial encontrado
            res.status(200).json({ message: 'Usuário encontrado, mas é necessário digitar o nome completo para localizar todos os dados.' });
        } else {
            // Nenhum usuário encontrado
            res.status(200).json({ message: 'Esse usuário não consta no Banco de Dados' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao acessar o banco de dados.' });
    }
});

// Rota para alterar um usuário por ID
router.put('/alterar/:id', async (req, res) => {
    const { id } = req.params;
    const novosDados = req.body;

    // Remove o campo 'id' dos novos dados
    delete novosDados.id;

    try {
        const pool = await sql.connect();
        const request = pool.request();

        // Adiciona todos os campos ao request
        Object.keys(novosDados).forEach((campo) => {
            request.input(campo, sql.NVarChar, novosDados[campo]);
        });

        // Constrói a string da query dinamicamente, excluindo o campo 'id'
        const setQuery = Object.keys(novosDados).map(campo => `${campo} = @${campo}`).join(', ');

        const query = `UPDATE Usuarios SET ${setQuery} WHERE id = @id`;

        request.input('id', sql.Int, id); // Adiciona o ID como input
        await request.query(query);

        res.status(200).json({ message: 'Usuário alterado com sucesso!' });
    } catch (error) {

        res.status(500).json({ message: 'Erro ao alterar usuário.' });
    }
});

// Rota para excluir um usuário por ID
router.delete('/excluir/:id', excluirUsuario.excluirUsuario); 

module.exports = router;
