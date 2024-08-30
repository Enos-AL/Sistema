import axios from 'axios';

const API_URL = 'http://localhost:3000/usuarios';

const usuarioService = {
    // Alterar Usuário Existente
    alterarUsuario: async (id, novosDados) => {
        try {
            const response = await axios.put(`${API_URL}/alterar/${id}?confirmacao=true`, novosDados);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data || 'Erro ao alterar usuário.';
            throw new Error(errorMessage);
        }
    },

    // Localizar Usuário por nome
    localizarUsuario: async (nome) => {
        try {
            const response = await axios.get(`${API_URL}/localizar`, {
                params: { nome }
            });
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao localizar usuário.';
            if (error.response) {
                if (error.response.status === 400) {
                    errorMessage = 'Digite o nome completo do usuário.';
                } else if (error.response.status === 404) {
                    errorMessage = 'Esse usuário não consta no Banco de Dados.';
                }
            }
            throw new Error(errorMessage);
        }
    },

    // Excluir Usuário por ID
    excluirUsuario: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/excluir/${id}`);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data || 'Erro ao excluir usuário.';
            throw new Error(errorMessage);
        }
    },
};

export default usuarioService;
