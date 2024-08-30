import axios from 'axios';

const API_URL = 'http://localhost:3000/usuarios';

const usuarioService = {
    // Alterar Usuário Existente
    alterarUsuario: async (id, novosDados) => {
        const response = await axios.put(`${API_URL}/alterar/${id}?confirmacao=true`, novosDados);
        return response.data;
    },

    // Localizar Usuário por nome
    localizarUsuario: async (nome) => {
        try {
            const response = await axios.get(`${API_URL}/localizar`, {
                params: { nome }
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw new Error('Digite o nome completo do usuário.');
            } else if (error.response && error.response.status === 404) {
                throw new Error('Esse usuário não consta no Banco de Dados.');
            } else {
                throw new Error('Esse erro pode ocorrer devido a comunicação com o BD');
            }
        }
    },

    // Excluir Usuário por ID
    excluirUsuario: async (id) => {
        const response = await axios.delete(`${API_URL}/excluir/${id}`);
        return response.data;
    },
};

export default usuarioService;

