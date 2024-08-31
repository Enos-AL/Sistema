import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { fetchColumnData } from '../services/dataService';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ColumnCharts = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetchColumnData()
            .then(data => {
                // Preparar dados para gráfico de barras
                const barData = {
                    labels: data.contagemColunas.map(item => item.coluna),
                    datasets: [{
                        label: 'Quantidade de Informações por Coluna',
                        data: data.contagemColunas.map(item => item.count),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    }]
                };

                // Preparar dados para gráfico de pizza
                const pieData = {
                    labels: data.statusCounts.map(item => item.status),
                    datasets: [{
                        label: 'Tipos de Status',
                        data: data.statusCounts.map(item => item.count),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1,
                    }]
                };

                setChartData({ barData, pieData });
            })
            .catch(error => {
                console.error('Erro ao buscar dados do gráfico:', error);
            });
    }, []);

    return (
        <div>
            <h2>Gráficos</h2>
            <div>
                <h3>Total de Informações por Coluna</h3>
                {chartData && <Bar data={chartData.barData} options={{ responsive: true }} />}
            </div>
            <div>
                <h3>Tipos de Status</h3>
                {chartData && <Pie data={chartData.pieData} options={{ responsive: true }} />}
            </div>
        </div>
    );
};

export default ColumnCharts;
