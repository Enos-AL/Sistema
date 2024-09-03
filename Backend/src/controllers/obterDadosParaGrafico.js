// src/controllers/obterDadosParaGrafico.js
const { sql, connectToDatabase } = require('../config/db');

async function obterDadosParaGrafico(req, res) {

    try {
        await connectToDatabase();

        // Obter total de colunas da tabela 'Usuarios'
        const totalColunasResult = await sql.query`
            SELECT COUNT(*) AS totalColunas
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'Usuarios'
        `;
        const totalColunas = totalColunasResult.recordset[0].totalColunas;

        // Obter nomes das colunas da tabela 'Usuarios'
        const colunasResult = await sql.query`
            SELECT COLUMN_NAME
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'Usuarios'
        `;
        const colunas = colunasResult.recordset.map(row => row.COLUMN_NAME);

        // Contar valores para cada coluna
        const contagemColunasPromises = colunas.map(async coluna => {
            if (coluna.toLowerCase() === 'id' || coluna.toLowerCase() === 'created_at' || coluna.toLowerCase() === 'updated_at') {
                return null;
            }

            try {
                const countResult = await sql.query(`
                    SELECT COUNT(${coluna}) AS count
                    FROM Usuarios
                `);
                return { coluna, count: countResult.recordset[0].count };
            } catch (err) {
                console.error(`Erro ao contar valores da coluna ${coluna}:`, err);
                return { coluna, count: 0 };
            }
        });

        const contagemColunas = await Promise.all(contagemColunasPromises);
        const contagemColunasFiltrada = contagemColunas.filter(item => item !== null);

        res.json({
            totalColunas,
            contagemColunas: contagemColunasFiltrada
        });
    } catch (err) {
        console.error('Erro ao obter dados para gráfico:', err);
        res.status(500).send('Erro ao processar a requisição.');
    }
}


module.exports = obterDadosParaGrafico;
