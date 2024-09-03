import React, { useState, useEffect } from 'react';
import { fetchCDCData, handleFormSubmit } from '../services/cdcService';
import '../../src/public/theme.css';  // Atualize para o caminho correto se necessário

import { Link } from 'react-router-dom';

const ManageColumns = () => {
    const [coluna, setColuna] = useState([]);
    const [data, setData] = useState(null);
    const [apiKey, setApiKey] = useState('');
    const [formState, setFormState] = useState({
        coluna: '',
        novaColuna: '',
        acao: '',
        apiKey: '',
    });
    const [message, setMessage] = useState('');
    const [errorMessages, setErrorMessages] = useState([]); // Novo estado para armazenar mensagens de erro

    useEffect(() => {
        fetchCDCData()
            .then(response => {
                setData(response);
                setColuna(Array.isArray(response.coluna) ? response.coluna : []);
            })
            .catch(error => console.error('Erro ao buscar dados CDC:', error));
    }, []);

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const errors = [];

        if (!formState.acao) {
            errors.push('Por favor, selecione uma ação.');
        }
        if (formState.acao !== 'listar' && !formState.coluna) {
            errors.push('Por favor, preencha o campo "Coluna".');
        }
        if (formState.acao === 'alterar' && !formState.novaColuna) {
            errors.push('Por favor, preencha o campo "Nova Coluna".');
        }
        if (!apiKey) {
            errors.push('Por favor, forneça a API Key.');
        }

        setErrorMessages(errors); // Atualiza o estado das mensagens de erro
        return errors.length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return; // Se houver erros, não prossegue com a submissão
        }

        handleFormSubmit({ ...formState, apiKey })
            .then(response => {
                setMessage(response.message);
                setFormState({ coluna: '', novaColuna: '', acao: '', apiKey: '' });
                setApiKey('');
                setErrorMessages([]); // Limpa as mensagens de erro após submissão bem-sucedida
            })
            .catch(error => setMessage('Erro ao processar a solicitação.'));
    };

    return (
        <div className="container">
            <h1 className="page-title">Gerenciar Colunas</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        name="coluna"
                        placeholder="Coluna"
                        value={formState.coluna}
                        onChange={handleChange}
                        disabled={formState.acao === 'listar'}
                        className="input-field"
                    />
                </label>
                {formState.acao === 'alterar' && (
                    <input
                        type="text"
                        name="novaColuna"
                        placeholder="Nova Coluna"
                        value={formState.novaColuna}
                        onChange={handleChange}
                        className="input-field"
                    />
                )}
                <select
                    name="acao"
                    value={formState.acao}
                    onChange={handleChange}
                    className="input-field"
                >
                    <option value="">Selecione uma ação</option>
                    <option value="verificar">Verificar</option>
                    <option value="adicionar">Adicionar</option>
                    <option value="excluir">Excluir</option>
                    <option value="alterar">Alterar</option>
                    <option value="listar">Listar Todas as Colunas</option>
                </select>
                <input
                    type="password"
                    name="apiKey"
                    placeholder="API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="input-field"
                />
                <button type="submit" className="submit-button">Executar</button>

                {/* Exibe as mensagens de erro abaixo do botão */}
                {errorMessages.length > 0 && (
                    <div className="error-messages">
                        {errorMessages.map((msg, index) => (
                            <div key={index} className="error">{msg}</div>
                        ))}
                    </div>
                )}

                {message && <div className="message">{message}</div>}
            </form>
            <ul>
                {coluna.map(coluna => (
                    <li key={coluna.id}>{coluna.nome}</li>
                ))}
            </ul>
            <div className="link-container">
                <Link to="/graficos" className="view-charts-link">Visualizar Gráficos</Link>
            </div>
        </div>
    );
};

export default ManageColumns;
