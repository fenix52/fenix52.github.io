// Calculator functionality

class Calculator {
  constructor() {
    this.form = document.getElementById('calculatorForm');
    this.steps = document.querySelectorAll('.calculator__step');
    this.currentStep = 1;
    this.totalSteps = this.steps.length;
    
    this.prevBtn = document.getElementById('calcPrevBtn');
    this.nextBtn = document.getElementById('calcNextBtn');
    this.progressBar = document.getElementById('calcProgress');
    this.progressText = document.getElementById('calcProgressText');

    this.data = {
      workType: '',
      area: 0,
      options: {
        dismantling: false,
        scaffolding: false,
        preparation: false,
        urgency: false
      }
    };

    this.prices = {
      brick: { material: 1200, work: 800 },
      thermopanel: { material: 1800, work: 1000 },
      insulation: { material: 800, work: 600 },
      complex: { material: 2500, work: 1500 }
    };

    this.additionalPrices = {
      dismantling: 300,
      scaffolding: 200,
      preparation: 400,
      urgency: 500
    };

    this.init();
  }

  init() {
    if (!this.form) return;
    this.setupNavigation();
    this.setupFormHandlers();
    this.updateProgress();
  }

  setupNavigation() {
    this.nextBtn?.addEventListener('click', () => this.nextStep());
    this.prevBtn?.addEventListener('click', () => this.prevStep());
  }

  setupFormHandlers() {
    const workTypeInputs = this.form.querySelectorAll('input[name="workType"]');
    workTypeInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        this.data.workType = e.target.value;
      });
    });

    const areaInput = this.form.querySelector('input[name="area"]');
    areaInput?.addEventListener('input', (e) => {
      this.data.area = parseFloat(e.target.value) || 0;
    });

    const optionInputs = this.form.querySelectorAll('.calculator__checkbox input[type="checkbox"]');
    optionInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        const name = e.target.name;
        this.data.options[name] = e.target.checked;
      });
    });

    const downloadBtn = document.getElementById('downloadEstimate');
    downloadBtn?.addEventListener('click', () => this.downloadEstimate());
  }

  nextStep() {
    if (!this.validateCurrentStep()) {
      this.showError('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.updateSteps();
      this.updateProgress();
      
      if (this.currentStep === this.totalSteps) {
        this.calculateAndShowResult();
      }
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateSteps();
      this.updateProgress();
    }
  }

  updateSteps() {
    this.steps.forEach((step, index) => {
      if (index + 1 === this.currentStep) {
        step.classList.add('calculator__step--active');
      } else {
        step.classList.remove('calculator__step--active');
      }
    });

    this.prevBtn.disabled = this.currentStep === 1;
    
    if (this.currentStep === this.totalSteps) {
      this.nextBtn.style.display = 'none';
    } else {
      this.nextBtn.style.display = 'flex';
    }
  }

  updateProgress() {
    const progress = (this.currentStep / this.totalSteps) * 100;
    
    if (this.progressBar) {
      this.progressBar.style.setProperty('--progress', `${progress}%`);
      const bar = this.progressBar.querySelector('::before') || this.progressBar;
      if (bar) {
        bar.style.width = `${progress}%`;
      }
    }

    if (this.progressText) {
      this.progressText.textContent = `Шаг ${this.currentStep} из ${this.totalSteps}`;
    }
  }

  validateCurrentStep() {
    const currentStepElement = this.steps[this.currentStep - 1];
    
    if (this.currentStep === 1) {
      const selected = currentStepElement.querySelector('input[name="workType"]:checked');
      return !!selected;
    }

    if (this.currentStep === 2) {
      const areaInput = currentStepElement.querySelector('input[name="area"]');
      return areaInput && parseFloat(areaInput.value) > 0;
    }

    return true;
  }

  calculateAndShowResult() {
    const workType = this.data.workType;
    const area = this.data.area;
    
    if (!workType || !area) return;

    const basePrice = this.prices[workType];
    let materialCost = basePrice.material * area;
    let workCost = basePrice.work * area;

    Object.keys(this.data.options).forEach(option => {
      if (this.data.options[option]) {
        const additionalCost = this.additionalPrices[option] * area;
        workCost += additionalCost;
      }
    });

    const totalCost = materialCost + workCost;

    this.displayResult({
      area,
      materialCost,
      workCost,
      totalCost
    });

    saveToLocalStorage('calculatorResult', {
      ...this.data,
      result: { area, materialCost, workCost, totalCost }
    });
  }

  displayResult(result) {
    document.getElementById('resultArea').textContent = `${result.area} м²`;
    document.getElementById('resultMaterials').textContent = `${formatNumber(result.materialCost)} ₽`;
    document.getElementById('resultWork').textContent = `${formatNumber(result.workCost)} ₽`;
    document.getElementById('resultTotal').textContent = `${formatNumber(result.totalCost)} ₽`;
  }

  downloadEstimate() {
    const data = getFromLocalStorage('calculatorResult');
    
    if (!data) {
      this.showError('Ошибка получения данных расчета');
      return;
    }

    console.log('Generating PDF estimate:', data);
    this.downloadTextEstimate(data);
  }

  downloadTextEstimate(data) {
    const workTypeNames = {
      brick: 'Гибкий кирпич',
      thermopanel: 'Термопанели',
      insulation: 'Утепление',
      complex: 'Комплексное решение'
    };

    const content = `
СМЕТА НА ОТДЕЛОЧНЫЕ РАБОТЫ
Компания: Арзамас Декор
Дата: ${new Date().toLocaleDateString('ru-RU')}

Тип работ: ${workTypeNames[data.workType]}
Площадь: ${data.area} м²

СТОИМОСТЬ:
Материалы: ${formatNumber(data.result.materialCost)} ₽
Работы: ${formatNumber(data.result.workCost)} ₽
-----------------------------------
ИТОГО: ${formatNumber(data.result.totalCost)} ₽

* Точная стоимость определяется после замера на объекте

Контакты:
Телефон: +7 (995) 776-75-75
Адрес: 14-й микрорайон, Арзамас
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smeta_${Date.now()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  showError(message) {
    alert(message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Calculator();
});