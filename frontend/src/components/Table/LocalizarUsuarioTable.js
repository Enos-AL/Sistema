import React from 'react';

const LocalizarUsuarioTable = ({ usuario }) => (
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Senha</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{usuario.ID}</td>
                <td>{usuario.Nome}</td>
                <td>{usuario.Email}</td>
                <td>{usuario.Senha}</td>
            </tr>
        </tbody>
    </table>
);

export default LocalizarUsuarioTable;
