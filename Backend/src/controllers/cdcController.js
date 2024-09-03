// src/controllers/cdcController.js
const { fetchCDCData } = require('../Service/cdcService');

async function enviarDadosCDC(req, res) {
    try {
        const data = await fetchCDCData();
        res.json(data);
    } catch (err) {
        console.error('Erro ao obter dados CDC:', err);
        res.status(500).send('Erro ao processar a requisição.');
    }
}

module.exports = enviarDadosCDC;
