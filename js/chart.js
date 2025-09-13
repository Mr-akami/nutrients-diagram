class NutrientChart {
    constructor() {
        this.canvas = document.getElementById('nutrientChart');
        this.ctx = this.canvas.getContext('2d');
        this.chart = null;
        this.initChart();
    }

    initChart() {
        const chartData = {
            labels: [
                'タンパク質',
                'ビタミンA',
                'ビタミンC',
                'ビタミンD',
                'カルシウム',
                '鉄分',
                '食物繊維',
                '炭水化物'
            ],
            datasets: [{
                label: '栄養レベル',
                data: [0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(102, 126, 234, 0.4)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 3,
                pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(102, 126, 234, 1)',
                pointRadius: 10,
                pointHoverRadius: 14
            }]
        };

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        lineWidth: 2
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        circular: true,
                        lineWidth: 2
                    },
                    pointLabels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#4a5568',
                        padding: 20
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        stepSize: 33.33,
                        display: false,
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        size: 16,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    padding: 15,
                    cornerRadius: 10,
                    callbacks: {
                        label: function(context) {
                            const level = Math.round(context.parsed.r / 33.33);
                            return `レベル: ${level}/3 (${Math.round(context.parsed.r)}%)`;
                        }
                    }
                }
            },
            animation: {
                duration: 400,
                easing: 'easeInOutCubic'
            },
            onClick: (event, activeElements) => {
                if (activeElements.length > 0) {
                    const index = activeElements[0].index;
                    const nutrientName = this.getNutrientKeyByIndex(index);
                    window.nutrientManager.incrementNutrient(nutrientName);
                }
            }
        };

        this.chart = new Chart(this.ctx, {
            type: 'radar',
            data: chartData,
            options: chartOptions
        });
    }

    getNutrientKeyByIndex(index) {
        const nutrients = [
            'protein',
            'vitaminA',
            'vitaminC',
            'vitaminD',
            'calcium',
            'iron',
            'fiber',
            'carbs'
        ];
        return nutrients[index];
    }

    updateData(nutrientData) {
        const values = [
            nutrientData.protein * 33.33,
            nutrientData.vitaminA * 33.33,
            nutrientData.vitaminC * 33.33,
            nutrientData.vitaminD * 33.33,
            nutrientData.calcium * 33.33,
            nutrientData.iron * 33.33,
            nutrientData.fiber * 33.33,
            nutrientData.carbs * 33.33
        ];

        this.chart.data.datasets[0].data = values;

        const allMax = values.every(v => v >= 99);
        if (allMax) {
            this.chart.data.datasets[0].backgroundColor = 'rgba(255, 215, 0, 0.6)';
            this.chart.data.datasets[0].borderColor = 'rgba(255, 215, 0, 1)';
        }

        this.chart.update('active');
    }

    reset() {
        this.chart.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0];
        this.chart.data.datasets[0].backgroundColor = 'rgba(102, 126, 234, 0.4)';
        this.chart.data.datasets[0].borderColor = 'rgba(102, 126, 234, 1)';
        this.chart.update();
    }
}