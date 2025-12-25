// Логика отправки заявки из калькулятора

function submitForm() {
    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    
    // Валидация
    if (!name) {
        showNotification('Введите имя', 'error');
        return;
    }
    
    if (!validatePhone(phone)) {
        showNotification('Введите корректный телефон', 'error');
        return;
    }
    
    // Собираем данные из calculatorData
    const data = {
        name: name,
        phone: phone,
        workType: calculatorData.workTypeName || 'Не указано',
        material: calculatorData.materialName || 'Не указано',
        area: calculatorData.area || 0,
        total: document.getElementById('displayTotal').textContent,
        services: calculatorData.services.map(s => {
            const names = {
                delivery: 'Доставка',
                installation: 'Монтаж',
                designer: 'Консультация'
            };
            return names[s.id] || s.id;
        }),
        timestamp: new Date().toLocaleString('ru-RU')
    };
    
    // Отправка на сервер (замените URL на ваш API endpoint)
    const apiUrl = 'https://your-api-endpoint.com/submit'; // ЗАМЕНИТЕ НА ВАШ API!
    
    // Показываем индикатор загрузки
    const submitBtn = document.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    // Симулируем отправку (УДАЛИТЕ ЭТО ПРИ ПОДКЛЮЧЕНИИ РЕАЛЬНОГО API)
    console.log('📤 Данные для отправки:', data);
    
    // Имитация отправки (2 секунды)
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        showNotification(`Спасибо, ${name}! Мы свяжемся с вами в ближайшее время!`);
        
        // Очистка формы
        document.getElementById('clientName').value = '';
        document.getElementById('clientPhone').value = '';
        
        // Предложение нового расчета
        setTimeout(() => {
            if (confirm('Создать новый расчет?')) {
                localStorage.removeItem('arzamas_decor_calculator');
                location.reload();
            }
        }, 3000);
    }, 2000);
    
    /* РАСКОММЕНТИРУЙТЕ ЭТО ДЛЯ РЕАЛЬНОЙ ОТПРАВКИ:
    
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка отправки');
        }
        return response.json();
    })
    .then(result => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        showNotification(`Спасибо, ${name}! Мы свяжемся с вами!`);
        
        // Очистка формы
        document.getElementById('clientName').value = '';
        document.getElementById('clientPhone').value = '';
        
        // Предложение нового расчета
        setTimeout(() => {
            if (confirm('Создать новый расчет?')) {
                localStorage.removeItem('arzamas_decor_calculator');
                location.reload();
            }
        }, 3000);
    })
    .catch(error => {
        console.error('❌ Ошибка:', error);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        showNotification('Ошибка отправки. Попробуйте позже.', 'error');
    });
    */
}

function validatePhone(phone) {
    const cleaned = phone.replace(/[^0-9]/g, '');
    return cleaned.length >= 10;
}