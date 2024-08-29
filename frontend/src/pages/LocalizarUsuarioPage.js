import React, { useState } from 'react';
import usuarioService from '../services/usuarioService';

const LocalizarUsuarioPage = () => {
    const [usuario, setUsuario] = useState(null); // Inicializa o estado do usuário como null
    const [nome, setNome] = useState('');

    const handleLocalizar = async () => {
        try {
            const dadosUsuario = await usuarioService.localizarUsuario(nome);
            setUsuario(dadosUsuario); // Define o usuário localizado
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
                placeholder="Nome Completo do Usuário" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
            />
            <button onClick={handleLocalizar}>Localizar Usuário</button>

            {usuario && (
                <div>
                    {/* Exibe o ID do usuário, mas não permite edição */}
                    <div>
                        <label>ID</label>
                        <input 
                            type="text" 
                            name="id" 
                            value={usuario.id || ''} 
                            readOnly 
                        />
                    </div>

                    {/* Exibe e permite editar os demais campos */}
                    {Object.keys(usuario).filter(coluna => coluna !== 'id').map((coluna, index) => (
                        <div key={index}>
                            <label>{coluna}</label>
                            <input 
                                type="text" 
                                name={coluna} 
                                value={usuario[coluna] || ''}  // Se o valor for null ou undefined, usa uma string vazia
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
