/**
 * Calculator - Калькулятор стоимости
 * Многошаговый калькулятор для расчета стоимости работ
 */

document.addEventListener('DOMContentLoaded', function() {
  const calculatorForm = document.querySelector('.calculator__form');
  if (calculatorForm) {
    initCalculator();
  }
});

let calculatorData = {
  step: 1,
  totalSteps: 4,
  service: '',
  workType: '',
  area: 0,
  materials: [],
  additionalServices: [],
  totalCost: 0,
  materialsCost: 0,
  workCost: 0
};

// Цены на услуги (руб/м²)
const PRICES = {
  facade: {
    flexible_brick: { work: 2500, material: 1800 },
    thermopanels: { work: 2200, material: 2500 },
    siding: { work: 1800, material: 1200 },
    plaster: { work: 2000, material: 800 }
  },
  interior: {
    wallpaper: { work: 800, material: 500 },
    painting: { work: 900, material: 400 },
    tiles: { work: 1500, material: 1200 },
    panels: { work: 1200, material: 800 }
  },
  insulation: {
    penoplex: { work: 1200, material: 800 },
    mineral_wool: { work: 1000, material: 600 },
    foam: { work: 900, material: 400 }
  },
  additional: {
    dismantling: 500,
    preparatory: 400,
    delivery: 300,
    scaffolding: 200
  }
};

function initCalculator() {
  showStep(1);
  initStepNavigation();
  initServiceSelection();
  initWorkTypeSelection();
  initAreaInput();
  initMaterialsSelection();
  initAdditionalServices();
  updateProgress();
  
  console.log('✅ Калькулятор инициализирован');
}

// Показать шаг
function showStep(stepNumber) {
  const steps = document.querySelectorAll('.calculator__step');
  steps.forEach(step => step.classList.remove('calculator__step--active'));
  
  const currentStep = document.querySelector(`[data-step="${stepNumber}"]`);
  if (currentStep) {
    currentStep.classList.add('calculator__step--active');
    calculatorData.step = stepNumber;
    updateProgress();
  }
}

// Навигация между шагами
function initStepNavigation() {
  const prevBtns = document.querySelectorAll('[data-action="prev"]');
  const nextBtns = document.querySelectorAll('[data-action="next"]');
  
  prevBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      if (calculatorData.step > 1) {
        showStep(calculatorData.step - 1);
      }
    });
  });
  
  nextBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      if (validateStep(calculatorData.step)) {
        if (calculatorData.step < calculatorData.totalSteps) {
          showStep(calculatorData.step + 1);
        }
      }
    });
  });
}

// Выбор услуги
function initServiceSelection() {
  const serviceInputs = document.querySelectorAll('input[name="service"]');
  
  serviceInputs.forEach(input => {
    input.addEventListener('change', function() {
      calculatorData.service = this.value;
      console.log('Выбрана услуга:', calculatorData.service);
    });
  });
}

// Выбор типа работ
function initWorkTypeSelection() {
  const workTypeInputs = document.querySelectorAll('input[name="workType"]');
  
  workTypeInputs.forEach(input => {
    input.addEventListener('change', function() {
      calculatorData.workType = this.value;
      console.log('Выбран тип работ:', calculatorData.workType);
    });
  });
}

// Ввод площади
function initAreaInput() {
  const areaInput = document.querySelector('input[name="area"]');
  
  if (areaInput) {
    areaInput.addEventListener('input', function() {
      calculatorData.area = parseFloat(this.value) || 0;
      console.log('Площадь:', calculatorData.area);
    });
  }
}

// Выбор материалов
function initMaterialsSelection() {
  const materialCheckboxes = document.querySelectorAll('input[name="materials"]');
  
  materialCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const materialType = this.value;
      
      if (this.checked) {
        if (!calculatorData.materials.includes(materialType)) {
          calculatorData.materials.push(materialType);
        }
      } else {
        calculatorData.materials = calculatorData.materials.filter(m => m !== materialType);
      }
      
      console.log('Материалы:', calculatorData.materials);
    });
  });
}

// Дополнительные услуги
function initAdditionalServices() {
  const serviceCheckboxes = document.querySelectorAll('input[name="additionalServices"]');
  
  serviceCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const service = this.value;
      
      if (this.checked) {
        if (!calculatorData.additionalServices.includes(service)) {
          calculatorData.additionalServices.push(service);
        }
      } else {
        calculatorData.additionalServices = calculatorData.additionalServices.filter(s => s !== service);
      }
      
      console.log('Доп. услуги:', calculatorData.additionalServices);
      calculateTotal();
    });
  });
}

// Валидация шага
function validateStep(step) {
  switch(step) {
    case 1:
      if (!calculatorData.service) {
        showNotification('Пожалуйста, выберите услугу', 'error');
        return false;
      }
      return true;
      
    case 2:
      if (!calculatorData.workType) {
        showNotification('Пожалуйста, выберите тип работ', 'error');
        return false;
      }
      if (!calculatorData.area || calculatorData.area <= 0) {
        showNotification('Пожалуйста, укажите площадь', 'error');
        return false;
      }
      return true;
      
    case 3:
      calculateTotal();
      displayResults();
      return true;
      
    default:
      return true;
  }
}

// Расчет общей стоимости
function calculateTotal() {
  const { service, workType, area, additionalServices } = calculatorData;
  
  if (!service || !workType || !area) return;
  
  // Базовая стоимость работ и материалов
  const prices = PRICES[service]?.[workType];
  
  if (!prices) {
    console.error('Цены не найдены для:', service, workType);
    return;
  }
  
  calculatorData.workCost = prices.work * area;
  calculatorData.materialsCost = prices.material * area;
  
  // Дополнительные услуги
  let additionalCost = 0;
  additionalServices.forEach(service => {
    const serviceCost = PRICES.additional[service];
    if (serviceCost) {
      additionalCost += serviceCost * area;
    }
  });
  
  calculatorData.totalCost = calculatorData.workCost + calculatorData.materialsCost + additionalCost;
  
  console.log('Расчет:', calculatorData);
}

// Отображение результатов
function displayResults() {
  const resultsContainer = document.querySelector('.calculator__result');
  if (!resultsContainer) return;
  
  const { area, workCost, materialsCost, totalCost } = calculatorData;
  
  resultsContainer.innerHTML = `
    <div class="calculator__result-item">
      <span>Площадь:</span>
      <strong>${area} м²</strong>
    </div>
    <div class="calculator__result-item">
      <span>Стоимость работ:</span>
      <strong>${formatNumber(Math.round(workCost))} ₽</strong>
    </div>
    <div class="calculator__result-item">
      <span>Стоимость материалов:</span>
      <strong>${formatNumber(Math.round(materialsCost))} ₽</strong>
    </div>
    <div class="calculator__result-divider"></div>
    <div class="calculator__result-item calculator__result-total">
      <span>Итого:</span>
      <strong>${formatNumber(Math.round(totalCost))} ₽</strong>
    </div>
    <p class="calculator__result-note">
      * Итоговая стоимость может измениться после выезда специалиста и осмотра объекта
    </p>
  `;
}

// Обновление прогресс-бара
function updateProgress() {
  const progressBar = document.querySelector('.calculator__progress-bar');
  const progressText = document.querySelector('.calculator__progress-text');
  
  if (progressBar) {
    const progress = (calculatorData.step / calculatorData.totalSteps) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.style.setProperty('--progress', `${progress}%`);
  }
  
  if (progressText) {
    progressText.textContent = `Шаг ${calculatorData.step} из ${calculatorData.totalSteps}`;
  }
}

// Сохранение результата
function saveCalculation() {
  const calculationData = {
    ...calculatorData,
    date: new Date().toISOString(),
    id: Date.now()
  };
  
  // Сохраняем в localStorage
  const savedCalculations = JSON.parse(localStorage.getItem('calculations') || '[]');
  savedCalculations.push(calculationData);
  localStorage.setItem('calculations', JSON.stringify(savedCalculations));
  
  showNotification('Расчет сохранен!', 'success');
}

// Отправка результата на email
function sendCalculationByEmail() {
  const email = prompt('Введите ваш email:');
  
  if (email && isValidEmail(email)) {
    // Здесь будет отправка на сервер
    console.log('Отправка на email:', email, calculatorData);
    showNotification('Расчет отправлен на email!', 'success');
  } else {
    showNotification('Некорректный email', 'error');
  }
}

// Печать результата
function printCalculation() {
  window.print();
}

// Экспорт функций
window.calculatorData = calculatorData;
window.saveCalculation = saveCalculation;
window.sendCalculationByEmail = sendCalculationByEmail;
window.printCalculation = printCalculation;