import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { fetchColumnData } from '../services/cdcService'; // Certifique-se de que a importação está correta
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
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchColumnData();
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

                const pieData = {
                    labels: data.contagemColunas.map(item => item.coluna),
                    datasets: [{
                        label: 'Quantidade por Coluna',
                        data: data.contagemColunas.map(item => item.count),
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
            } catch (error) {
                setError('Erro ao buscar dados do gráfico.');
                console.error('Erro ao buscar dados do gráfico:', error);
            }
        };

        fetchData(); // Fetch initial data

        const interval = setInterval(fetchData, 5000); // Poll every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="container">
            <h2>Gráficos</h2>
            <div className="chart-container">
                <h3>Total de Informações por Coluna</h3>
                {chartData && <Bar data={chartData.barData} options={{ responsive: true }} />}
            </div>
            <div className="chart-container">
                <h3>Quantidade por Coluna</h3>
                {chartData && <Pie data={chartData.pieData} options={{ responsive: true }} />}
            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default ColumnCharts;
