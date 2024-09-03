// src/server.js (ou um novo arquivo de configuração WebSocket)
const express = require('express');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');
const cors = require('cors');
const { fetchColumnData } = require('../src/Service/columnService'); // Ajuste o caminho conforme necessário
const enviarDadosCDC = require('../src/controllers/cdcController'); // Ajuste o caminho conforme necessário
const usuariosRouter = require('./routes/usuarios');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


// Configuração do CORS
app.use(cors({
    origin: 'http://localhost:3001' // Substitua pelo domínio do seu frontend
}));

// Configurar para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do middleware para JSON
app.use(express.json());

// Configuração das rotas
app.use('/usuarios', usuariosRouter);

// Configuração da rota específica para dados CDC
app.get('/cdc-data', enviarDadosCDC);

// Configuração do WebSocket
wss.on('connection', ws => {
    console.log('Novo cliente conectado');

    const sendData = async () => {
        try {
            const data = await fetchColumnData();
            ws.send(JSON.stringify(data));
        } catch (error) {
            console.error('Erro ao enviar dados via WebSocket:', error);
        }
    };

    // Enviar dados a cada 5 segundos
    const intervalId = setInterval(sendData, 5000);

    ws.on('close', () => {
        clearInterval(intervalId);
        console.log('Cliente desconectado');
    });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
