// src/services/columnService.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/usuarios', // URL do backend
});

// Função para buscar dados de colunas
export const fetchColumnData = async () => {
    try {
        const response = await api.get('/graficos');
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar dados do gráfico.');
    }
};

// Função para buscar dados CDC
export const fetchCDCData = async () => {
    try {
        const response = await api.get('/cdc-data');
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar dados CDC.');
    }
};

// Função para enviar dados do formulário
export const handleFormSubmit = async ({ coluna, novaColuna, acao, apiKey }) => {
    try {
        const response = await api.post('/', {
            coluna,
            novaColuna,
            acao,
            apiKey,
        });
        return { message: response.data.message || response.data.colunas?.join(', ') };
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return { message: error.response.data.message };
        } else {
            return { message: 'Erro ao processar a solicitação.' };
        }
    }
};

// Exporta a instância para ser usada em outras partes do frontend
export default api;
