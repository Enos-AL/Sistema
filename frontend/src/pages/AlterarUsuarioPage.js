import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import usuarioService from '../services/usuarioService';
import AlterarUsuarioForm from '../components/Form/AlterarUsuarioForm';

const AlterarUsuarioPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        if (location.state) {
            setUsuario(location.state);
        } else {
            const fetchUsuario = async () => {
                try {
                    const usuarioData = await usuarioService.localizarUsuario(id);
                    setUsuario(usuarioData);
                } catch (error) {
                    console.error('Erro ao buscar usuário:', error);
                }
            };

            fetchUsuario();
        }
    }, [id, location.state]);

    return (
        <div>
            <h2>Alterar Usuário</h2>
            <AlterarUsuarioForm usuario={usuario} />
        </div>
    );
};

export default AlterarUsuarioPage;
