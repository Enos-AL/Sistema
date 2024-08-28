import React, { useEffect, useState } from 'react';
import usuarioService from '../services/usuarioService';
import ExcluirUsuarioButton from '../components/Button/ExcluirUsuarioButton';

const ExcluirUsuarioPage = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await usuarioService.buscarUsuarios();
            setUsuarios(data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Excluir Usuário</h1>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.ID}>
                        {usuario.Nome} - {usuario.Email}
                        <ExcluirUsuarioButton id={usuario.ID} nome={usuario.Nome} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExcluirUsuarioPage;
