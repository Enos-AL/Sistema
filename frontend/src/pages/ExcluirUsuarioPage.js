import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usuarioService from '../services/usuarioService';

const ExcluirUsuarioPage = () => {
    const [id, setId] = useState(''); // ID do usuário a ser excluído
    const [confirmacao, setConfirmacao] = useState(false); // Confirmação da exclusão
    const navigate = useNavigate();

    // Função para excluir o usuário
    const handleExcluir = async () => {
        if (confirmacao) {
            try {
                await usuarioService.excluirUsuario(id); // Chama o serviço para excluir o usuário
                alert('Usuário excluído com sucesso!');
                navigate('/localizar-usuario'); // Redireciona para a página de localizar usuário
            } catch (error) {
                alert('Erro ao excluir usuário.');
            }
        } else {
            alert('Confirmação não realizada. A exclusão não foi aplicada.');
        }
    };

    return (
        <div>
            <h1>Excluir Usuário</h1>
            <input 
                type="text" 
                placeholder="ID do Usuário" 
                value={id} 
                onChange={(e) => setId(e.target.value)} 
            />
            <div>
                <label>
                    <input 
                        type="checkbox" 
                        checked={confirmacao} 
                        onChange={(e) => setConfirmacao(e.target.checked)} 
                    />
                    Confirmar exclusão
                </label>
            </div>
            <button onClick={handleExcluir}>Excluir Usuário</button>
        </div>
    );
};

export default ExcluirUsuarioPage;
