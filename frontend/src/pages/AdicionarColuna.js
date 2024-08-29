import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import { useParams } from 'react-router-dom';
import usuarioService from '../services/usuarioService';

const AdicionarColuna = () => {
    const { nomeColuna } = useParams();
    const [valor, setValor] = useState('');

    const handleAddColumn = async () => {
        try {
            const response = await usuarioService.addColumn(nomeColuna, valor);
            message.success(response.message);
        } catch (error) {
            console.error('Erro ao adicionar coluna:', error);
            message.error('Erro ao processar a requisição.');
        }
    };

    return (
        <div>
            <h2>Adicionar Coluna: {nomeColuna}</h2>
            <Input 
                placeholder={`Digite um valor para a coluna ${nomeColuna}`} 
                value={valor} 
                onChange={(e) => setValor(e.target.value)} 
                style={{ marginTop: 10 }}
            />
            <Button type="primary" onClick={handleAddColumn} style={{ marginTop: 10 }}>
                Adicionar
            </Button>
        </div>
    );
};

export default AdicionarColuna;
