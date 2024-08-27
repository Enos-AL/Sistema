require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });
const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    server: process.env.DB_SERVER || '',
    database: process.env.DB_NAME || '',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
    port: parseInt(process.env.DB_PORT, 10) || 1433,
};

async function connectToDatabase() {
    try {
        await sql.connect(dbConfig);
        console.log('Conexão com o banco de dados SQL Server bem-sucedida!');
    } catch (err) {
        console.error('Erro ao conectar com o banco de dados:', err.message);
        console.log('DB_SERVER:', process.env.DB_SERVER);
        console.log('DB_USER:', process.env.DB_USER);
        console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
        console.log('DB_NAME:', process.env.DB_NAME);
        console.log('DB_PORT:', process.env.DB_PORT);
    }
}

module.exports = {
    sql,
    connectToDatabase,
};
