const ColumnCharts = () => {
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(''); // Adiciona estado para mensagens de erro

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

                // Configuração das opções para o gráfico de pizza
                const pieOptions = {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return `${tooltipItem.label}: ${tooltipItem.raw}`;
                                }
                            }
                        }
                    }
                };

                setChartData({ barData, pieData, pieOptions });
            })
            .catch(error => {
                setError('Erro ao buscar dados do gráfico.');
                console.error('Erro ao buscar dados do gráfico:', error);
            });
    }, []);

    return (
        <div className="container">
            <h2>Gráficos</h2>
            {error && <div className="error-message">{error}</div>} {/* Exibe mensagem de erro */}
            <div className="chart-container">
                <h3>Total de Informações por Coluna</h3>
                {chartData && <Bar data={chartData.barData} options={{ responsive: true }} />}
            </div>
            <div className="chart-container">
                <h3>Quantidade por Coluna</h3>
                {chartData && <Pie data={chartData.pieData} options={{ responsive: true }} />}
            </div>
        </div>
    );
};

export default ColumnCharts;
