import React, { useState } from 'react';
// Remova o `useNavigate` import caso não esteja utilizando
// import { useNavigate } from 'react-router-dom';
import usuarioService from '../services/usuarioService';

const LocalizarUsuarioPage = () => {
    const [usuario, setUsuario] = useState({});
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');

    const handleLocalizar = async () => {
        try {
            const dadosUsuario = await usuarioService.localizarUsuario(nome || id);
            setUsuario(dadosUsuario);
        } catch (error) {
            alert('Erro ao localizar usuário.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prevUsuario => ({
            ...prevUsuario,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            await usuarioService.alterarUsuario(usuario.id, usuario);
            alert('Usuário alterado com sucesso!');
        } catch (error) {
            alert('Erro ao alterar usuário.');
        }
    };

    return (
        <div>
            <h1>Localizar Usuário</h1>
            <input 
                type="text" 
                placeholder="ID do Usuário" 
                value={id} 
                onChange={(e) => setId(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Nome Completo do Usuário" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
            />
            <button onClick={handleLocalizar}>Localizar Usuário</button>

            {usuario && (
                <div>
                    {Object.keys(usuario).map((coluna, index) => (
                        <div key={index}>
                            <label>{coluna}</label>
                            <input 
                                type="text" 
                                name={coluna} 
                                value={usuario[coluna]} 
                                onChange={handleChange} 
                            />
                        </div>
                    ))}
                    <button onClick={handleSubmit}>Alterar Usuário</button>
                </div>
            )}
        </div>
    );
};

export default LocalizarUsuarioPage;
