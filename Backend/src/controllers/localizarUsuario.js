const { sql, connectToDatabase } = require('../config/db');

// Função para localizar um usuário na tabela "Usuarios" por ID ou nome
async function localizarUsuario(req, res) {
    const id = req.query.id;
    const nomeCompleto = req.query.nome;

    try {
        await connectToDatabase();

        let result;
        if (id) {
            // Consulta o usuário pelo ID
            result = await sql.query`SELECT * FROM Usuarios WHERE ID = ${parseInt(id, 10)}`;
        } else if (nomeCompleto) {
            // Divide o nome completo em partes, assumindo que é no formato "PrimeiroNome.SegundoNome"
            const [primeiroNome, segundoNome] = nomeCompleto.split('.');

            // Consulta pelo nome completo (primeiro e segundo nome separados por espaço)
            result = await sql.query`
                SELECT * FROM Usuarios 
                WHERE Nome = ${primeiroNome} + ' ' + ${segundoNome}
                OR Nome = ${nomeCompleto}
            `;
        } else {
            return res.status(400).send('Por favor, forneça um ID ou nome completo para localizar o usuário.');
        }

        if (result.recordset.length === 0) {
            return res.status(404).send('Usuário não encontrado.');
        }

        // Assume-se que o resultado deve ser um único registro
        const usuario = result.recordset[0];
        res.json(usuario);
    } catch (err) {
        console.error('Erro ao localizar usuário:', err);
        res.status(500).send('Erro ao localizar usuário.');
    }
}

module.exports = {
    localizarUsuario,
};
