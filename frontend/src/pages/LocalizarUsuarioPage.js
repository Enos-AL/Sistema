import React, { useState } from 'react';
import usuarioService from '../services/usuarioService';
import LocalizarUsuarioTable from '../components/Table/LocalizarUsuarioTable';

const LocalizarUsuarioPage = () => {
    const [usuario, setUsuario] = useState(null);
    const [nome, setNome] = useState('');

    const handleSearch = async () => {
        const resultado = await usuarioService.localizarUsuario(nome);
        setUsuario(resultado);
    };

    return (
        <div>
            <h1>Localizar Usuário</h1>
            <input 
                type="text" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
                placeholder="Nome do Usuário" 
            />
            <button onClick={handleSearch}>Buscar</button>
            {usuario && <LocalizarUsuarioTable usuario={usuario} />}
        </div>
    );
};

export default LocalizarUsuarioPage;
