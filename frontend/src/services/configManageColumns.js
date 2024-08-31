import axios from 'axios';

export const handleFormSubmit = async ({ coluna, novaColuna, acao, apiKey }) => {
    try {
        const response = await axios.post('http://localhost:3000/usuarios/colunas', {
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
