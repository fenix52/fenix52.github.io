/**
 * 🧩 Calculator Core Module
 * Ядро калькулятора - данные и основная логика
 */

export const calculatorData = {
    workType: null,
    workTypeName: null,
    material: null,
    materialName: null,
    materialPrice: 0,
    materialUnit: 'm2',
    sheetArea: 0,
    area: 0,
    services: [],
    amkMix: null,
    hasConfigurator: false,
    timestamp: null
};

export const STEP_ORDER = ['work-type', 'material', 'configurator', 'dimensions', 'services'];

export const materialsByType = {
    facade: [
        {
            id: 'flexible-brick',
            name: 'Гибкий кирпич',
            desc: 'Облицовка гибким кирпичом',
            price: 1080,
            unit: 'лист',
            sheetArea: 0.9,
            hasAMK: true
        },
        {
            id: 'thermal-brick',
            name: 'Термопанель под кирпич',
            desc: 'Утепление с декором',
            price: 850
        },
        {
            id: 'facade-decor',
            name: 'Фасадный лепной декор',
            desc: 'Декоративные элементы',
            price: 1200
        }
    ],
    interior: [
        {
            id: 'flexible-brick',
            name: 'Гибкий кирпич',
            desc: 'Интерьерная отделка',
            price: 1080,
            unit: 'лист',
            sheetArea: 0.9,
            hasAMK: true
        },
        {
            id: 'interior-decor',
            name: 'Лепной декор',
            desc: 'Декоративные элементы',
            price: 1500
        }
    ],
    insulation: [
        {
            id: 'penoplast50',
            name: 'Пенопласт 50мм',
            desc: 'Базовая теплоизоляция',
            price: 350
        },
        {
            id: 'penoplast100',
            name: 'Пенопласт 100мм',
            desc: 'Усиленная теплоизоляция',
            price: 650
        }
    ]
};

export function saveToLocalStorage() {
    calculatorData.timestamp = new Date().toISOString();
    localStorage.setItem('arzamas_decor_calculator', JSON.stringify(calculatorData));
}

export function loadFromLocalStorage() {
    const saved = localStorage.getItem('arzamas_decor_calculator');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            const savedTime = new Date(data.timestamp);
            const now = new Date();
            const hoursDiff = (now - savedTime) / (1000 * 60 * 60);
            
            if (hoursDiff < 24) {
                Object.assign(calculatorData, data);
                return true;
            }
        } catch (e) {
            console.error('Ошибка загрузки:', e);
        }
    }
    return false;
}