import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import usuarioService from '../services/usuarioService';

const AlterarUsuarioPage = () => {
    const location = useLocation();
    const [usuario, setUsuario] = useState(location.state?.usuario || {});
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica se os dados do usuário foram passados corretamente
        if (!usuario.id) {
            navigate('/localizar-usuario');
        }
    }, [usuario, navigate]);

    const handleAlterar = async () => {
        await usuarioService.alterarUsuario(usuario.id, usuario);
        alert('Usuário alterado com sucesso!');
        navigate('/localizar-usuario');
    };

    const handleExcluir = () => {
        if (window.confirm('Deseja realmente excluir este usuário?')) {
            navigate(`/excluir-usuario`, { state: { usuario } });
        }
    };

    return (
        <div>
            <h1>Alterar Usuário</h1>
            {Object.keys(usuario).map((coluna) => (
                <div key={coluna}>
                    <label>{coluna}:</label>
                    <input 
                        type="text" 
                        value={usuario[coluna]} 
                        onChange={(e) => setUsuario({ ...usuario, [coluna]: e.target.value })} 
                    />
                </div>
            ))}
            <button onClick={handleAlterar}>Alterar Usuário</button>
            <button onClick={handleExcluir}>Excluir Usuário</button>
        </div>
    );
};

export default AlterarUsuarioPage;
