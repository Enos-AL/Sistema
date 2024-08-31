import axios from 'axios';

export async function fetchColumnData() {
    try {
        const response = await axios.get('http://localhost:3000/usuarios/graficos');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        throw error;
    }
}
