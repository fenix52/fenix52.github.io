// PRO Configurator v2 - Enhanced with AI & Real Materials

const MATERIALS_LIBRARY = {
    flexBrick: [
        {
            id: 'fb-red-classic',
            name: 'Красный клинкер «Классика»',
            category: 'Гибкий кирпич',
            price: 890,
            priceUnit: 'м²',
            texture: '/images/materials/brick-red-classic.jpg',
            colors: ['#C1440E', '#B83A0C', '#A03209'],
            description: 'Традиционный красный кирпич с натуральной текстурой',
            popular: true
        },
        {
            id: 'fb-white-sand',
            name: 'Белый песчаник «Прованс»',
            category: 'Гибкий кирпич',
            price: 920,
            priceUnit: 'м²',
            texture: '/images/materials/brick-white.jpg',
            colors: ['#F5F5DC', '#EEE8D5', '#E0D5B5'],
            description: 'Светлый песчаник в средиземноморском стиле',
            popular: true
        },
        {
            id: 'fb-gray-loft',
            name: 'Серый камень «Лофт»',
            category: 'Гибкий кирпич',
            price: 870,
            priceUnit: 'м²',
            texture: '/images/materials/brick-gray.jpg',
            colors: ['#808080', '#6C6C6C', '#565656'],
            description: 'Индустриальный серый кирпич',
            popular: false
        },
        {
            id: 'fb-terra-tuscany',
            name: 'Терракота «Тоскана»',
            category: 'Гибкий кирпич',
            price: 850,
            priceUnit: 'м²',
            texture: '/images/materials/brick-terra.jpg',
            colors: ['#D2691E', '#C55E18', '#B85412'],
            description: 'Теплый терракотовый оттенок',
            popular: true
        },
        {
            id: 'fb-brown-vintage',
            name: 'Коричневый «Винтаж»',
            category: 'Гибкий кирпич',
            price: 880,
            priceUnit: 'м²',
            texture: '/images/materials/brick-brown.jpg',
            colors: ['#8B4513', '#7A3C10', '#6A330D'],
            description: 'Состаренный кирпич с эффектом патины',
            popular: false
        },
        {
            id: 'fb-yellow-honey',
            name: 'Желтый «Медовый»',
            category: 'Гибкий кирпич',
            price: 910,
            priceUnit: 'м²',
            texture: '/images/materials/brick-yellow.jpg',
            colors: ['#DAA520', '#C89416', '#B6830C'],
            description: 'Теплый медовый оттенок',
            popular: false
        }
    ],
    thermoPanels: [
        {
            id: 'tp-premium-60',
            name: 'Премиум ППС 60мм',
            category: 'Термопанели',
            price: 1290,
            priceUnit: 'м²',
            texture: '/images/materials/panel-premium.jpg',
            colors: ['#667eea', '#5568D3', '#4453BC'],
            description: 'Максимальная теплоизоляция, клинкерная плитка',
            insulation: 60,
            popular: true
        },
        {
            id: 'tp-eco-40',
            name: 'Эконом ППС 40мм',
            category: 'Термопанели',
            price: 990,
            priceUnit: 'м²',
            texture: '/images/materials/panel-eco.jpg',
            colors: ['#764ba2', '#653D8C', '#543076'],
            description: 'Оптимальное соотношение цена/качество',
            insulation: 40,
            popular: true
        },
        {
            id: 'tp-ultra-80',
            name: 'Ультра ППС 80мм',
            category: 'Термопанели',
            price: 1490,
            priceUnit: 'м²',
            texture: '/images/materials/panel-ultra.jpg',
            colors: ['#f093fb', '#d97ae8', '#c261d5'],
            description: 'Для северных регионов, максимальная защита',
            insulation: 80,
            popular: false
        }
    ]
};

const AI_STYLES = [
    {
        id: 'scandinavian',
        name: 'Скандинавский',
        icon: '🇸🇪',
        description: 'Светлые тона, минимализм',
        config: {
            material: 'fb-white-sand',
            colors: {
                upper: '#F5F5DC',
                lower: '#808080',
                roof: '#2C2C2C',
                windows: '#FFFFFF',
                door: '#4A4A4A'
            }
        },
        popular: true
    },
    {
        id: 'english-manor',
        name: 'Английская усадьба',
        icon: '🇬🇧',
        description: 'Красный кирпич, классика',
        config: {
            material: 'fb-red-classic',
            colors: {
                upper: '#C1440E',
                lower: '#4A4A4A',
                roof: '#8B4513',
                windows: '#FFFFFF',
                door: '#654321'
            }
        },
        popular: true
    },
    {
        id: 'modern-loft',
        name: 'Современный лофт',
        icon: '🏙️',
        description: 'Серые тона, урбанизм',
        config: {
            material: 'fb-gray-loft',
            colors: {
                upper: '#6C6C6C',
                lower: '#2C2C2C',
                roof: '#1A1A1A',
                windows: '#4A4A4A',
                door: '#2C2C2C'
            }
        },
        popular: true
    },
    {
        id: 'provence',
        name: 'Прованс',
        icon: '🇫🇷',
        description: 'Пастельные, средиземноморье',
        config: {
            material: 'fb-white-sand',
            colors: {
                upper: '#E0D5B5',
                lower: '#D2691E',
                roof: '#C55E18',
                windows: '#87CEEB',
                door: '#DAA520'
            }
        },
        popular: false
    },
    {
        id: 'alpine-chalet',
        name: 'Альпийское шале',
        icon: '🏔️',
        description: 'Теплые тона, дерево',
        config: {
            material: 'fb-brown-vintage',
            colors: {
                upper: '#8B4513',
                lower: '#654321',
                roof: '#4A3319',
                windows: '#F5F5DC',
                door: '#654321'
            }
        },
        popular: false
    },
    {
        id: 'tuscan-villa',
        name: 'Тосканская вилла',
        icon: '🇮🇹',
        description: 'Терракота, итальянский стиль',
        config: {
            material: 'fb-terra-tuscany',
            colors: {
                upper: '#D2691E',
                lower: '#8B4513',
                roof: '#800020',
                windows: '#F5F5DC',
                door: '#654321'
            }
        },
        popular: true
    }
];

const HOUSE_MODELS = [
    {
        id: 'modern',
        name: 'Современный',
        icon: '🏠',
        preview: '/images/models/modern.jpg',
        drawFunction: 'drawModernHouse'
    },
    {
        id: 'classic',
        name: 'Классический',
        icon: '🏛️',
        preview: '/images/models/classic.jpg',
        drawFunction: 'drawClassicHouse'
    },
    {
        id: 'cottage',
        name: 'Коттедж',
        icon: '🏡',
        preview: '/images/models/cottage.jpg',
        drawFunction: 'drawCottageHouse'
    },
    {
        id: 'two-story',
        name: 'Двухэтажный',
        icon: '🏢',
        preview: '/images/models/two-story.jpg',
        drawFunction: 'drawTwoStoryHouse'
    }
];

const COLOR_PALETTES = {
    upper: [
        { name: 'Красный классический', hex: '#C1440E', category: 'Теплые' },
        { name: 'Белый песчаник', hex: '#F5F5DC', category: 'Светлые' },
        { name: 'Желтый медовый', hex: '#DAA520', category: 'Теплые' },
        { name: 'Серый графит', hex: '#808080', category: 'Нейтральные' },
        { name: 'Коричневый шоколад', hex: '#8B4513', category: 'Теплые' },
        { name: 'Терракота', hex: '#D2691E', category: 'Теплые' },
        { name: 'Бежевый крем', hex: '#D2B48C', category: 'Светлые' },
        { name: 'Графитовый', hex: '#4A4A4A', category: 'Темные' },
        { name: 'Слоновая кость', hex: '#FFFFF0', category: 'Светлые' },
        { name: 'Песочный', hex: '#C2B280', category: 'Нейтральные' },
        { name: 'Оливковый', hex: '#808000', category: 'Естественные' },
        { name: 'Бордовый', hex: '#800020', category: 'Темные' }
    ],
    lower: [
        { name: 'Темно-серый', hex: '#4A4A4A', category: 'Темные' },
        { name: 'Графит', hex: '#2C2C2C', category: 'Темные' },
        { name: 'Коричневый венге', hex: '#654321', category: 'Темные' },
        { name: 'Бордовый', hex: '#800020', category: 'Темные' },
        { name: 'Черный мрамор', hex: '#1A1A1A', category: 'Темные' },
        { name: 'Песочный камень', hex: '#A0826D', category: 'Нейтральные' },
        { name: 'Шоколадный', hex: '#3D2817', category: 'Темные' },
        { name: 'Антрацит', hex: '#363636', category: 'Темные' }
    ],
    roof: [
        { name: 'Коричневый классический', hex: '#8B4513', category: 'Классические' },
        { name: 'Красный терракота', hex: '#A0352B', category: 'Классические' },
        { name: 'Серый антрацит', hex: '#5A5A5A', category: 'Современные' },
        { name: 'Зеленый мох', hex: '#2F4F2F', category: 'Естественные' },
        { name: 'Черный графит', hex: '#2C2C2C', category: 'Современные' },
        { name: 'Темно-синий', hex: '#191970', category: 'Современные' },
        { name: 'Медный', hex: '#B87333', category: 'Премиум' }
    ],
    windows: [
        { name: 'Белый', hex: '#FFFFFF' },
        { name: 'Кремовый', hex: '#F5F5DC' },
        { name: 'Серый', hex: '#808080' },
        { name: 'Коричневый', hex: '#654321' },
        { name: 'Черный', hex: '#2C2C2C' }
    ],
    door: [
        { name: 'Дуб натуральный', hex: '#8B7355' },
        { name: 'Венге', hex: '#654321' },
        { name: 'Орех', hex: '#5C4033' },
        { name: 'Белый', hex: '#FFFFFF' },
        { name: 'Графит', hex: '#4A4A4A' },
        { name: 'Красное дерево', hex: '#C04000' }
    ]
};

class ProConfiguratorV2 {
    constructor() {
        this.canvas = document.getElementById('houseCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // State
        this.state = {
            model: HOUSE_MODELS[0],
            material: MATERIALS_LIBRARY.flexBrick[0],
            style: null,
            colors: {
                upper: '#C1440E',
                lower: '#4A4A4A',
                roof: '#8B4513',
                windows: '#FFFFFF',
                door: '#654321'
            },
            details: {
                windows: true,
                windowFrames: true,
                corners: true,
                decor: false,
                shadows: true
            },
            view: {
                angle: 'front',
                zoom: 1,
                lightIntensity: 1
            },
            dimensions: {
                width: 12,
                height: 8,
                area: 0
            },
            activeZone: 'upper',
            activeTab: 'materials'
        };

        this.animationFrame = null;
        this.init();
    }

    init() {
        this.calculateArea();
        this.renderUI();
        this.attachEvents();
        this.draw();
        this.updatePrice();
    }

    calculateArea() {
        const { width, height } = this.state.dimensions;
        // Simplified area calculation
        const wallArea = (width * height * 2) + (width * height * 2);
        const roofArea = width * height * 1.2; // pitched roof
        this.state.dimensions.area = Math.round(wallArea);
    }

    renderUI() {
        this.renderModels();
        this.renderMaterials();
        this.renderStyles();
        this.renderColorPalette();
        this.renderDetailsOptions();
    }

    renderModels() {
        const container = document.getElementById('modelSelector');
        if (!container) return;

        container.innerHTML = HOUSE_MODELS.map((model, index) => `
            <div class="model-item ${index === 0 ? 'active' : ''}" data-model="${model.id}">
                <div class="model-icon">${model.icon}</div>
                <span>${model.name}</span>
            </div>
        `).join('');
    }

    renderMaterials() {
        const grid = document.getElementById('materialGrid');
        if (!grid) return;

        const allMaterials = [
            ...MATERIALS_LIBRARY.flexBrick,
            ...MATERIALS_LIBRARY.thermoPanels
        ];

        grid.innerHTML = allMaterials.map((material, index) => `
            <div class="material-card ${index === 0 ? 'selected' : ''}" data-id="${material.id}">
                <div class="material-preview" style="background: linear-gradient(135deg, ${material.colors[0]}, ${material.colors[1]});"></div>
                <div class="material-info">
                    <div class="material-header">
                        <div class="material-name">${material.name}</div>
                        ${material.popular ? '<span class="badge-popular">🔥 Популярно</span>' : ''}
                    </div>
                    <div class="material-category">${material.category}</div>
                    <div class="material-description">${material.description}</div>
                    <div class="material-footer">
                        <div class="material-price">
                            <span class="price-value">${material.price} ₽</span>
                            <span class="price-unit">/${material.priceUnit}</span>
                        </div>
                        ${material.insulation ? `<div class="material-spec">🔥 ${material.insulation}мм</div>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderStyles() {
        const container = document.getElementById('aiStylesGrid');
        if (!container) return;

        container.innerHTML = AI_STYLES.map(style => `
            <div class="style-card" data-style="${style.id}">
                <div class="style-icon">${style.icon}</div>
                <div class="style-info">
                    <div class="style-name">${style.name}</div>
                    <div class="style-description">${style.description}</div>
                </div>
                ${style.popular ? '<span class="style-badge">⭐</span>' : ''}
            </div>
        `).join('');
    }

    renderColorPalette() {
        const grid = document.getElementById('colorGrid');
        if (!grid) return;

        const colors = COLOR_PALETTES[this.state.activeZone] || COLOR_PALETTES.upper;
        
        grid.innerHTML = colors.map(color => `
            <div class="color-item ${this.state.colors[this.state.activeZone] === color.hex ? 'selected' : ''}" 
                 data-hex="${color.hex}"
                 title="${color.name}"
                 style="background: ${color.hex};">
            </div>
        `).join('');
    }

    renderDetailsOptions() {
        // Render window variants, corner variants etc.
        const windowVariants = document.getElementById('windowVariants');
        if (windowVariants) {
            windowVariants.innerHTML = `
                <div class="variant-grid">
                    <div class="variant-item active" data-type="modern">
                        <div class="variant-preview">◻️</div>
                        <span>Современные</span>
                    </div>
                    <div class="variant-item" data-type="classic">
                        <div class="variant-preview">▭</div>
                        <span>Классические</span>
                    </div>
                    <div class="variant-item" data-type="arch">
                        <div class="variant-preview">⌒</div>
                        <span>Арочные</span>
                    </div>
                </div>
            `;
        }
    }

    attachEvents() {
        // Material cards
        document.querySelectorAll('.material-card').forEach(card => {
            card.addEventListener('click', () => {
                const materialId = card.dataset.id;
                const material = [...MATERIALS_LIBRARY.flexBrick, ...MATERIALS_LIBRARY.thermoPanels]
                    .find(m => m.id === materialId);
                
                if (material) {
                    document.querySelectorAll('.material-card').forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    this.state.material = material;
                    this.draw();
                    this.updatePrice();
                }
            });
        });

        // AI Styles
        document.querySelectorAll('.style-card').forEach(card => {
            card.addEventListener('click', () => {
                const styleId = card.dataset.style;
                const style = AI_STYLES.find(s => s.id === styleId);
                if (style) {
                    this.applyStyle(style);
                }
            });
        });

        // Color palette
        document.querySelectorAll('.color-item').forEach(item => {
            item.addEventListener('click', () => {
                const hex = item.dataset.hex;
                this.state.colors[this.state.activeZone] = hex;
                this.renderColorPalette();
                this.draw();
            });
        });

        // Zone buttons
        document.querySelectorAll('.zone-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const zone = btn.dataset.target;
                this.state.activeZone = zone;
                document.querySelectorAll('.zone-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderColorPalette();
            });
        });

        // Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                this.state.activeTab = tab;
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(`${tab}Tab`).classList.add('active');
            });
        });

        // Details toggles
        Object.keys(this.state.details).forEach(key => {
            const toggle = document.getElementById(`${key}Toggle`);
            if (toggle) {
                toggle.addEventListener('change', (e) => {
                    this.state.details[key] = e.target.checked;
                    this.draw();
                });
            }
        });

        // Model selector
        document.querySelectorAll('.model-item').forEach(item => {
            item.addEventListener('click', () => {
                const modelId = item.dataset.model;
                const model = HOUSE_MODELS.find(m => m.id === modelId);
                if (model) {
                    document.querySelectorAll('.model-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    this.state.model = model;
                    this.draw();
                }
            });
        });

        // Save
        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveProject());
        }

        // Quote modal
        const quoteBtn = document.getElementById('getQuoteBtn');
        const closeModal = document.getElementById('closeModal');
        const modal = document.getElementById('quoteModal');
        
        if (quoteBtn) {
            quoteBtn.addEventListener('click', () => modal.classList.add('active'));
        }
        if (closeModal) {
            closeModal.addEventListener('click', () => modal.classList.remove('active'));
        }

        // Form submit
        const form = document.getElementById('quoteForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.sendQuote(new FormData(form));
            });
        }
    }

    applyStyle(style) {
        const material = [...MATERIALS_LIBRARY.flexBrick, ...MATERIALS_LIBRARY.thermoPanels]
            .find(m => m.id === style.config.material);
        
        if (material) {
            this.state.material = material;
            this.state.colors = { ...style.config.colors };
            this.state.style = style;
            
            // Update UI
            this.renderColorPalette();
            document.querySelectorAll('.material-card').forEach(card => {
                card.classList.toggle('selected', card.dataset.id === material.id);
            });
            
            this.draw();
            this.updatePrice();
            
            // Show notification
            this.showNotification(`✨ Применен стиль "${style.name}"`);
        }
    }

    draw() {
        // Use specific draw function based on model
        const drawMethod = this.state.model.drawFunction;
        if (this[drawMethod]) {
            this[drawMethod]();
        } else {
            this.drawModernHouse();
        }
    }

    drawModernHouse() {
        const { ctx, canvas, state } = this;
        const { colors, details, view } = state;
        const { zoom } = view;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.scale(zoom, zoom);

        // Background
        this.drawBackground();

        // Ground shadow
        if (details.shadows) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.beginPath();
            ctx.ellipse(600, 820, 350, 40, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        // Roof
        this.drawRoof(colors.roof, 600, 180, 950, 370, 250);

        // Upper facade
        this.drawFacade(250, 350, 700, 300, colors.upper, 'upper');

        // Lower facade (base)
        this.drawFacade(250, 650, 700, 150, colors.lower, 'lower');

        // Windows
        if (details.windows) {
            this.drawWindow(350, 430, 150, 180, colors.windows);
            this.drawWindow(700, 430, 150, 180, colors.windows);
        }

        // Door
        this.drawDoor(520, 540, 160, 260, colors.door);

        // Corners
        if (details.corners) {
            this.drawCorners(250, 350, 700, 450);
        }

        // Decorative elements
        if (details.decor) {
            this.drawDecorativeElements();
        }

        ctx.restore();
    }

    drawBackground() {
        const { ctx, canvas } = this;
        
        // Sky
        const skyGrad = ctx.createLinearGradient(0, 0, 0, 400);
        skyGrad.addColorStop(0, '#87CEEB');
        skyGrad.addColorStop(0.5, '#B0E0E6');
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
        const sunGrad = ctx.createRadialGradient(950, 120, 30, 950, 120, 90);
        sunGrad.addColorStop(0, '#FFD700');
        sunGrad.addColorStop(0.6, '#FFA500');
        sunGrad.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(950, 120, 90, 0, Math.PI * 2);
        ctx.fill();

        // Clouds
        this.drawCloud(200, 100, 80);
        this.drawCloud(800, 150, 60);
    }

    drawCloud(x, y, size) {
        const { ctx } = this;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(x, y, size * 0.6, 0, Math.PI * 2);
        ctx.arc(x + size * 0.5, y, size * 0.8, 0, Math.PI * 2);
        ctx.arc(x + size, y, size * 0.6, 0, Math.PI * 2);
        ctx.fill();
    }

    drawRoof(color, peakX, peakY, rightX, rightY, leftX) {
        const { ctx } = this;
        
        const roofGrad = ctx.createLinearGradient(leftX, peakY, rightX, rightY);
        roofGrad.addColorStop(0, this.adjustColor(color, -20));
        roofGrad.addColorStop(0.5, color);
        roofGrad.addColorStop(1, this.adjustColor(color, -30));
        
        ctx.fillStyle = roofGrad;
        ctx.beginPath();
        ctx.moveTo(peakX, peakY);
        ctx.lineTo(rightX, rightY);
        ctx.lineTo(rightX, rightY + 20);
        ctx.lineTo(leftX, rightY + 20);
        ctx.lineTo(leftX, rightY);
        ctx.closePath();
        ctx.fill();

        // Ridge highlight
        ctx.strokeStyle = this.adjustColor(color, -40);
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(peakX, peakY);
        ctx.lineTo(rightX, rightY);
        ctx.stroke();
    }

    drawFacade(x, y, w, h, color, zone) {
        const { ctx, state } = this;
        
        // Base color with gradient
        const grad = ctx.createLinearGradient(x, y, x, y + h);
        grad.addColorStop(0, this.adjustColor(color, 10));
        grad.addColorStop(1, color);
        ctx.fillStyle = grad;
        ctx.fillRect(x, y, w, h);

        // Texture
        this.drawTexture(x, y, w, h, color, state.material.category);
    }

    drawTexture(x, y, w, h, color, materialType) {
        const { ctx } = this;
        
        if (materialType === 'Гибкий кирпич') {
            ctx.strokeStyle = this.adjustColor(color, -35);
            ctx.lineWidth = 2.5;
            const bh = 32;
            const bw = 105;

            for (let row = 0; row < h / bh; row++) {
                for (let col = 0; col < w / bw + 1; col++) {
                    const offset = row % 2 === 0 ? 0 : bw / 2;
                    const bx = x + col * bw + offset;
                    const by = y + row * bh;
                    
                    if (bx < x + w && by < y + h) {
                        ctx.strokeRect(bx, by, Math.min(bw, x + w - bx), Math.min(bh, y + h - by));
                        
                        // Subtle depth
                        ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.05})`;
                        ctx.fillRect(bx, by, Math.min(bw, x + w - bx), Math.min(bh, y + h - by));
                    }
                }
            }
        } else {
            // Thermopanel texture
            ctx.strokeStyle = this.adjustColor(color, -25);
            ctx.lineWidth = 4;
            const pw = 120;
            
            for (let i = 0; i <= w / pw; i++) {
                ctx.beginPath();
                ctx.moveTo(x + i * pw, y);
                ctx.lineTo(x + i * pw, y + h);
                ctx.stroke();
            }

            // Horizontal lines
            ctx.lineWidth = 2;
            const ph = 80;
            for (let i = 0; i <= h / ph; i++) {
                ctx.beginPath();
                ctx.moveTo(x, y + i * ph);
                ctx.lineTo(x + w, y + i * ph);
                ctx.stroke();
            }
        }
    }

    drawWindow(x, y, w, h, frameColor) {
        const { ctx, state } = this;

        if (state.details.shadows) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
            ctx.fillRect(x + 6, y + 6, w, h);
        }

        // Glass
        const glassGrad = ctx.createLinearGradient(x, y, x, y + h);
        glassGrad.addColorStop(0, '#B0D4F1');
        glassGrad.addColorStop(0.3, '#87CEEB');
        glassGrad.addColorStop(0.7, '#6BB0D8');
        glassGrad.addColorStop(1, '#5A9FCA');
        ctx.fillStyle = glassGrad;
        ctx.fillRect(x, y, w, h);

        // Frame
        if (state.details.windowFrames) {
            ctx.strokeStyle = frameColor;
            ctx.lineWidth = 10;
            ctx.strokeRect(x, y, w, h);

            // Cross
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(x + w / 2, y);
            ctx.lineTo(x + w / 2, y + h);
            ctx.moveTo(x, y + h / 2);
            ctx.lineTo(x + w, y + h / 2);
            ctx.stroke();
        }

        // Reflection
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.fillRect(x + 12, y + 12, w / 3, h / 4);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(x + w - 40, y + h - 35, 25, 25);
    }

    drawDoor(x, y, w, h, doorColor) {
        const { ctx, state } = this;

        if (state.details.shadows) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
            ctx.fillRect(x + 6, y + 6, w, h);
        }

        // Door
        const doorGrad = ctx.createLinearGradient(x, y, x + w, y);
        doorGrad.addColorStop(0, this.adjustColor(doorColor, -15));
        doorGrad.addColorStop(0.5, doorColor);
        doorGrad.addColorStop(1, this.adjustColor(doorColor, -20));
        ctx.fillStyle = doorGrad;
        ctx.fillRect(x, y, w, h);

        // Frame
        ctx.strokeStyle = this.adjustColor(doorColor, -40);
        ctx.lineWidth = 8;
        ctx.strokeRect(x, y, w, h);

        // Panels
        const margin = 18;
        const panelH = (h - margin * 3) / 2;
        
        ctx.lineWidth = 5;
        ctx.strokeRect(x + margin, y + margin, w - margin * 2, panelH);
        ctx.strokeRect(x + margin, y + margin * 2 + panelH, w - margin * 2, panelH);

        // Wood texture
        ctx.strokeStyle = this.adjustColor(doorColor, -25);
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
            const lineY = y + margin + (i * panelH / 4);
            ctx.beginPath();
            ctx.moveTo(x + margin, lineY);
            ctx.lineTo(x + w - margin, lineY);
            ctx.stroke();
        }

        // Handle
        ctx.fillStyle = '#C9A962';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(x + w - 35, y + h / 2, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Handle detail
        ctx.strokeStyle = '#B8984E';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x + w - 35, y + h / 2, 10, 0, Math.PI * 2);
        ctx.stroke();
    }

    drawCorners(x, y, w, h) {
        const { ctx } = this;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.fillRect(x - 3, y, 18, h);
        ctx.fillRect(x + w - 15, y, 18, h);
    }

    drawDecorativeElements() {
        // Add decorative cornices, moldings, etc.
        const { ctx } = this;
        
        // Cornice above windows
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(340, 420, 170, 8);
        ctx.fillRect(690, 420, 170, 8);
    }

    adjustColor(color, amount) {
        const num = parseInt(color.replace('#', ''), 16);
        const r = Math.max(0, Math.min(255, (num >> 16) + amount));
        const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
        const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
        return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
    }

    updatePrice() {
        const area = this.state.dimensions.area;
        const pricePerSqm = this.state.material.price;
        const totalPrice = area * pricePerSqm;
        
        document.getElementById('totalArea').textContent = `${area} м²`;
        document.getElementById('totalPrice').textContent = `${totalPrice.toLocaleString('ru-RU')} ₽`;
    }

    saveProject() {
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        link.download = `facade-project-${timestamp}.png`;
        link.href = this.canvas.toDataURL('image/png', 1.0);
        link.click();
        this.showNotification('✅ Проект сохранен в высоком качестве!');
    }

    async sendQuote(formData) {
        const data = {
            ...Object.fromEntries(formData),
            config: {
                material: this.state.material.name,
                style: this.state.style?.name || 'Индивидуальный',
                colors: this.state.colors,
                area: this.state.dimensions.area,
                price: this.state.dimensions.area * this.state.material.price
            },
            image: this.canvas.toDataURL('image/jpeg', 0.85)
        };

        try {
            // Send to Telegram Bot
            await this.sendToTelegram(data);
            
            document.getElementById('quoteModal').classList.remove('active');
            this.showNotification('✅ Заявка отправлена! Мы свяжемся с вами в течение 15 минут.');
        } catch (error) {
            console.error('Error sending quote:', error);
            this.showNotification('❌ Ошибка отправки. Позвоните нам: +7 (995) 776-75-75', 'error');
        }
    }

    async sendToTelegram(data) {
        const BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
        const CHAT_ID = 'YOUR_CHAT_ID';

        const message = `
🏠 НОВАЯ ЗАЯВКА НА РАСЧЕТ

👤 Клиент: ${data.name}
📱 Телефон: ${data.phone}
📧 Email: ${data.email || 'не указан'}

🎨 Конфигурация:
▫️ Материал: ${data.config.material}
▫️ Стиль: ${data.config.style}
▫️ Площадь: ${data.config.area} м²
💰 Ориентировочная стоимость: ${data.config.price.toLocaleString('ru-RU')} ₽

💬 Комментарий: ${data.comment || 'нет'}
        `.trim();

        // Send text message
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        // Send image (commented out for now - implement with proper bot)
        // const blob = await (await fetch(data.image)).blob();
        // const formData = new FormData();
        // formData.append('chat_id', CHAT_ID);
        // formData.append('photo', blob, 'facade.jpg');
        // await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
        //     method: 'POST',
        //     body: formData
        // });
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
            font-weight: 600;
        `;

        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Additional house drawing methods
    drawClassicHouse() {
        // Similar to modern but with more traditional elements
        this.drawModernHouse(); // Base implementation
    }

    drawCottageHouse() {
        // Cottage style with different proportions
        this.drawModernHouse(); // Base implementation
    }

    drawTwoStoryHouse() {
        // Two-story building
        this.drawModernHouse(); // Base implementation
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.configurator = new ProConfiguratorV2();
    });
} else {
    window.configurator = new ProConfiguratorV2();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from {
        transform: translateX(400px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(400px);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);