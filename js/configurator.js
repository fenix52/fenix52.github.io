// Configurator Logic

const COLORS = {
    upper: [
        { name: 'Красный клинкер', hex: '#C1440E' },
        { name: 'Белый кирпич', hex: '#F5F5DC' },
        { name: 'Желтый песчаник', hex: '#DAA520' },
        { name: 'Серый камень', hex: '#808080' },
        { name: 'Коричневый', hex: '#8B4513' },
        { name: 'Терракота', hex: '#D2691E' }
    ],
    lower: [
        { name: 'Темно-серый', hex: '#4A4A4A' },
        { name: 'Графит', hex: '#2C2C2C' },
        { name: 'Коричневый цоколь', hex: '#654321' },
        { name: 'Бордовый', hex: '#800020' }
    ]
};

class FacadeConfigurator {
    constructor() {
        this.canvas = document.getElementById('houseCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.state = {
            material: 'brick',
            upperColor: '#C1440E',
            lowerColor: '#4A4A4A',
            windowFrames: true,
            corners: true,
            decorElements: false
        };
        this.init();
    }

    init() {
        this.renderColorPickers();
        this.attachEventListeners();
        this.draw();
    }

    renderColorPickers() {
        // Upper colors
        const upperContainer = document.getElementById('upperColors');
        COLORS.upper.forEach(color => {
            const option = this.createColorOption(color, 'upper');
            upperContainer.appendChild(option);
        });

        // Lower colors
        const lowerContainer = document.getElementById('lowerColors');
        COLORS.lower.forEach(color => {
            const option = this.createColorOption(color, 'lower');
            lowerContainer.appendChild(option);
        });

        // Set first options as active
        upperContainer.firstChild?.classList.add('active');
        lowerContainer.firstChild?.classList.add('active');
    }

    createColorOption(color, type) {
        const option = document.createElement('div');
        option.className = 'color-option';
        option.innerHTML = `
            <div class="color-swatch" style="background-color: ${color.hex}"></div>
            <div class="color-name">${color.name}</div>
        `;
        option.addEventListener('click', () => {
            this.selectColor(color.hex, type, option);
        });
        return option;
    }

    selectColor(hex, type, element) {
        // Update state
        if (type === 'upper') {
            this.state.upperColor = hex;
            document.querySelectorAll('#upperColors .color-option').forEach(el => {
                el.classList.remove('active');
            });
        } else {
            this.state.lowerColor = hex;
            document.querySelectorAll('#lowerColors .color-option').forEach(el => {
                el.classList.remove('active');
            });
        }
        element.classList.add('active');
        this.draw();
    }

    attachEventListeners() {
        // Material buttons
        document.querySelectorAll('.material-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.material-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.state.material = e.currentTarget.dataset.material;
                this.draw();
            });
        });

        // Checkboxes
        document.getElementById('windowFrames').addEventListener('change', (e) => {
            this.state.windowFrames = e.target.checked;
            this.draw();
        });
        document.getElementById('corners').addEventListener('change', (e) => {
            this.state.corners = e.target.checked;
            this.draw();
        });
        document.getElementById('decorElements').addEventListener('change', (e) => {
            this.state.decorElements = e.target.checked;
            this.draw();
        });

        // Action buttons
        document.getElementById('saveProject').addEventListener('click', () => this.saveProject());
        document.getElementById('sendEstimate').addEventListener('click', () => this.sendEstimate());
    }

    draw() {
        const { ctx, canvas } = this;
        const { upperColor, lowerColor, material, windowFrames, corners } = this.state;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Sky
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, canvas.width, 300);

        // Ground
        ctx.fillStyle = '#90EE90';
        ctx.fillRect(0, 300, canvas.width, canvas.height - 300);

        // Roof
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.moveTo(300, 150);
        ctx.lineTo(500, 280);
        ctx.lineTo(100, 280);
        ctx.closePath();
        ctx.fill();

        // Roof shadow
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.beginPath();
        ctx.moveTo(300, 150);
        ctx.lineTo(500, 280);
        ctx.lineTo(480, 290);
        ctx.lineTo(300, 165);
        ctx.closePath();
        ctx.fill();

        // Upper facade
        ctx.fillStyle = upperColor;
        ctx.fillRect(100, 280, 400, 240);

        // Draw texture
        this.drawTexture(100, 280, 400, 240, upperColor, material);

        // Lower facade (base)
        ctx.fillStyle = lowerColor;
        ctx.fillRect(100, 520, 400, 120);
        this.drawTexture(100, 520, 400, 120, lowerColor, material);

        // Windows
        const windowColor = windowFrames ? '#FFFFFF' : '#87CEEB';
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(150, 340, 100, 120);
        ctx.fillRect(350, 340, 100, 120);

        // Window frames
        if (windowFrames) {
            ctx.strokeStyle = windowColor;
            ctx.lineWidth = 8;
            ctx.strokeRect(150, 340, 100, 120);
            ctx.strokeRect(350, 340, 100, 120);
        }

        // Door
        ctx.fillStyle = '#654321';
        ctx.fillRect(260, 470, 80, 170);

        // Door frame
        ctx.strokeStyle = windowFrames ? windowColor : '#654321';
        ctx.lineWidth = 6;
        ctx.strokeRect(260, 470, 80, 170);

        // Corners
        if (corners) {
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.fillRect(95, 280, 10, 360);
            ctx.fillRect(495, 280, 10, 360);
        }

        // Ground line
        ctx.strokeStyle = '#8B7355';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 640);
        ctx.lineTo(canvas.width, 640);
        ctx.stroke();
    }

    drawTexture(x, y, w, h, color, material) {
        const { ctx } = this;

        if (material === 'brick') {
            // Brick texture
            ctx.strokeStyle = 'rgba(0,0,0,0.15)';
            ctx.lineWidth = 2;

            const brickHeight = 25;
            const brickWidth = 80;

            for (let row = 0; row < h / brickHeight; row++) {
                for (let col = 0; col < w / brickWidth; col++) {
                    const offsetX = row % 2 === 0 ? 0 : brickWidth / 2;
                    ctx.strokeRect(
                        x + col * brickWidth + offsetX,
                        y + row * brickHeight,
                        brickWidth,
                        brickHeight
                    );
                }
            }
        } else {
            // Panel texture
            ctx.strokeStyle = 'rgba(0,0,0,0.1)';
            ctx.lineWidth = 3;

            const panelWidth = 100;
            for (let i = 0; i < w / panelWidth; i++) {
                ctx.beginPath();
                ctx.moveTo(x + i * panelWidth, y);
                ctx.lineTo(x + i * panelWidth, y + h);
                ctx.stroke();
            }
        }
    }

    saveProject() {
        const link = document.createElement('a');
        link.download = `facade-project-${Date.now()}.png`;
        link.href = this.canvas.toDataURL();
        link.click();
        alert('✅ Проект сохранен!');
    }

    sendEstimate() {
        const data = {
            material: this.state.material === 'brick' ? 'Гибкий кирпич' : 'Термопанели',
            upperColor: this.state.upperColor,
            lowerColor: this.state.lowerColor,
            image: this.canvas.toDataURL()
        };
        console.log('Sending estimate:', data);
        alert('📧 Запрос на расчет отправлен! Мы свяжемся с вами в течение 15 минут.');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new FacadeConfigurator();
    });
} else {
    new FacadeConfigurator();
}