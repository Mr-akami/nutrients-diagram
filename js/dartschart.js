class DartsChart {
    constructor() {
        this.canvas = document.getElementById('nutrientChart');
        this.ctx = this.canvas.getContext('2d');
        this.colorPalettes = [
            ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#FFB6C1'],
            ['#FF9FF3', '#54A0FF', '#48DBFB', '#1DD1A1', '#FECA57', '#FF6B9D', '#C44569', '#F8B195'],
            ['#FC5C65', '#FD79A8', '#A29BFE', '#6C5CE7', '#FFA502', '#FF6348', '#20BF6B', '#26DE81'],
            ['#F53B57', '#3C40C6', '#0FBCF9', '#00D8D6', '#FFC048', '#FF5E57', '#05C46B', '#FFA801']
        ];
        this.currentPaletteIndex = 0;
        this.nutrients = {
            protein: { label: 'タンパク質', icon: '🥩', level: 0, color: this.colorPalettes[0][0] },
            vitaminA: { label: 'ビタミンA', icon: '🥕', level: 0, color: this.colorPalettes[0][1] },
            vitaminC: { label: 'ビタミンC', icon: '🍊', level: 0, color: this.colorPalettes[0][2] },
            vitaminD: { label: 'ビタミンD', icon: '🐟', level: 0, color: this.colorPalettes[0][3] },
            calcium: { label: 'カルシウム', icon: '🥛', level: 0, color: this.colorPalettes[0][4] },
            iron: { label: '鉄分', icon: '🥬', level: 0, color: this.colorPalettes[0][5] },
            fiber: { label: '食物繊維', icon: '🌾', level: 0, color: this.colorPalettes[0][6] },
            carbs: { label: '炭水化物', icon: '🍚', level: 0, color: this.colorPalettes[0][7] }
        };
        this.sectors = [];
        this.centerX = 0;
        this.centerY = 0;
        this.radius = 0;
        this.init();
    }

    init() {
        this.setupCanvas();
        this.calculateSectors();
        this.draw();
        this.setupEventListeners();
    }

    setupCanvas() {
        const container = this.canvas.parentElement;
        const size = Math.min(container.offsetWidth - 40, container.offsetHeight - 40);
        this.canvas.width = size;
        this.canvas.height = size;
        this.centerX = size / 2;
        this.centerY = size / 2;
        this.radius = size / 2 - 60;
    }

    calculateSectors() {
        const nutrientKeys = Object.keys(this.nutrients);
        const angleStep = (Math.PI * 2) / nutrientKeys.length;

        this.sectors = nutrientKeys.map((key, index) => {
            const startAngle = index * angleStep - Math.PI / 2;
            const endAngle = (index + 1) * angleStep - Math.PI / 2;
            return {
                key,
                startAngle,
                endAngle,
                midAngle: (startAngle + endAngle) / 2
            };
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawBackground();
        this.drawSectors();
        this.drawGrid();
        this.drawLabels();
    }

    drawBackground() {
        this.ctx.fillStyle = '#f8f9fa';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 3; i > 0; i--) {
            this.ctx.beginPath();
            this.ctx.arc(this.centerX, this.centerY, (this.radius / 3) * i, 0, Math.PI * 2);
            this.ctx.fillStyle = i === 3 ? '#ffffff' : '#f8f9fa';
            this.ctx.fill();
            this.ctx.strokeStyle = '#e0e0e0';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
    }

    drawSectors() {
        this.sectors.forEach(sector => {
            const nutrient = this.nutrients[sector.key];
            const level = nutrient.level;

            if (level > 0) {
                for (let i = 1; i <= level; i++) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.centerX, this.centerY);

                    const innerRadius = i === 1 ? 0 : (this.radius / 3) * (i - 1);
                    const outerRadius = (this.radius / 3) * i;

                    this.ctx.arc(this.centerX, this.centerY, outerRadius, sector.startAngle, sector.endAngle);

                    if (innerRadius > 0) {
                        const endX = this.centerX + Math.cos(sector.endAngle) * innerRadius;
                        const endY = this.centerY + Math.sin(sector.endAngle) * innerRadius;
                        this.ctx.lineTo(endX, endY);

                        this.ctx.arc(this.centerX, this.centerY, innerRadius, sector.endAngle, sector.startAngle, true);
                    }

                    this.ctx.closePath();

                    const opacity = 0.3 + (i * 0.25);
                    this.ctx.fillStyle = this.hexToRgba(nutrient.color, opacity);
                    this.ctx.fill();

                    if (i === level) {
                        this.ctx.strokeStyle = nutrient.color;
                        this.ctx.lineWidth = 2;
                        this.ctx.stroke();
                    }
                }
            }
        });
    }

    drawGrid() {
        this.sectors.forEach(sector => {
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX, this.centerY);
            const endX = this.centerX + Math.cos(sector.startAngle) * this.radius;
            const endY = this.centerY + Math.sin(sector.startAngle) * this.radius;
            this.ctx.lineTo(endX, endY);
            this.ctx.strokeStyle = '#d0d0d0';
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        });
    }

    drawLabels() {
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        this.sectors.forEach(sector => {
            const nutrient = this.nutrients[sector.key];
            const labelRadius = this.radius + 35;
            const x = this.centerX + Math.cos(sector.midAngle) * labelRadius;
            const y = this.centerY + Math.sin(sector.midAngle) * labelRadius;

            // Draw icon
            this.ctx.font = '36px sans-serif';
            this.ctx.fillStyle = nutrient.color;
            this.ctx.fillText(nutrient.icon, x, y - 15);

            // Draw label
            this.ctx.font = 'bold 12px sans-serif';
            this.ctx.fillStyle = '#333';
            this.ctx.fillText(nutrient.label, x, y + 18);
        });
    }

    setupEventListeners() {
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;

            const canvasX = x * scaleX;
            const canvasY = y * scaleY;

            this.handleClick(canvasX, canvasY);
        });

        this.canvas.style.cursor = 'pointer';
    }

    handleClick(x, y) {
        const dx = x - this.centerX;
        const dy = y - this.centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= this.radius) {
            let angle = Math.atan2(dy, dx);
            if (angle < -Math.PI / 2) {
                angle += Math.PI * 2;
            }

            const clickedSector = this.sectors.find(sector =>
                angle >= sector.startAngle && angle < sector.endAngle
            );

            if (clickedSector) {
                const ringIndex = Math.ceil(distance / (this.radius / 3));
                const targetLevel = Math.min(3, Math.max(1, ringIndex));

                if (window.nutrientManager) {
                    const currentLevel = this.nutrients[clickedSector.key].level;
                    if (currentLevel < 3) {
                        window.nutrientManager.incrementNutrient(clickedSector.key);
                    }
                }
            }
        }
    }

    updateNutrient(nutrientKey, level, isMaxAlready = false) {
        if (this.nutrients[nutrientKey]) {
            this.nutrients[nutrientKey].level = level;

            if (isMaxAlready && level === 3) {
                this.changeMaxColors();
            }

            this.draw();
        }
    }

    changeMaxColors() {
        this.currentPaletteIndex = (this.currentPaletteIndex + 1) % this.colorPalettes.length;
        const palette = this.colorPalettes[this.currentPaletteIndex];

        let index = 0;
        Object.keys(this.nutrients).forEach(key => {
            if (this.nutrients[key].level === 3) {
                this.nutrients[key].color = palette[index];
            }
            index++;
        });
    }

    reset() {
        this.currentPaletteIndex = 0;
        const palette = this.colorPalettes[0];
        let index = 0;

        Object.keys(this.nutrients).forEach(key => {
            this.nutrients[key].level = 0;
            this.nutrients[key].color = palette[index];
            index++;
        });
        this.draw();
    }

    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
}

window.addEventListener('resize', () => {
    if (window.dartsChart) {
        window.dartsChart.setupCanvas();
        window.dartsChart.calculateSectors();
        window.dartsChart.draw();
    }
});