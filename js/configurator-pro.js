// PRO Configurator - Advanced Interactive System

const MATERIALS = [
    {
        id: 'brick-red',
        name: 'Красный клинкер',
        type: 'brick',
        price: 890,
        image: 'https://via.placeholder.com/300x300/C1440E/FFFFFF?text=Красный',
        colors: ['#C1440E', '#B83A0C', '#A03209']
    },
    {
        id: 'brick-white',
        name: 'Белый песчаник',
        type: 'brick',
        price: 920,
        image: 'https://via.placeholder.com/300x300/F5F5DC/333333?text=Белый',
        colors: ['#F5F5DC', '#EEE8D5', '#E0D5B5']
    },
    {
        id: 'brick-gray',
        name: 'Серый камень',
        type: 'brick',
        price: 870,
        image: 'https://via.placeholder.com/300x300/808080/FFFFFF?text=Серый',
        colors: ['#808080', '#6C6C6C', '#565656']
    },
    {
        id: 'brick-terra',
        name: 'Терракота',
        type: 'brick',
        price: 850,
        image: 'https://via.placeholder.com/300x300/D2691E/FFFFFF?text=Терракота',
        colors: ['#D2691E', '#C55E18', '#B85412']
    },
    {
        id: 'panel-premium',
        name: 'Премиум ППС 60мм',
        type: 'panel',
        price: 1290,
        image: 'https://via.placeholder.com/300x300/667eea/FFFFFF?text=Премиум',
        colors: ['#667eea', '#5568D3', '#4453BC']
    },
    {
        id: 'panel-eco',
        name: 'Эконом ППС 40мм',
        type: 'panel',
        price: 990,
        image: 'https://via.placeholder.com/300x300/764ba2/FFFFFF?text=Эконом',
        colors: ['#764ba2', '#653D8C', '#543076']
    }
];

const COLORS = {
    upper: [
        { name: 'Красный', hex: '#C1440E' },
        { name: 'Белый', hex: '#F5F5DC' },
        { name: 'Желтый', hex: '#DAA520' },
        { name: 'Серый', hex: '#808080' },
        { name: 'Коричневый', hex: '#8B4513' },
        { name: 'Терракота', hex: '#D2691E' },
        { name: 'Бежевый', hex: '#D2B48C' },
        { name: 'Графит', hex: '#4A4A4A' }
    ],
    lower: [
        { name: 'Темно-серый', hex: '#4A4A4A' },
        { name: 'Графит', hex: '#2C2C2C' },
        { name: 'Коричневый', hex: '#654321' },
        { name: 'Бордовый', hex: '#800020' },
        { name: 'Черный', hex: '#1A1A1A' },
        { name: 'Песочный', hex: '#A0826D' }
    ],
    roof: [
        { name: 'Коричневый', hex: '#8B4513' },
        { name: 'Красный', hex: '#A0352B' },
        { name: 'Серый', hex: '#5A5A5A' },
        { name: 'Зеленый', hex: '#2F4F2F' },
        { name: 'Черный', hex: '#2C2C2C' }
    ]
};

class ProConfigurator {
    constructor() {
        this.canvas = document.getElementById('houseCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.state = {
            model: 'modern',
            material: MATERIALS[0],
            colors: {
                upper: '#C1440E',
                lower: '#4A4A4A',
                roof: '#8B4513'
            },
            details: {
                windows: true,
                corners: true,
                decor: false
            },
            zoom: 1,
            activeZone: 'upper',
            area: 150
        };
        this.init();
    }

    init() {
        this.renderMaterials();
        this.renderColors();
        this.attachEvents();
        this.draw();
        this.updatePrice();
    }

    renderMaterials() {
        const grid = document.getElementById('materialGrid');
        grid.innerHTML = '';
        
        MATERIALS.forEach((material, index) => {
            const card = document.createElement('div');
            card.className = `material-card ${index === 0 ? 'selected' : ''}`;
            card.innerHTML = `
                <img src="${material.image}" alt="${material.name}">
                <div class="material-info">
                    <div class="material-name">${material.name}</div>
                    <div class="material-price">от ${material.price} ₽/м²</div>
                </div>
            `;
            card.addEventListener('click', () => this.selectMaterial(material, card));
            grid.appendChild(card);
        });
    }

    selectMaterial(material, element) {
        document.querySelectorAll('.material-card').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        this.state.material = material;
        this.draw();
        this.updatePrice();
    }

    renderColors() {
        const grid = document.getElementById('colorGrid');
        this.updateColorGrid();

        // Zone buttons
        document.querySelectorAll('.zone-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.zone-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.state.activeZone = e.target.dataset.target;
                this.updateColorGrid();
            });
        });
    }

    updateColorGrid() {
        const grid = document.getElementById('colorGrid');
        const colors = COLORS[this.state.activeZone] || COLORS.upper;
        
        grid.innerHTML = '';
        colors.forEach(color => {
            const item = document.createElement('div');
            item.className = 'color-item';
            item.style.backgroundColor = color.hex;
            item.title = color.name;
            
            if (this.state.colors[this.state.activeZone] === color.hex) {
                item.classList.add('selected');
            }
            
            item.addEventListener('click', () => {
                this.state.colors[this.state.activeZone] = color.hex;
                this.updateColorGrid();
                this.draw();
            });
            
            grid.appendChild(item);
        });
    }

    attachEvents() {
        // Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                e.currentTarget.classList.add('active');
                document.getElementById(`${tab}Tab`).classList.add('active');
            });
        });

        // Model selector
        document.querySelectorAll('.model-item').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelectorAll('.model-item').forEach(i => i.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.state.model = e.currentTarget.dataset.model;
                this.draw();
            });
        });

        // View controls
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                if (view === 'zoom-in') this.state.zoom = Math.min(this.state.zoom * 1.2, 2);
                if (view === 'zoom-out') this.state.zoom = Math.max(this.state.zoom / 1.2, 0.5);
                this.draw();
            });
        });

        // Details toggles
        ['windows', 'corners', 'decor'].forEach(key => {
            const toggle = document.getElementById(`${key}Toggle`);
            if (toggle) {
                toggle.addEventListener('change', (e) => {
                    this.state.details[key] = e.target.checked;
                    this.draw();
                });
            }
        });

        // Modal
        document.getElementById('getQuoteBtn').addEventListener('click', () => {
            document.getElementById('quoteModal').classList.add('active');
        });

        document.getElementById('closeModal').addEventListener('click', () => {
            document.getElementById('quoteModal').classList.remove('active');
        });

        document.getElementById('quoteForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendQuote(new FormData(e.target));
        });

        // Save button
        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveProject();
        });

        // Zone hotspots
        document.querySelectorAll('.zone-hotspot').forEach(zone => {
            zone.addEventListener('click', () => {
                const zoneType = zone.dataset.zone;
                this.state.activeZone = zoneType;
                document.querySelectorAll('.zone-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.target === zoneType);
                });
                this.updateColorGrid();
                // Switch to colors tab
                document.querySelector('[data-tab="colors"]').click();
            });
        });
    }

    draw() {
        const { ctx, canvas, state } = this;
        const { colors, details, zoom } = state;

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Apply zoom
        ctx.save();
        ctx.scale(zoom, zoom);
        ctx.translate((canvas.width / zoom - canvas.width) / 2, (canvas.height / zoom - canvas.height) / 2);

        // Sky gradient
        const skyGrad = ctx.createLinearGradient(0, 0, 0, 400);
        skyGrad.addColorStop(0, '#87CEEB');
        skyGrad.addColorStop(1, '#E0F6FF');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, canvas.width, 400);

        // Ground
        const groundGrad = ctx.createLinearGradient(0, 400, 0, canvas.height);
        groundGrad.addColorStop(0, '#90C060');
        groundGrad.addColorStop(1, '#7AB050');
        ctx.fillStyle = groundGrad;
        ctx.fillRect(0, 400, canvas.width, canvas.height - 400);

        // Sun
        const sunGrad = ctx.createRadialGradient(900, 150, 30, 900, 150, 80);
        sunGrad.addColorStop(0, '#FFD700');
        sunGrad.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(900, 150, 80, 0, Math.PI * 2);
        ctx.fill();

        // House shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(600, 820, 350, 40, 0, 0, Math.PI * 2);
        ctx.fill();

        // Roof with gradient
        const roofGrad = ctx.createLinearGradient(250, 250, 950, 250);
        roofGrad.addColorStop(0, this.adjustColor(colors.roof, -20));
        roofGrad.addColorStop(0.5, colors.roof);
        roofGrad.addColorStop(1, this.adjustColor(colors.roof, -30));
        ctx.fillStyle = roofGrad;
        ctx.beginPath();
        ctx.moveTo(600, 180);
        ctx.lineTo(950, 350);
        ctx.lineTo(950, 370);
        ctx.lineTo(250, 370);
        ctx.lineTo(250, 350);
        ctx.closePath();
        ctx.fill();

        // Roof ridge
        ctx.strokeStyle = this.adjustColor(colors.roof, -40);
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(600, 180);
        ctx.lineTo(950, 350);
        ctx.stroke();

        // Upper facade with texture
        ctx.fillStyle = colors.upper;
        ctx.fillRect(250, 350, 700, 300);
        this.drawTexture(250, 350, 700, 300, colors.upper, state.material.type);

        // Lower facade (base) with gradient
        const baseGrad = ctx.createLinearGradient(250, 650, 250, 800);
        baseGrad.addColorStop(0, this.adjustColor(colors.lower, 10));
        baseGrad.addColorStop(1, colors.lower);
        ctx.fillStyle = baseGrad;
        ctx.fillRect(250, 650, 700, 150);
        this.drawTexture(250, 650, 700, 150, colors.lower, state.material.type);

        // Windows with shadows and frames
        if (details.windows) {
            this.drawWindow(350, 430, 150, 180);
            this.drawWindow(700, 430, 150, 180);
        }

        // Door with details
        this.drawDoor(520, 540, 160, 260);

        // Corners
        if (details.corners) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.fillRect(245, 350, 15, 450);
            ctx.fillRect(940, 350, 15, 450);
        }

        ctx.restore();
    }

    drawTexture(x, y, w, h, color, type) {
        const { ctx } = this;
        
        if (type === 'brick') {
            ctx.strokeStyle = this.adjustColor(color, -30);
            ctx.lineWidth = 2;
            const bh = 30;
            const bw = 100;

            for (let row = 0; row < h / bh; row++) {
                for (let col = 0; col < w / bw; col++) {
                    const offset = row % 2 === 0 ? 0 : bw / 2;
                    ctx.strokeRect(x + col * bw + offset, y + row * bh, bw, bh);
                }
            }
        } else {
            // Panel texture
            ctx.strokeStyle = this.adjustColor(color, -20);
            ctx.lineWidth = 3;
            const pw = 120;
            for (let i = 0; i < w / pw; i++) {
                ctx.beginPath();
                ctx.moveTo(x + i * pw, y);
                ctx.lineTo(x + i * pw, y + h);
                ctx.stroke();
            }
        }
    }

    drawWindow(x, y, w, h) {
        const { ctx } = this;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(x + 5, y + 5, w, h);

        // Glass with gradient
        const glassGrad = ctx.createLinearGradient(x, y, x, y + h);
        glassGrad.addColorStop(0, '#B0D4F1');
        glassGrad.addColorStop(0.5, '#87CEEB');
        glassGrad.addColorStop(1, '#6BB0D8');
        ctx.fillStyle = glassGrad;
        ctx.fillRect(x, y, w, h);

        // Frame
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 8;
        ctx.strokeRect(x, y, w, h);

        // Cross
        ctx.beginPath();
        ctx.moveTo(x + w / 2, y);
        ctx.lineTo(x + w / 2, y + h);
        ctx.moveTo(x, y + h / 2);
        ctx.lineTo(x + w, y + h / 2);
        ctx.stroke();

        // Reflection
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(x + 10, y + 10, w / 3, h / 4);
    }

    drawDoor(x, y, w, h) {
        const { ctx } = this;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(x + 5, y + 5, w, h);

        // Door with wood texture
        const doorGrad = ctx.createLinearGradient(x, y, x + w, y);
        doorGrad.addColorStop(0, '#654321');
        doorGrad.addColorStop(0.5, '#8B5A3C');
        doorGrad.addColorStop(1, '#654321');
        ctx.fillStyle = doorGrad;
        ctx.fillRect(x, y, w, h);

        // Frame
        ctx.strokeStyle = '#4A3319';
        ctx.lineWidth = 6;
        ctx.strokeRect(x, y, w, h);

        // Panels
        ctx.strokeStyle = '#4A3319';
        ctx.lineWidth = 4;
        const panelMargin = 15;
        ctx.strokeRect(x + panelMargin, y + panelMargin, w - panelMargin * 2, (h - panelMargin * 3) / 2);
        ctx.strokeRect(x + panelMargin, y + panelMargin + (h - panelMargin * 3) / 2 + panelMargin, w - panelMargin * 2, (h - panelMargin * 3) / 2);

        // Handle
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(x + w - 30, y + h / 2, 8, 0, Math.PI * 2);
        ctx.fill();
    }

    adjustColor(color, amount) {
        const num = parseInt(color.replace('#', ''), 16);
        const r = Math.max(0, Math.min(255, (num >> 16) + amount));
        const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
        const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
        return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
    }

    updatePrice() {
        const price = this.state.area * this.state.material.price;
        document.getElementById('totalPrice').textContent = `${price.toLocaleString('ru-RU')} ₽`;
        document.getElementById('totalArea').textContent = `${this.state.area} м²`;
    }

    saveProject() {
        const link = document.createElement('a');
        link.download = `facade-pro-${Date.now()}.png`;
        link.href = this.canvas.toDataURL('image/png', 1.0);
        link.click();
        alert('✅ Проект сохранен в высоком качестве!');
    }

    sendQuote(formData) {
        const data = {
            ...Object.fromEntries(formData),
            config: this.state,
            image: this.canvas.toDataURL('image/png', 0.8)
        };
        
        console.log('Sending quote request:', data);
        
        document.getElementById('quoteModal').classList.remove('active');
        alert('✅ Заявка отправлена! Мы свяжемся с вами в течение 15 минут.');
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ProConfigurator();
    });
} else {
    new ProConfigurator();
}