const { sql, connectToDatabase } = require('../config/db');

// Função para alterar os dados de um usuário na tabela "Usuarios"
async function alterarUsuario(req, res) {

    console.log('Recebido req.query:', req.query);
    console.log('Recebido req.body:', req.body);

    const id = req.params.id; // ID do usuário a ser alterado, fornecido na URL
    console.log('ID recebido:', id);
    const nomeCompleto = req.body.nomeCompleto; // Nome completo fornecido no corpo da requisição (opcional)
    const novosDados = req.body; // Dados para atualizar

    // Verifica se o ID foi fornecido
    if (!id) {
        return res.status(400).send('É necessário fornecer o ID para realizar alterações.');
    }

    try {
        // Conecta ao banco de dados
        await connectToDatabase();

        // Verifica se o usuário existe com o ID fornecido
        const usuarioExistente = await sql.query`
            SELECT * FROM Usuarios 
            WHERE ID = ${parseInt(id, 10)}
        `;

        // Se o usuário não for encontrado, retorna erro 404
        if (usuarioExistente.recordset.length === 0) {
            console.log('Usuário não encontrado:', id);
            return res.status(404).send('Usuário não encontrado com o ID fornecido.');
        } else {
            console.log('Usuário encontrado:', usuarioExistente.recordset[0]);
        }

            // Essa parte o frontend não está configurado para fazer. Verificar com a IA.
        // Se o nome completo for fornecido, verifica se corresponde ao usuário
        if (nomeCompleto) {
            // Divide o nome completo no formato "PrimeiroNome.SegundoNome" se necessário
            const [primeiroNome, segundoNome] = nomeCompleto.split('.');
            const nomeCompletoFormatado = primeiroNome && segundoNome ? primeiroNome + ' ' + segundoNome : nomeCompleto;

            // Verifica se o nome corresponde ao usuário existente
            const usuarioExistentePorNome = await sql.query`
                SELECT * FROM Usuarios 
                WHERE Nome = ${nomeCompletoFormatado} AND ID = ${parseInt(id, 10)}
            `;

            // Se o nome não corresponder ao usuário, retorna erro 400
            if (usuarioExistentePorNome.recordset.length === 0) {
                return res.status(400).send('Nome fornecido não corresponde ao ID fornecido.');
            }
        }

        // Verifica a confirmação para realizar a alteração
        const confirmacao = req.query.confirmacao || 'false'; // Padrão para 'false' se não fornecido
        if (confirmacao !== 'true') {
            return res.status(400).send('Confirmação não realizada. As alterações não foram aplicadas.');
        }       

        // Cria a query de atualização com base nos novos dados fornecidos
        const queryParts = [];
        if (novosDados.Nome) queryParts.push(`Nome = '${novosDados.Nome}'`);
        if (novosDados.Email) queryParts.push(`Email = '${novosDados.Email}'`);
        if (novosDados.Senha) queryParts.push(`Senha = '${novosDados.Senha}'`);

        if (queryParts.length === 0) {
            return res.status(400).send('Nenhum dado fornecido para alteração.');
        }

        const updateQuery = `UPDATE Usuarios SET ${queryParts.join(', ')} WHERE ID = ${parseInt(id, 10)}`;

        // Executa a query de atualização
        await sql.query(updateQuery);
        res.send('Usuário alterado com sucesso!');
    } catch (err) {
        console.error('Erro ao alterar usuário:', err);
        res.status(500).send('Erro ao alterar usuário.');
    }
}

module.exports = {
    alterarUsuario,
};
