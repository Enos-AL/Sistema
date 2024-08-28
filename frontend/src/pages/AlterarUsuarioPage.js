import React, { useEffect, useState } from 'react';
import usuarioService from '../services/usuarioService';
import AlterarUsuarioForm from '../components/Form/AlterarUsuarioForm';

const AlterarUsuarioPage = ({ match }) => {
    const [usuario, setUsuario] = useState(null);
    const usuarioId = match.params.id;

    useEffect(() => {
        async function fetchData() {
            const data = await usuarioService.localizarUsuario(usuarioId);
            setUsuario(data);
        }
        fetchData();
    }, [usuarioId]);

    return (
        <div>
            <h1>Alterar Usuário</h1>
            {usuario && <AlterarUsuarioForm usuario={usuario} />}
        </div>
    );
};

export default AlterarUsuarioPage;
