import React, { useState } from 'react';
import { Input, Button, message, Select, List } from 'antd';
import usuarioService from '../services/usuarioService';

const { Option } = Select;

const ColumnManagerPage = () => {
    const [coluna, setColuna] = useState('');
    const [acao, setAcao] = useState('verificar');
    const [colunas, setColunas] = useState([]);

    const handleAction = async () => {
        try {
            let response;
            if (acao === 'verificarColunas') {
                response = await usuarioService.checkAndModifyColumn({ acao });
                setColunas(response.colunas);
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
                if (value === 'verificarColunas') {
                    setColuna(''); // Limpa o campo de input quando selecionado "Verificar Todas as Colunas"
                }
            }}>
                <Option value="verificar">Verificar Coluna</Option>
                <Option value="adicionar">Adicionar Coluna</Option>
                <Option value="verificarColunas">Verificar Todas as Colunas</Option>
                {/* A opção de exclusão foi removida */}
            </Select>
            <Input 
                placeholder="Nome da coluna" 
                value={coluna} 
                onChange={(e) => setColuna(e.target.value)} 
                disabled={acao === 'verificarColunas'} // Desabilita o input para a opção "Verificar Todas as Colunas"
            />
            <Button type="primary" onClick={handleAction}>
                Executar
            </Button>
            {acao === 'verificarColunas' && colunas.length > 0 && (
                <List
                    header={<div>Colunas no Banco de Dados</div>}
                    bordered
                    dataSource={colunas}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
            )}
        </div>
    );
};

export default ColumnManagerPage;
