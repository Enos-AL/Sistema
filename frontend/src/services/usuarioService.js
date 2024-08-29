import axios from 'axios';

const API_URL = 'http://localhost:3000/usuarios';

const usuarioService = {

    alterarUsuario: async (id, novosDados) => {
        const response = await axios.put(`${API_URL}/alterar/${id}`, novosDados);
        return response.data;
    },
    
    localizarUsuario: async (nome) => {
        const response = await axios.get(`${API_URL}/localizar`, {
            params: { nome }
        });
        return response.data;
    },

    excluirUsuario: async (id) => {
        const response = await axios.delete(`${API_URL}/excluir/${id}`);
        return response.data;
    },

};

export default usuarioService;

