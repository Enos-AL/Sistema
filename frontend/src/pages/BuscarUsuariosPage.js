import React, { useEffect, useState } from 'react';
import usuarioService from '../services/usuarioService';
import BuscarUsuariosTable from '../components/Table/BuscarUsuariosTable';

const BuscarUsuariosPage = () => {
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
            <h1>Buscar Usuários</h1>
            <BuscarUsuariosTable usuarios={usuarios} />
        </div>
    );
};

export default BuscarUsuariosPage;
