class AnimationEffects {
    constructor() {
        this.init();
    }

    init() {
        this.addFloatingStars();
        this.addHoverEffects();
    }

    addFloatingStars() {
        const starCount = 20;
        const container = document.querySelector('.container');

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'floating-star';
            star.innerHTML = '✨';
            star.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 10}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                opacity: 0.5;
                pointer-events: none;
                z-index: -1;
            `;
            container.appendChild(star);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translateY(0) rotate(0deg);
                }
                50% {
                    transform: translateY(-20px) rotate(180deg);
                }
            }
        `;
        document.head.appendChild(style);
    }

    addHoverEffects() {
        const cards = document.querySelectorAll('.nutrient-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createSparkle(e.currentTarget);
            });
        });
    }

    createSparkle(element) {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = '⭐';

        const rect = element.getBoundingClientRect();
        sparkle.style.cssText = `
            position: fixed;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            font-size: 20px;
            pointer-events: none;
            z-index: 1000;
            animation: sparkleAnimation 1s ease-out forwards;
        `;

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }

    createSuccessAnimation() {
        const emojis = ['🎉', '🎊', '🌟', '✨', '🎈', '🏆', '🌈', '🎯'];
        const container = document.body;

        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.className = 'success-emoji';
                emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.cssText = `
                    position: fixed;
                    font-size: ${Math.random() * 30 + 20}px;
                    left: ${Math.random() * 100}vw;
                    top: 100vh;
                    z-index: 3000;
                    pointer-events: none;
                    animation: riseAndFade 3s ease-out forwards;
                `;
                container.appendChild(emoji);

                setTimeout(() => {
                    emoji.remove();
                }, 3000);
            }, i * 100);
        }
    }
}

const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes sparkleAnimation {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg) translateY(-50px);
        }
    }

    @keyframes riseAndFade {
        0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-100vh) rotate(360deg);
        }
    }

    .nutrient-card {
        position: relative;
        overflow: visible;
    }

    .nutrient-card::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24);
        border-radius: 20px;
        opacity: 0;
        z-index: -1;
        transition: opacity 0.3s ease;
        background-size: 400% 400%;
        animation: gradientShift 3s ease infinite;
    }

    .nutrient-card:hover::before {
        opacity: 0.3;
    }

    @keyframes gradientShift {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .max-level .nutrient-icon {
        animation: bounce 1s infinite, glow 2s ease-in-out infinite alternate;
    }

    @keyframes glow {
        from {
            filter: drop-shadow(0 0 5px gold);
        }
        to {
            filter: drop-shadow(0 0 20px gold) drop-shadow(0 0 40px gold);
        }
    }
`;
document.head.appendChild(animationStyle);

window.addEventListener('DOMContentLoaded', () => {
    window.animationEffects = new AnimationEffects();

    const originalCelebrate = window.nutrientManager.celebrate.bind(window.nutrientManager);
    window.nutrientManager.celebrate = function() {
        originalCelebrate();
        window.animationEffects.createSuccessAnimation();
    };
});