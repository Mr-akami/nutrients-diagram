class NutrientManager {
    constructor() {
        this.nutrients = {
            protein: 0,
            vitaminA: 0,
            vitaminC: 0,
            vitaminD: 0,
            calcium: 0,
            iron: 0,
            fiber: 0,
            carbs: 0
        };

        this.foodNutrients = {
            broccoli: ['vitaminC', 'fiber', 'vitaminA'],
            pork: ['protein', 'iron', 'vitaminD'],
            fish: ['protein', 'vitaminD', 'calcium'],
            carrot: ['vitaminA', 'fiber', 'carbs'],
            milk: ['calcium', 'protein', 'vitaminD'],
            rice: ['carbs', 'fiber', 'iron'],
            orange: ['vitaminC', 'fiber', 'carbs'],
            spinach: ['iron', 'vitaminA', 'calcium']
        };

        this.chart = null;
        this.initEventListeners();
        this.clickSound = this.createClickSound();
        this.celebrationActive = false;
    }

    initEventListeners() {
        document.querySelectorAll('.food-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const foodName = item.dataset.food;
                this.eatFood(foodName);
            });
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetAll();
        });
    }

    eatFood(foodName) {
        const nutrients = this.foodNutrients[foodName];
        if (!nutrients) return;

        let updated = false;
        let hasMaxNutrient = false;

        nutrients.forEach(nutrient => {
            if (this.nutrients[nutrient] < 3) {
                this.nutrients[nutrient]++;
                updated = true;

                if (this.chart) {
                    this.chart.updateNutrient(nutrient, this.nutrients[nutrient], false);
                }
            } else {
                hasMaxNutrient = true;
            }
        });

        if (hasMaxNutrient && this.chart) {
            this.chart.changeMaxColors();
            this.chart.draw();
            this.createMaxFlash();
        }

        if (updated || hasMaxNutrient) {
            this.updateScore();
            this.playClickSound();
            this.addFoodAnimation(foodName);
            this.showNutrientPopups(foodName, nutrients);

            if (this.checkAllMax() && !this.celebrationActive) {
                setTimeout(() => {
                    this.megaCelebrate();
                }, 500);
            }
        }
    }

    incrementNutrient(nutrientName) {
        if (this.nutrients[nutrientName] < 3) {
            this.nutrients[nutrientName]++;
            this.updateScore();
            this.playClickSound();

            if (this.chart) {
                this.chart.updateNutrient(nutrientName, this.nutrients[nutrientName], false);
            }

            if (this.checkAllMax() && !this.celebrationActive) {
                setTimeout(() => {
                    this.megaCelebrate();
                }, 500);
            }
        } else {
            if (this.chart) {
                this.chart.changeMaxColors();
                this.chart.draw();
                this.createMaxFlash();
            }
        }
    }

    createMaxFlash() {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255,215,0,0.3), transparent);
            z-index: 999;
            pointer-events: none;
            animation: flashPulse 0.5s ease-out;
        `;
        document.body.appendChild(flash);

        setTimeout(() => {
            flash.remove();
        }, 500);
    }

    updateScore() {
        const totalScore = Object.values(this.nutrients).reduce((sum, val) => sum + val, 0);
        document.getElementById('scoreValue').textContent = totalScore;
    }

    addFoodAnimation(foodName) {
        const item = document.querySelector(`[data-food="${foodName}"]`);
        const icon = item.querySelector('.food-icon');

        icon.style.animation = 'none';
        item.style.transform = 'scale(0.95)';

        setTimeout(() => {
            icon.style.animation = 'foodBounce 0.5s ease-out';
            item.style.transform = 'scale(1.05)';
        }, 10);

        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 250);

        setTimeout(() => {
            icon.style.animation = '';
        }, 510);
    }

    showNutrientPopups(foodName, nutrients) {
        const item = document.querySelector(`[data-food="${foodName}"]`);
        const rect = item.getBoundingClientRect();

        nutrients.forEach((nutrient, index) => {
            const currentLevel = this.nutrients[nutrient];
            const isMax = currentLevel >= 3;

            const popup = document.createElement('div');
            popup.className = 'nutrient-popup';
            popup.textContent = isMax ? `MAX! ${this.getNutrientLabel(nutrient)}` : `+1 ${this.getNutrientLabel(nutrient)}`;
            popup.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top - 10 - (index * 30)}px;
                transform: translateX(-50%);
                background: ${isMax ? 'linear-gradient(135deg, #FFD700, #FFA500)' : 'linear-gradient(135deg, #667eea, #764ba2)'};
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: bold;
                font-size: ${isMax ? '16px' : '14px'};
                z-index: 1000;
                animation: ${isMax ? 'floatUpGold' : 'floatUp'} 1.5s ease-out forwards;
                pointer-events: none;
            `;
            document.body.appendChild(popup);

            setTimeout(() => {
                popup.remove();
            }, 1500);
        });
    }

    getNutrientLabel(nutrient) {
        const labels = {
            protein: 'タンパク質',
            vitaminA: 'ビタミンA',
            vitaminC: 'ビタミンC',
            vitaminD: 'ビタミンD',
            calcium: 'カルシウム',
            iron: '鉄分',
            fiber: '食物繊維',
            carbs: '炭水化物'
        };
        return labels[nutrient] || nutrient;
    }

    checkAllMax() {
        return Object.values(this.nutrients).every(value => value === 3);
    }

    megaCelebrate() {
        this.celebrationActive = true;

        // Create giant message
        const message = document.createElement('div');
        message.innerHTML = `
            <h1 style="font-size: 5em; margin: 0;">🎊 完璧！ 🎊</h1>
            <p style="font-size: 2em;">すべての栄養をMAXにした！</p>
            <p style="font-size: 1.5em;">きみは栄養マスターだ！</p>
        `;
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: white;
            z-index: 2001;
            animation: megaBounce 3s ease-out;
            text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
            pointer-events: none;
        `;
        document.body.appendChild(message);

        // Rainbow background flash
        const rainbow = document.createElement('div');
        rainbow.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg,
                #FF6B6B, #4ECDC4, #45B7D1, #FFEAA7,
                #DDA0DD, #98D8C8, #FFB6C1, #FF6B6B);
            background-size: 800% 800%;
            z-index: 2000;
            opacity: 0.8;
            animation: rainbowWave 3s ease-out;
            pointer-events: none;
        `;
        document.body.appendChild(rainbow);

        // Massive confetti
        this.superConfetti();

        // Create fireworks
        this.createFireworks();

        // Clean up after animation
        setTimeout(() => {
            message.remove();
            rainbow.remove();
            this.celebrationActive = false;
        }, 3000);
    }

    superConfetti() {
        const duration = 3000;
        const animationEnd = Date.now() + duration;

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            // Multiple confetti bursts
            for (let i = 0; i < 3; i++) {
                confetti({
                    particleCount: 100,
                    angle: 60 + i * 60,
                    spread: 100,
                    origin: { x: 0, y: 0.6 },
                    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFEAA7', '#DDA0DD'],
                    startVelocity: 45,
                    ticks: 200,
                    zIndex: 2002
                });

                confetti({
                    particleCount: 100,
                    angle: 120 - i * 60,
                    spread: 100,
                    origin: { x: 1, y: 0.6 },
                    colors: ['#98D8C8', '#FFB6C1', '#96CEB4', '#F9CA24', '#F0932B'],
                    startVelocity: 45,
                    ticks: 200,
                    zIndex: 2002
                });
            }
        }, 200);
    }

    createFireworks() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const x = Math.random();
                const y = Math.random() * 0.5;

                confetti({
                    particleCount: 150,
                    spread: 360,
                    origin: { x, y },
                    colors: ['#FFD700', '#FF69B4', '#00CED1', '#FF4500', '#32CD32'],
                    startVelocity: 30,
                    gravity: 0.5,
                    ticks: 100,
                    zIndex: 2002
                });

                // Create explosion effect
                const explosion = document.createElement('div');
                explosion.style.cssText = `
                    position: fixed;
                    left: ${x * 100}%;
                    top: ${y * 100}%;
                    width: 100px;
                    height: 100px;
                    background: radial-gradient(circle, rgba(255,255,255,0.8), transparent);
                    border-radius: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    z-index: 2001;
                    animation: explode 0.5s ease-out;
                    pointer-events: none;
                `;
                document.body.appendChild(explosion);

                setTimeout(() => {
                    explosion.remove();
                }, 500);
            }, i * 400);
        }
    }

    resetAll() {
        Object.keys(this.nutrients).forEach(key => {
            this.nutrients[key] = 0;
        });

        document.getElementById('scoreValue').textContent = '0';

        if (this.chart) {
            this.chart.reset();
        }

        this.celebrationActive = false;
    }

    createClickSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        return function() {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.05);
        };
    }

    playClickSound() {
        try {
            this.clickSound();
        } catch (e) {
            console.log('Sound effect not available');
        }
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes foodBounce {
        0% { transform: rotate(0deg) scale(1); }
        25% { transform: rotate(-10deg) scale(1.1); }
        50% { transform: rotate(10deg) scale(1.2); }
        75% { transform: rotate(-5deg) scale(1.1); }
        100% { transform: rotate(0deg) scale(1); }
    }
    @keyframes floatUp {
        0% {
            opacity: 0;
            transform: translateX(-50%) translateY(0);
        }
        20% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-60px);
        }
    }
    @keyframes floatUpGold {
        0% {
            opacity: 0;
            transform: translateX(-50%) translateY(0) scale(1);
        }
        20% {
            opacity: 1;
            transform: translateX(-50%) translateY(-10px) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-80px) scale(0.8) rotate(360deg);
        }
    }
    @keyframes flashPulse {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    @keyframes rainbowWave {
        0% {
            opacity: 0;
            background-position: 0% 50%;
        }
        50% {
            opacity: 0.8;
            background-position: 100% 50%;
        }
        100% {
            opacity: 0;
            background-position: 200% 50%;
        }
    }
    @keyframes megaBounce {
        0% {
            transform: translate(-50%, -50%) scale(0);
        }
        30% {
            transform: translate(-50%, -50%) scale(1.2);
        }
        50% {
            transform: translate(-50%, -50%) scale(0.9);
        }
        70% {
            transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
            transform: translate(-50%, -50%) scale(1) rotate(360deg);
        }
    }
    @keyframes explode {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

window.addEventListener('DOMContentLoaded', () => {
    window.dartsChart = new DartsChart();
    window.nutrientManager = new NutrientManager();
    window.nutrientManager.chart = window.dartsChart;
});