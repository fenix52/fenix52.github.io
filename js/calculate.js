let calculatorData = {
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

        const STEP_ORDER = ['work-type', 'material', 'configurator', 'dimensions', 'services'];
        let currentStepIndex = 0;

        const materialsByType = {
            facade: [
                {
                    id: 'flexible-brick',
                    name: 'Гибкий кирпич',
                    desc: 'Облицовка гибким кирпичом, легкий материал (2-3 кг/м²)',
                    price: 1080,
                    unit: 'лист',
                    sheetArea: 0.9,
                    hasAMK: true,
                    icon: '<rect x="4" y="4" width="16" height="16" stroke-width="2"/><path d="M8 8h8M8 12h8M8 16h8" stroke-width="2"/>'
                },
                {
                    id: 'thermal-brick',
                    name: 'Термопанель под кирпич',
                    desc: 'Утепление с декором',
                    price: 850,
                    icon: '<rect x="2" y="4" width="20" height="4" stroke-width="2"/><rect x="2" y="10" width="9" height="4" stroke-width="2"/>'
                },
                {
                    id: 'facade-decor',
                    name: 'Фасадный лепной декор',
                    desc: 'Декоративные элементы для фасада',
                    price: 1200,
                    icon: '<circle cx="12" cy="12" r="8" stroke-width="2"/><path d="M12 8v8M8 12h8" stroke-width="2"/>'
                }
            ],
            interior: [
                {
                    id: 'flexible-brick',
                    name: 'Гибкий кирпич',
                    desc: 'Интерьерная отделка, экологичный материал',
                    price: 1080,
                    unit: 'лист',
                    sheetArea: 0.9,
                    hasAMK: true,
                    icon: '<rect x="4" y="4" width="16" height="16" stroke-width="2"/><path d="M8 8h8M8 12h8M8 16h8" stroke-width="2"/>'
                },
                {
                    id: 'interior-decor',
                    name: 'Лепной декор',
                    desc: 'Декоративные элементы для интерьера',
                    price: 1500,
                    icon: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-width="2"/>'
                },
                {
                    id: 'thermal-brick',
                    name: 'Термопанель под кирпич',
                    desc: 'Утепление и звукоизоляция',
                    price: 850,
                    icon: '<rect x="2" y="4" width="20" height="4" stroke-width="2"/>'
                }
            ],
            insulation: [
                {
                    id: 'penoplast50',
                    name: 'Пенопласт 50мм',
                    desc: 'Базовая теплоизоляция, экономия до 30%',
                    price: 350,
                    icon: '<rect x="2" y="4" width="20" height="4" stroke-width="2"/>'
                },
                {
                    id: 'penoplast100',
                    name: 'Пенопласт 100мм',
                    desc: 'Усиленная теплоизоляция, экономия до 50%',
                    price: 650,
                    icon: '<rect x="2" y="4" width="20" height="4" stroke-width="2"/>'
                },
                {
                    id: 'thermopanel',
                    name: 'Термопанель',
                    desc: 'Комплексное утепление с декором',
                    price: 1200,
                    icon: '<rect x="4" y="4" width="16" height="16" stroke-width="2"/>'
                }
            ]
        };

        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.className = 'notification' + (type === 'error' ? ' error' : '');
            notification.style.display = 'block';
            setTimeout(() => { notification.style.display = 'none'; }, 3000);
        }

        function saveToLocalStorage() {
            calculatorData.timestamp = new Date().toISOString();
            localStorage.setItem('arzamas_decor_calculator', JSON.stringify(calculatorData));
        }

        function loadFromLocalStorage() {
    const saved = localStorage.getItem('arzamas_decor_calculator');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            const savedTime = new Date(data.timestamp);
            const now = new Date();
            const minutesDiff = (now - savedTime) / (1000 * 60);
            
            // Восстанавливаем ТОЛЬКО свежие данные (< 30 минут)
            if (minutesDiff < 30) {
                calculatorData = data;
                restoreUI();
                        
                //  Пульсация кнопки
                document.querySelector('.floating-reset')?.classList.add('has-data');
                        
                // Показываем время с момента сохранения
                const timeAgo = Math.floor(minutesDiff);
                setTimeout(() => {
                    showNotification(`💾 Продолжаем расчёт (${timeAgo} мин. назад)`, 'success');
                }, 1000);
                
                console.log(`💾 Автовосстановление (${timeAgo} мин. назад)`);
                return true;
            } else {
                // Данные старые - удаляем молча
                localStorage.removeItem('arzamas_decor_calculator');
                console.log('🗑️ Старые данные удалены (> 30 мин)');
            }
        } catch (e) { 
            console.error('Ошибка загрузки:', e);
            localStorage.removeItem('arzamas_decor_calculator');
        }
    }
    return false;
}

        function restoreUI() {
            if (calculatorData.workType) {
                const card = document.querySelector(`[data-type="${calculatorData.workType}"]`);
                if (card) card.classList.add('selected');
                loadMaterials(calculatorData.workType);
                document.getElementById('step1Next').disabled = false;
            }
            if (calculatorData.material) {
                setTimeout(() => {
                    const card = document.querySelector(`[data-material-id="${calculatorData.material}"]`);
                    if (card) card.classList.add('selected');
                    updateProgressBar();
                    document.getElementById('step2Next').disabled = false;
                }, 100);
            }
            if (calculatorData.area > 0) {
                document.getElementById('calculatedArea').textContent = calculatorData.area.toFixed(2) + ' м²';
                document.getElementById('step4Next').disabled = false;
            }
            updateDisplay();
        }

        function getVisibleSteps() {
            return calculatorData.hasConfigurator ? STEP_ORDER : STEP_ORDER.filter(s => s !== 'configurator');
        }

        function getCurrentStepId() {
            return getVisibleSteps()[currentStepIndex];
        }

        function updateProgressBar() {
            const visibleSteps = getVisibleSteps();
            const totalSteps = visibleSteps.length;
            const configuratorStep = document.querySelector('.step[data-step-id="configurator"]');

            if (calculatorData.hasConfigurator) {
                configuratorStep.classList.remove('hidden');
            } else {
                configuratorStep.classList.add('hidden');
            }

            const steps = document.querySelectorAll('.step:not(.hidden)');
            steps.forEach((step, index) => {
                step.querySelector('.step-circle').textContent = index + 1;
            });

            document.querySelectorAll('.step').forEach(el => el.classList.remove('active', 'completed'));

            visibleSteps.forEach((stepId, index) => {
                const stepEl = document.querySelector(`.step[data-step-id="${stepId}"]`);
                if (index < currentStepIndex) {
                    stepEl.classList.add('completed');
                } else if (index === currentStepIndex) {
                    stepEl.classList.add('active');
                }
            });

            const progress = ((currentStepIndex + 1) / totalSteps) * 100;
            document.getElementById('progressLine').style.width = progress + '%';
        }

        function changeStep(direction) {
            const visibleSteps = getVisibleSteps();
            if (direction === 'next' && currentStepIndex < visibleSteps.length - 1) {
                currentStepIndex++;
            } else if (direction === 'prev' && currentStepIndex > 0) {
                currentStepIndex--;
            }
            document.querySelectorAll('.step-content').forEach(el => el.classList.remove('active'));
            const currentStepId = getCurrentStepId();
            const currentContent = document.querySelector(`.step-content[data-step="${currentStepId}"]`);
            if (currentContent) currentContent.classList.add('active');
            updateProgressBar();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function goToNextStep() { changeStep('next'); }
        function goToPrevStep() { changeStep('prev'); }

        function validateNumberInput(input, min, max) {
            const value = parseFloat(input.value);
            if (input.value === '') {
                input.classList.remove('error');
                return true;
            }
            if (isNaN(value) || value < min || value > max) {
                input.classList.add('error');
                return false;
            }
            input.classList.remove('error');
            return true;
        }

        function validatePhone(phone) {
            return phone.replace(/[^0-9]/g, '').length >= 10;
        }

        function formatPhone(input) {
            let value = input.value.replace(/[^0-9]/g, '');
            if (value.length > 0) {
                if (value[0] === '8') value = '7' + value.slice(1);
                if (value[0] !== '7') value = '7' + value;
            }
            let formatted = '+7';
            if (value.length > 1) formatted += ' (' + value.substring(1, 4);
            if (value.length >= 5) formatted += ') ' + value.substring(4, 7);
            if (value.length >= 8) formatted += '-' + value.substring(7, 9);
            if (value.length >= 10) formatted += '-' + value.substring(9, 11);
            input.value = formatted;
        }

        function loadMaterials(workType) {
            const grid = document.getElementById('materialsGrid');
            grid.innerHTML = '';
            const materials = materialsByType[workType] || [];
            materials.forEach(mat => {
                const card = document.createElement('div');
                card.className = 'option-card';
                card.dataset.materialId = mat.id;
                card.dataset.hasAmk = mat.hasAMK || false;
                card.innerHTML = `
                    <svg class="option-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        ${mat.icon}
                    </svg>
                    <div class="option-title">${mat.name}</div>
                    <div class="option-desc">${mat.desc}</div>
                    <div class="option-price">${mat.price} ₽${mat.unit ? '/' + mat.unit : '/м²'}</div>
                `;
                card.addEventListener('click', () => selectMaterial(mat, card));
                grid.appendChild(card);
            });
        }

        function selectMaterial(mat, cardElement) {
            document.querySelectorAll('#materialsGrid .option-card').forEach(c => c.classList.remove('selected'));
            cardElement.classList.add('selected');
            calculatorData.material = mat.id;
            calculatorData.materialName = mat.name;
            calculatorData.materialPrice = mat.price;
            calculatorData.materialUnit = mat.unit || 'm2';
            calculatorData.sheetArea = mat.sheetArea || 0;
            calculatorData.hasConfigurator = mat.hasAMK || false;
            updateProgressBar();
            document.getElementById('step2Next').disabled = false;
            saveToLocalStorage();
            updateDisplay();
            showNotification(`Материал "${mat.name}" выбран`);
        }

        document.querySelectorAll('[data-type]').forEach(card => {
            card.addEventListener('click', function() {
                document.querySelectorAll('[data-type]').forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                calculatorData.workType = this.dataset.type;
                const names = { facade: 'Отделка фасада', interior: 'Отделка интерьера', insulation: 'Утепление фасада' };
                calculatorData.workTypeName = names[calculatorData.workType];
                loadMaterials(calculatorData.workType);
                document.getElementById('step1Next').disabled = false;
                saveToLocalStorage();
                updateDisplay();
            });
        });

        document.getElementById('step1Next').addEventListener('click', () => {
            if (!calculatorData.workType) { showNotification('Выберите тип работ', 'error'); return; }
            goToNextStep();
        });

        document.getElementById('step2Next').addEventListener('click', () => {
            if (!calculatorData.material) { showNotification('Выберите материал', 'error'); return; }
            goToNextStep();
        });

        document.getElementById('step4Next').addEventListener('click', () => {
            if (calculatorData.area === 0) { showNotification('Укажите площадь', 'error'); return; }
            goToNextStep();
        });

        const lengthInput = document.getElementById('lengthInput');
        const heightInput = document.getElementById('heightInput');
        lengthInput.addEventListener('input', function() { validateNumberInput(this, 0.1, 1000); calcAreaFromInputs(); });
        heightInput.addEventListener('input', function() { validateNumberInput(this, 0.1, 100); calcAreaFromInputs(); });

        function calcAreaFromInputs() {
            const len = parseFloat(lengthInput.value) || 0;
            const hei = parseFloat(heightInput.value) || 0;
            if (validateNumberInput(lengthInput, 0.1, 1000) && validateNumberInput(heightInput, 0.1, 100)) {
                const area = len * hei;
                calculatorData.area = area;
                document.getElementById('calculatedArea').textContent = area.toFixed(2) + ' м²';
                document.getElementById('step4Next').disabled = area === 0;
                saveToLocalStorage();
                updateDisplay();
            }
        }

        function setQuickArea(value) {
            calculatorData.area = value;
            lengthInput.value = ''; heightInput.value = '';
            lengthInput.classList.remove('error'); heightInput.classList.remove('error');
            document.getElementById('calculatedArea').textContent = value.toFixed(2) + ' м²';
            document.getElementById('step4Next').disabled = false;
            saveToLocalStorage();
            updateDisplay();
        }

        document.querySelectorAll('.checkbox-item input').forEach(cb => {
            cb.addEventListener('change', function() {
                const fixed = parseInt(this.dataset.fixed) || 0;
                const perM2 = parseInt(this.dataset.perm2) || 0;
                if (this.checked) {
                    this.closest('.checkbox-item').classList.add('checked');
                    calculatorData.services.push({ id: this.value, fixed: fixed, perM2: perM2 });
                } else {
                    this.closest('.checkbox-item').classList.remove('checked');
                    calculatorData.services = calculatorData.services.filter(s => s.id !== this.value);
                }
                saveToLocalStorage();
                updateDisplay();
            });
        });

        function updateDisplay() {
            document.getElementById('displayWorkType').textContent = calculatorData.workTypeName || 'Не выбрано';
            document.getElementById('displayMaterial').textContent = calculatorData.materialName || 'Не выбрано';
            document.getElementById('displayArea').textContent = calculatorData.area ? calculatorData.area.toFixed(2) + ' м²' : '0 м²';
            const srvNames = { delivery: 'Доставка', installation: 'Монтаж', designer: 'Консультация' };
            const srvText = calculatorData.services.length > 0 ? calculatorData.services.map(s => srvNames[s.id]).join(', ') : 'Нет';
            document.getElementById('displayServices').textContent = srvText;
            let matCost = 0, sheetsCount = 0;
            if (calculatorData.sheetArea > 0) {
                sheetsCount = Math.ceil(calculatorData.area / calculatorData.sheetArea);
                matCost = sheetsCount * calculatorData.materialPrice;
                document.getElementById('sheetsRow').style.display = 'flex';
                document.getElementById('displaySheets').textContent = sheetsCount + ' шт';
            } else {
                matCost = calculatorData.area * calculatorData.materialPrice;
                document.getElementById('sheetsRow').style.display = 'none';
            }
            let srvCost = 0;
            calculatorData.services.forEach(s => { srvCost += s.fixed + (s.perM2 * calculatorData.area); });
            const total = matCost + srvCost;
            if (matCost > 0) {
                document.getElementById('materialCostRow').style.display = 'flex';
                animateValue('displayMaterialCost', matCost);
            } else {
                document.getElementById('materialCostRow').style.display = 'none';
            }
            animateValue('displayTotal', total);
        }

        function animateValue(elementId, endValue) {
            const element = document.getElementById(elementId);
            const startValue = parseInt(element.textContent.replace(/[^0-9]/g, '')) || 0;
            const duration = 500, startTime = performance.now();
            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(startValue + (endValue - startValue) * easeProgress);
                element.textContent = currentValue.toLocaleString('ru-RU') + ' ₽';
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
        }

        function finalizeCalculator() {
            if (calculatorData.area === 0) { showNotification('Укажите площадь', 'error'); return; }
            document.getElementById('contactForm').classList.add('show');
            document.querySelector('.estimate-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            showNotification('Заполните контактные данные');
        }

        function downloadPDF() {
            const name = document.getElementById('clientName').value.trim();
            const phone = document.getElementById('clientPhone').value.trim();
            if (!name) { showNotification('Введите имя', 'error'); return; }
            if (!validatePhone(phone)) { showNotification('Введите корректный телефон', 'error'); return; }
            try {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                doc.setFontSize(20); doc.text('Смета - Арзамас Декор', 20, 20);
                doc.setFontSize(12); let y = 40;
                doc.text(`Клиент: ${name}`, 20, y); y += 10;
                doc.text(`Телефон: ${phone}`, 20, y); y += 10;
                doc.text(`Дата: ${new Date().toLocaleDateString('ru-RU')}`, 20, y); y += 20;
                doc.text(`Тип работ: ${calculatorData.workTypeName}`, 20, y); y += 10;
                doc.text(`Материал: ${calculatorData.materialName}`, 20, y); y += 10;
                doc.text(`Площадь: ${calculatorData.area.toFixed(2)} м²`, 20, y); y += 10;
                if (calculatorData.sheetArea > 0) {
                    const sheets = Math.ceil(calculatorData.area / calculatorData.sheetArea);
                    doc.text(`Листов: ${sheets} шт`, 20, y); y += 10;
                }
                if (calculatorData.services.length > 0) {
                    doc.text('Услуги:', 20, y); y += 10;
                    const srvNames = { delivery: 'Доставка', installation: 'Монтаж', designer: 'Консультация' };
                    calculatorData.services.forEach(s => { doc.text(`  - ${srvNames[s.id]}`, 20, y); y += 8; });
                }
                y += 10;
                const total = document.getElementById('displayTotal').textContent;
                doc.setFontSize(16); doc.text(`ИТОГО: ${total}`, 20, y); y += 20;
                doc.setFontSize(10); doc.text('* Окончательная стоимость определяется после замера', 20, y);
                doc.save(`Смета_Арзамас_Декор_${Date.now()}.pdf`);
                showNotification('PDF сохранена!');
            } catch (error) {
                console.error('Ошибка PDF:', error);
                showNotification('Ошибка PDF', 'error');
            }
        }

        function sendToTelegram() {
            const name = document.getElementById('clientName').value.trim();
            const phone = document.getElementById('clientPhone').value.trim();
            if (!name) { showNotification('Введите имя', 'error'); return; }
            if (!validatePhone(phone)) { showNotification('Введите корректный телефон', 'error'); return; }
            const total = document.getElementById('displayTotal').textContent;
            let message = `🧱 Новая заявка - Арзамас Декор\n\n`;
            message += `👤 Клиент: ${name}\n📞 Телефон: ${phone}\n`;
            message += `📅 Дата: ${new Date().toLocaleString('ru-RU')}\n\n`;
            message += `🏗️ Тип работ: ${calculatorData.workTypeName}\n`;
            message += `🧱 Материал: ${calculatorData.materialName}\n`;
            message += `📏 Площадь: ${calculatorData.area.toFixed(2)} м²\n`;
            if (calculatorData.sheetArea > 0) {
                const sheets = Math.ceil(calculatorData.area / calculatorData.sheetArea);
                message += `📦 Листов: ${sheets} шт\n`;
            }
            if (calculatorData.services.length > 0) {
                message += `\n✅ Услуги:\n`;
                const srvNames = { delivery: 'Доставка', installation: 'Монтаж', designer: 'Консультация' };
                calculatorData.services.forEach(s => { message += `  • ${srvNames[s.id]}\n`; });
            }
            message += `\n💰 ИТОГО: ${total}`;
            const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent('https://tsarkov.tech')}&text=${encodeURIComponent(message)}`;
            window.open(telegramUrl, '_blank');
            showNotification('Telegram открыт');
        }

        function submitForm() {
            const name = document.getElementById('clientName').value.trim();
            const phone = document.getElementById('clientPhone').value.trim();
            if (!name) { showNotification('Введите имя', 'error'); return; }
            if (!validatePhone(phone)) { showNotification('Введите корректный телефон', 'error'); return; }
            showNotification(`Спасибо, ${name}! Мы свяжемся с вами`);
            setTimeout(() => {
                if (confirm('Создать новый расчет?')) {
                    localStorage.removeItem('arzamas_decor_calculator');
                    location.reload();
                }
            }, 2000);
        }

        document.getElementById('clientPhone').addEventListener('input', function() { formatPhone(this); });

        /* AMK Script */

        const colorMixes = [
            { id: 100, name: 'микс 100', color: '#d4a574', price: 1080, 
              paletteImage: '/images/calcimg/100-4.jpg',
              images: { exterior: '/images/calcimg/100.jpg', interior: '/images/calcimg/100-1.jpg', balcony: '/images/calcimg/100-2.jpg' }
            },
            { id: 200, name: 'микс 200', color: '#8a8a8a', price: 1080, 
              paletteImage: '/images/calcimg/200-4.jpg',
              images: { exterior: '/images/calcimg/200.jpg', interior: '/images/calcimg/200-1.jpg', balcony: '/images/calcimg/200-2.jpg' }
            },
            { id: 241, name: 'микс 241', color: '#4a4a4a', price: 1080, 
              paletteImage: '/images/calcimg/241-4.jpg',
              images: { exterior: '/images/calcimg/241.jpg', interior: '/images/calcimg/241-1.jpg', balcony: '/images/calcimg/241-2.jpg' }
            },
            { id: 300, name: 'микс 300', color: '#c89b7b', price: 1080, 
              paletteImage: '/images/calcimg/300-4.jpg',
              images: { exterior: '/images/calcimg/300.jpg', interior: '/images/calcimg/300-1.jpg', balcony: '/images/calcimg/300-2.jpg' }
            },
            { id: 322, name: 'микс 322', color: '#8b5a3c', price: 1080, 
              paletteImage: '/images/calcimg/322-4.jpg',
              images: { exterior: '/images/calcimg/322.jpg', interior: '/images/calcimg/322-1.jpg', balcony: '/images/calcimg/322-2.jpg' }
            },
            { id: 410, name: 'микс 410', color: '#b87c6c', price: 1080, 
              paletteImage: '/images/calcimg/410-4.jpg',
              images: { exterior: '/images/calcimg/410.jpg', interior: '/images/calcimg/410-1.jpg', balcony: '/images/calcimg/410-2.jpg' }
            },
            { id: 432, name: 'микс 432', color: '#9d5a4a', price: 1080, 
              paletteImage: '/images/calcimg/432-4.jpg',
              images: { exterior: '/images/calcimg/432.jpg', interior: '/images/calcimg/432-1.jpg', balcony: '/images/calcimg/432-2.jpg' }
            },
            { id: 500, name: 'микс 500', color: '#d4926a', price: 1080, 
              paletteImage: '/images/calcimg/500-4.jpg',
              images: { exterior: '/images/calcimg/500.jpg', interior: '/images/calcimg/500-1.jpg', balcony: '/images/calcimg/500-2.jpg' }
            }
        ];

        let currentSelection = colorMixes[0];
        let currentImageType = 'exterior';

        function init() {
            renderColorPalette();
            setupEventListeners();
            updateGalleryImages();        
        }

        function renderColorPalette() {
            const palette = document.getElementById('colorPalette');
            palette.innerHTML = '';

            colorMixes.forEach((mix, index) => {
                const option = document.createElement('div');
                option.className = `color-option ${index === 0 ? 'selected' : ''}`;
                option.dataset.id = mix.id;

                option.innerHTML = `
                    <div class="color-option-bg" style="background-image: url('${mix.paletteImage}');"></div>
                    <div class="color-label">${mix.id}</div>
                `;

                option.addEventListener('click', () => selectColor(mix, option));
                palette.appendChild(option);
            });
        }

        function selectColor(mix, element) {
            currentSelection = mix;
            currentImageType = 'exterior';

            document.querySelectorAll('.color-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            element.classList.add('selected');

            document.getElementById('selectionText').textContent = mix.name;
            document.getElementById('priceValue').textContent = mix.price;

            updateGalleryImages();
        }

        function updateGalleryImages() {
            document.getElementById('exteriorImage').src = currentSelection.images.exterior;
            document.getElementById('interiorImage').src = currentSelection.images.interior;
            document.getElementById('balconyImage').src = currentSelection.images.balcony;
            updateActiveStates();
        }

        function updateActiveStates() {
            const items = document.querySelectorAll('.gallery-item');
            items.forEach(item => item.classList.remove('active'));

            const activeItem = document.querySelector(`[data-type="${currentImageType}"]`);
            if (activeItem) {
                activeItem.classList.add('active');
            }
        }

        function switchImage(type) {
            currentImageType = type;
            updateActiveStates();
        }

        function handleNext() {
            console.log('Выбранный материал:', currentSelection);
            alert(`Выбран: ${currentSelection.name}\nПереход на следующий шаг...`);
        }

        function setupEventListeners() {
            document.querySelectorAll('.view-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const view = btn.dataset.view;
                    if (view === 'photos') {
                        document.getElementById('photoGallery').style.display = 'flex';
                        document.getElementById('specifications').style.display = 'none';
                    } else {
                        document.getElementById('photoGallery').style.display = 'none';
                        document.getElementById('specifications').style.display = 'flex';
                    }
                });
            });

            document.querySelectorAll('.gallery-item').forEach(item => {
                item.addEventListener('click', () => {
                    const type = item.dataset.type;
                    switchImage(type);
                });
            });
        }

        init();
    

        (function() {
            document.querySelectorAll('.view-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault(); e.stopPropagation();
                    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    const isPhotos = this.textContent.includes('Фотографии');
                    const galleryContainer = document.querySelector('.gallery-container');
                    const characteristics = document.querySelector('.characteristics');
                    if (galleryContainer && characteristics) {
                        if (isPhotos) {
                            galleryContainer.style.display = 'flex';
                            characteristics.style.display = 'none';
                        } else {
                            galleryContainer.style.display = 'none';
                            characteristics.style.display = 'flex';
                        }
                    }
                });
            });
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault(); e.stopPropagation();
                    document.querySelectorAll('.gallery-item').forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            const originalSelectMix = window.selectMix;
            if (typeof originalSelectMix === 'function') {
                window.selectMix = function(mix) {
                    originalSelectMix.call(this, mix);
                    calculatorData.amkMix = { id: mix.id, name: mix.name, price: mix.price };
                    calculatorData.materialPrice = mix.price;
                    saveToLocalStorage();
                    updateDisplay();
                };
            }
        })();

        window.addEventListener('DOMContentLoaded', function() {
            console.log('✅ Калькулятор Арзамас Декор загружен');
            console.log('📋 Версия: 3.3 with logo.png');
            console.log('✅ Логотип: logo.png');
            loadFromLocalStorage();
            updateProgressBar();
        });

// Автозаполнение из URL параметров 
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');
    
    if (service) {
        console.log('🔗 Получен параметр service:', service);
        
        const serviceMap = {
            'flexible-brick': { 
                workType: 'facade', 
                materialId: 'flexible-brick',
                name: 'Гибкий кирпич'
            },
            'thermal-brick': { 
                workType: 'facade', 
                materialId: 'thermal-brick',
                name: 'Термопанель под кирпич'
            },
            'insulation': { 
                workType: 'insulation', 
                materialId: 'penoplast50',
                name: 'Пенопласт 50мм'
            }
        };
        
        const config = serviceMap[service];
        if (config) {
            console.log('🎯 Мгновенный автовыбор:', config.name);
            
            // Шаг 1: МГНОВЕННЫЙ выбор типа работ
            const workCard = document.querySelector(`[data-type="${config.workType}"]`);
            if (workCard) {
                workCard.click();
                console.log('✅ Шаг 1: Тип работ -', config.workType);
                
                // Шаг 2: Минимальная задержка для рендеринга материалов
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        const materialCard = document.querySelector(`[data-material-id="${config.materialId}"]`);
                        if (materialCard) {
                            materialCard.click();
                            console.log('✅ Шаг 2: Материал -', config.materialId);
                            
                            // Шаг 3: Мгновенный переход
                            requestAnimationFrame(() => {
                                goToNextStep();
                                console.log('✅ Шаг 3: Переход к размерам');
                                showNotification(`🎯 Выбрано: ${config.name}`);
                            });
                        }
                    }, 50); // 50ms - минимум для загрузки материалов
                });
            }
        }
    }
});


// ============================================
// ФУНКЦИЯ СБРОСА КАЛЬКУЛЯТОРА
// ============================================
function resetCalculator() {
    // Очистка localStorage
    localStorage.removeItem('arzamas_decor_calculator');
    
    // Уведомление пользователя
    showNotification('🔄 Калькулятор сброшен', 'success');
    
    // Задержка для показа уведомления
    setTimeout(() => {
        // Перезагрузка страницы на чистый калькулятор
        window.location.href = '/calculator.html';
    }, 500);
}
