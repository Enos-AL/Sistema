import React, { useState } from 'react';
import { Input, Button, message, Select, List, Radio } from 'antd';
import usuarioService from '../services/usuarioService';

const { Option } = Select;

const ColumnManagerPage = () => {
    const [coluna, setColuna] = useState('');
    const [acao, setAcao] = useState('verificar');
    const [colunas, setColunas] = useState([]);
    const [colunaSelecionada, setColunaSelecionada] = useState('');

    const handleAction = async () => {
        try {
            let response;
            if (acao === 'verificarColunas') {
                if (colunaSelecionada) {
                    // Redireciona para a página de adição com o nome da coluna selecionada
                    window.location.href = `/adicionar-coluna/${colunaSelecionada}`;
                } else {
                    response = await usuarioService.checkAndModifyColumn({ acao });
                    setColunas(response.colunas);
                }
            } else if (acao === 'adicionar' && colunaSelecionada) {
                // Redireciona para a página de adição com o nome da coluna selecionada
                window.location.href = `/adicionar-coluna/${colunaSelecionada}`;
            } else {
                response = await usuarioService.checkAndModifyColumn({ coluna, acao });
                message.success(response.message);
            }
        } catch (error) {
            console.error('Erro ao realizar ação:', error);
            message.error('Erro ao processar a requisição.');
        }
    };

    return (
        <div>
            <h2>Gerenciar Colunas</h2>
            <Select defaultValue="verificar" onChange={(value) => {
                setAcao(value);
                setColunaSelecionada(''); // Limpa a coluna selecionada ao mudar de ação
                if (value === 'verificarColunas') {
                    setColuna(''); // Limpa o input de coluna se "Verificar Todas as Colunas" for escolhido
                }
            }}>
                <Option value="verificar">Verificar Coluna</Option>
                <Option value="adicionar">Adicionar Coluna</Option>
                <Option value="verificarColunas">Verificar Todas as Colunas</Option>
            </Select>
            {acao === 'adicionar' && colunas.length > 0 && (
                <Select
                    placeholder="Selecione a coluna para alterar"
                    onChange={(value) => setColunaSelecionada(value)}
                    style={{ width: '100%', marginTop: 10 }}
                >
                    {colunas.map(col => (
                        <Option key={col} value={col}>{col}</Option>
                    ))}
                </Select>
            )}
            <Input 
                placeholder="Nome da coluna" 
                value={coluna} 
                onChange={(e) => setColuna(e.target.value)} 
                disabled={acao === 'verificarColunas'}
                style={{ marginTop: 10 }}
            />
            <Button type="primary" onClick={handleAction} style={{ marginTop: 10 }}>
                Executar
            </Button>
            {acao === 'verificarColunas' && colunas.length > 0 && (
                <List
                    header={<div>Colunas no Banco de Dados</div>}
                    bordered
                    dataSource={colunas}
                    renderItem={item => (
                        <List.Item>
                            <Radio
                                checked={colunaSelecionada === item}
                                onChange={() => setColunaSelecionada(item)}
                            >
                                {item}
                            </Radio>
                        </List.Item>
                    )}
                    style={{ marginTop: 10 }}
                />
            )}
        </div>
    );
};

export default ColumnManagerPage;
