const { sql, connectToDatabase } = require('../config/db');

// Função para obter dados para gráficos
async function obterDadosParaGrafico(req, res) {
    try {
        await connectToDatabase();

        // Total de colunas
        const totalColunasResult = await sql.query`
            SELECT COUNT(*) AS totalColunas
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'Usuarios'
        `;
        const totalColunas = totalColunasResult.recordset[0].totalColunas;

        // Nomes das colunas
        const colunasResult = await sql.query`
            SELECT COLUMN_NAME
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'Usuarios'
        `;
        const colunas = colunasResult.recordset.map(row => row.COLUMN_NAME);

        // Contagem de informações para cada coluna
        const contagemColunas = await Promise.all(colunas.map(async coluna => {
            const query = `SELECT COUNT(${coluna}) AS count FROM Usuarios`;
            const countResult = await sql.query(query);
            return { coluna, count: countResult.recordset[0].count };
        }));

        // Contagem de usuários na coluna Nome
        const usuariosNomeResult = await sql.query`
            SELECT COUNT(Nome) AS countNome
            FROM Usuarios
        `;
        const countNome = usuariosNomeResult.recordset[0].countNome;

        // Contagem de tipos de status na coluna Status
        const statusResult = await sql.query`
            SELECT Status, COUNT(*) AS countStatus
            FROM Usuarios
            GROUP BY Status
        `;
        const statusCounts = statusResult.recordset.map(row => ({ status: row.Status, count: row.countStatus }));

        res.json({
            totalColunas,
            contagemColunas,
            countNome,
            statusCounts
        });
    } catch (err) {
        console.error('Erro ao obter dados para gráfico:', err);
        res.status(500).send('Erro ao processar a requisição.');
    }
}

module.exports = obterDadosParaGrafico;
