// Catalog Data and Logic

const PRODUCTS = [
    {
        id: 1,
        name: 'Гибкий кирпич "Красный клинкер"',
        category: 'brick',
        price: 890,
        image: 'https://via.placeholder.com/400x300/C1440E/FFFFFF?text=Красный+клинкер',
        rating: 5,
        reviews: 47,
        features: [
            'Морозостойкость -50°C',
            'Вес 3 кг/м²',
            'Монтаж за 1 день',
            'Гибкость до 90°'
        ],
        isNew: false
    },
    {
        id: 2,
        name: 'Гибкий кирпич "Белый песчаник"',
        category: 'brick',
        price: 920,
        image: 'https://via.placeholder.com/400x300/F5F5DC/333333?text=Белый+песчаник',
        rating: 5,
        reviews: 38,
        features: [
            'Морозостойкость -50°C',
            'Вес 3 кг/м²',
            'Монтаж за 1 день',
            'Экологичный материал'
        ],
        isNew: false
    },
    {
        id: 3,
        name: 'Гибкий кирпич "Терракота"',
        category: 'brick',
        price: 850,
        image: 'https://via.placeholder.com/400x300/D2691E/FFFFFF?text=Терракота',
        rating: 5,
        reviews: 29,
        features: [
            'Морозостойкость -50°C',
            'Вес 3 кг/м²',
            'Монтаж за 1 день',
            'Устойчив к влаге'
        ],
        isNew: false
    },
    {
        id: 4,
        name: 'Термопанель "Премиум ППС 60мм"',
        category: 'panel',
        price: 1290,
        image: 'https://via.placeholder.com/400x300/667eea/FFFFFF?text=Термопанель+60мм',
        rating: 5,
        reviews: 32,
        features: [
            'Утепление + отделка',
            'Экономия до 40%',
            'Толщина утеплителя 60мм',
            'Быстрый монтаж'
        ],
        isNew: true
    },
    {
        id: 5,
        name: 'Термопанель "Эконом ППС 40мм"',
        category: 'panel',
        price: 990,
        image: 'https://via.placeholder.com/400x300/764ba2/FFFFFF?text=Термопанель+40мм',
        rating: 4,
        reviews: 21,
        features: [
            'Утепление + отделка',
            'Экономия до 30%',
            'Толщина утеплителя 40мм',
            'Доступная цена'
        ],
        isNew: false
    },
    {
        id: 6,
        name: 'Термопанель "ППУ Премиум 80мм"',
        category: 'panel',
        price: 1590,
        image: 'https://via.placeholder.com/400x300/f093fb/FFFFFF?text=ППУ+80мм',
        rating: 5,
        reviews: 18,
        features: [
            'Пенополиуретан (ППУ)',
            'Максимальное утепление',
            'Толщина 80мм',
            'Срок службы 50+ лет'
        ],
        isNew: true
    },
    {
        id: 7,
        name: 'Гибкий кирпич "Состаренный"',
        category: 'brick',
        price: 1100,
        image: 'https://via.placeholder.com/400x300/8B4513/FFFFFF?text=Состаренный',
        rating: 5,
        reviews: 15,
        features: [
            'Эффект старины',
            'Премиум коллекция',
            'Ручная работа',
            'Уникальная текстура'
        ],
        isNew: true
    },
    {
        id: 8,
        name: 'Гибкий кирпич "Серый камень"',
        category: 'brick',
        price: 870,
        image: 'https://via.placeholder.com/400x300/808080/FFFFFF?text=Серый+камень',
        rating: 4,
        reviews: 26,
        features: [
            'Современный стиль',
            'Морозостойкость -50°C',
            'Легкий монтаж',
            'Влагостойкий'
        ],
        isNew: false
    }
];

class CatalogManager {
    constructor() {
        this.container = document.getElementById('catalogGrid');
        this.init();
    }

    init() {
        this.renderProducts();
    }

    renderProducts() {
        this.container.innerHTML = '';
        PRODUCTS.forEach(product => {
            const card = this.createProductCard(product);
            this.container.appendChild(card);
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const stars = '⭐'.repeat(product.rating);
        const badgeHTML = product.isNew ? '<span class="product-card__badge product-card__badge--new">НОВИНКА</span>' : '';
        
        card.innerHTML = `
            <div class="product-card__image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${badgeHTML}
            </div>
            <div class="product-card__content">
                <h3 class="product-card__title">${product.name}</h3>
                <div class="product-card__rating">
                    <div class="rating-stars">${stars}</div>
                    <span class="rating-count">(${product.reviews} отзывов)</span>
                </div>
                <ul class="product-card__features">
                    ${product.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
                <div class="product-card__footer">
                    <div>
                        <span class="product-card__price">${product.price} ₽</span>
                        <span class="product-card__price-unit">/м²</span>
                    </div>
                </div>
                <div class="product-card__actions">
                    <button class="btn btn--primary" onclick="addToCart(${product.id})">
                        🛒 В корзину
                    </button>
                    <button class="btn btn--outline btn--icon" onclick="viewProduct(${product.id})">
                        👁
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }
}

// Global functions
window.addToCart = function(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    console.log('Adding to cart:', product);
    alert(`✅ "${product.name}" добавлен в корзину!`);
};

window.viewProduct = function(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    console.log('View product:', product);
    alert(`👁 Просмотр: ${product.name}`);
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CatalogManager();
    });
} else {
    new CatalogManager();
}