import axios from 'axios';

const API_URL = 'http://localhost:3000/usuarios';

const usuarioService = {
    inserirUsuario: async (usuario) => {
        const response = await axios.post(`${API_URL}/inserir`, usuario);
        return response.data;
    },

    excluirUsuario: async (id, nome) => {
        const response = await axios.delete(`${API_URL}/excluir`, {
            data: { id, nome }
        });
        return response.data;
    },

    buscarUsuarios: async () => {
        const response = await axios.get(`${API_URL}/buscar`);
        return response.data;
    },

    alterarUsuario: async (id, novosDados) => {
        const response = await axios.put(`${API_URL}/alterar/${id}`, novosDados, {
            params: { confirmacao: 'true' }
        });
        return response.data;
    },

    localizarUsuario: async (nome) => {
        const response = await axios.get(`${API_URL}/localizar`, {
            params: { nome }
        });
        return response.data;
    },

    checkAndAddColumn: async (coluna) => {
        const response = await axios.post(`${API_URL}/checkAndAddColumn`, { coluna });
        return response.data;
    }
};

export default usuarioService;
