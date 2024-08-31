import React, { useState } from 'react';
import { handleFormSubmit } from '../services/configManageColumns';

function ManageColumns() {
    const [coluna, setColuna] = useState('');
    const [novaColuna, setNovaColuna] = useState('');
    const [acao, setAcao] = useState('verificar');
    const [apiKey, setApiKey] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleAcaoChange = (e) => {
        setAcao(e.target.value);
        setColuna('');
        setNovaColuna('');
        setApiKey('');
        setMensagem('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { message } = await handleFormSubmit({ coluna, novaColuna, acao, apiKey });
        setMensagem(message);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Coluna:
                <input 
                    type="text" 
                    value={coluna} 
                    onChange={(e) => setColuna(e.target.value)} 
                    disabled={acao === 'listar'}
                />
            </label>
            {acao === 'alterar' && (
                <label>
                    Nova Coluna:
                    <input 
                        type="text" 
                        value={novaColuna} 
                        onChange={(e) => setNovaColuna(e.target.value)} 
                    />
                </label>
            )}
            <label>
                Ação:
                <select 
                    value={acao} 
                    onChange={handleAcaoChange}
                >
                    <option value="verificar">Verificar</option>
                    <option value="adicionar">Adicionar</option>
                    <option value="excluir">Excluir</option>
                    <option value="alterar">Alterar</option>
                    <option value="listar">Listar Todas as Colunas</option>
                </select>
            </label>
            <label>
                API Key:
                <input 
                    type="password" 
                    value={apiKey} 
                    onChange={(e) => setApiKey(e.target.value)} 
                />
            </label>
            <button type="submit">Enviar</button>

            {mensagem && <p className="message">{mensagem}</p>}
        </form>
    );
}

export default ManageColumns;
