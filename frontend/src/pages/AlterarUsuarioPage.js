import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import usuarioService from '../services/usuarioService';

const AlterarUsuarioPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({});
    const [id, setId] = useState('');

    useEffect(() => {
        const { state } = location;
        if (state && state.usuario) {
            setUsuario(state.usuario);
            setId(state.usuario.id);
        }
    }, [location]);

    const handleAlterar = async () => {
        try {
            await usuarioService.alterarUsuario(id, usuario);
            alert('Usuário alterado com sucesso!');
            navigate('/localizar-usuario');
        } catch (error) {
            alert('Erro ao alterar usuário.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prevUsuario) => ({ ...prevUsuario, [name]: value }));
    };

    return (
        <div>
            <h1>Alterar Usuário</h1>
            {Object.keys(usuario).map((key) => (
                <div key={key}>
                    <label>{key}:</label>
                    <input 
                        type="text" 
                        name={key}
                        value={usuario[key] || ''}
                        onChange={handleChange}
                    />
                </div>
            ))}
            <button onClick={handleAlterar}>Alterar Usuário</button>
            <button onClick={() => navigate(`/excluir-usuario/${id}`)}>Excluir Usuário</button>
        </div>
    );
};

export default AlterarUsuarioPage;
