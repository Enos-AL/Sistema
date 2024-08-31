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
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
    // Aumentando o timeout para 30 segundos
    requestTimeout: 30000 // 30 segundos
};

async function connectToDatabase() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Conectado ao banco de dados.');
        return pool;
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        throw err;
    }
}

module.exports = {
    sql,
    connectToDatabase,
};

