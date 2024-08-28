import React from 'react';

const BuscarUsuariosTable = ({ usuarios }) => (
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {usuarios.map(usuario => (
                <tr key={usuario.ID}>
                    <td>{usuario.ID}</td>
                    <td>{usuario.Nome}</td>
                    <td>{usuario.Email}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default BuscarUsuariosTable;
