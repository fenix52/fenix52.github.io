/**
 * 🔧 Service Worker Registration
 * Регистрирует SW для офлайн-работы и кэширования
 */

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker зарегистрирован:', registration.scope);

                // Проверка обновлений
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    console.log('🔄 Найдено обновление SW');

                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // Новая версия доступна
                            showUpdateNotification();
                        }
                    });
                });

                // Автоматическая проверка обновлений каждые 60 секунд
                setInterval(() => {
                    registration.update();
                }, 60000);
            })
            .catch(error => {
                console.error('❌ Ошибка регистрации SW:', error);
            });
    });

    // Обработка сообщений от SW
    navigator.serviceWorker.addEventListener('message', event => {
        if (event.data && event.data.type === 'CACHE_UPDATED') {
            console.log('📄 Кэш обновлён');
        }
    });

    // Показ уведомления о обновлении
    function showUpdateNotification() {
        const notification = document.getElementById('update-notification');
        if (notification) {
            notification.style.display = 'block';
            return;
        }

        // Создаём уведомление
        const div = document.createElement('div');
        div.id = 'update-notification';
        div.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                font-family: system-ui, -apple-system, sans-serif;
                max-width: 300px;
            ">
                <div style="font-weight: bold; margin-bottom: 8px;">🎉 Новая версия доступна!</div>
                <div style="font-size: 14px; margin-bottom: 12px;">Перезагрузите страницу для применения изменений</div>
                <button onclick="window.location.reload()" style="
                    background: white;
                    color: #4CAF50;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                    width: 100%;
                ">Обновить сейчас</button>
            </div>
        `;
        document.body.appendChild(div);
    }
} else {
    console.warn('⚠️ Service Worker не поддерживается в данном браузере');
}

// Проверка онлайн/офлайн статуса
window.addEventListener('online', () => {
    console.log('✅ Интернет подключен');
    hideOfflineNotification();
});

window.addEventListener('offline', () => {
    console.log('⚠️ Нет интернета (работа в офлайн режиме)');
    showOfflineNotification();
});

function showOfflineNotification() {
    if (document.getElementById('offline-notification')) return;

    const div = document.createElement('div');
    div.id = 'offline-notification';
    div.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #FF9800;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-family: system-ui, -apple-system, sans-serif;
            animation: slideDown 0.3s ease-out;
        ">
            ⚠️ Нет интернета. Работаем в офлайн режиме.
        </div>
    `;
    document.body.appendChild(div);
}

function hideOfflineNotification() {
    const notification = document.getElementById('offline-notification');
    if (notification) {
        notification.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }
}

// Добавляем CSS анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);