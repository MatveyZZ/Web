// Автозапуск музыки
function initMusic() {
    const audio = document.getElementById('background-music');
    
    // Устанавливаем громкость
    audio.volume = 0.5;
    
    // Автовоспроизведение с обработкой ошибок
    audio.play().catch(error => {
        console.log('Автовоспроизведение заблокировано браузером');
        // Можно добавить обработку клика для разблокировки
        document.addEventListener('click', function unlockAudio() {
            audio.play();
            document.removeEventListener('click', unlockAudio);
        }, { once: true });
    });
    
    // Бесконечное повторение
    audio.loop = true;
}

// Функция для обновления времени
function updateTime() {
const now = new Date();

// Обновление цифрового времени
const digitalTime = document.getElementById('digital-time');
const timeString = now.toLocaleTimeString('ru-RU');
digitalTime.textContent = timeString;

// Обновление даты в формате xx.xx.xx
const dateDisplay = document.getElementById('date-display');
const day = String(now.getDate()).padStart(2, '0');
const month = String(now.getMonth() + 1).padStart(2, '0');
const year = String(now.getFullYear()).slice(-2); // Берем последние 2 цифры года

dateDisplay.textContent = `${day}.${month}.${year}`;
}

// Функция для расчета положения планет
function updatePlanets() {
    const now = new Date();
    // Используем текущее время для расчета положения планет
    const timeFactor = now.getTime() / 12000000; // Масштабирующий коэффициент
    
    const planets = [
        { 
            id: 'mercury', 
            name: 'Меркурий',
            speed: 4.1, 
            offset: 0,
            radius: 110
        },
        { 
            id: 'venus', 
            name: 'Венера',
            speed: 1.6, 
            offset: 1.5,
            radius: 160
        },
        { 
            id: 'earth', 
            name: 'Земля',
            speed: 1, 
            offset: 3,
            radius: 210
        },
        { 
            id: 'mars', 
            name: 'Марс',
            speed: 0.5, 
            offset: 4.5,
            radius: 260
        },
        { 
            id: 'jupiter', 
            name: 'Юпитер',
            speed: 0.08, 
            offset: 5.5,
            radius: 340
        },
        { 
            id: 'saturn', 
            name: 'Сатурн',
            speed: 0.03, 
            offset: 6.5,
            radius: 420
        },
        { 
            id: 'uranus', 
            name: 'Уран',
            speed: 0.01, 
            offset: 7.5,
            radius: 490
        },
        { 
            id: 'neptune', 
            name: 'Нептун',
            speed: 0.006, 
            offset: 8,
            radius: 560
        }
    ];
    
    // Центр солнечной системы
    const centerX = 250;
    const centerY = 250;
    
    planets.forEach(planet => {
        // Расчет угла планеты на орбите
        const angle = (timeFactor * planet.speed + planet.offset) % (2 * Math.PI);
        
        // Позиция планеты
        const x = centerX + (planet.radius / 2) * Math.cos(angle);
        const y = centerY + (planet.radius / 2) * Math.sin(angle);
        
        // Обновление позиции планеты
        const planetElement = document.getElementById(planet.id);
        planetElement.style.left = `${x}px`;
        planetElement.style.top = `${y}px`;
        
        // Обновление позиции метки планеты
        const labelElement = document.getElementById(`${planet.id}-label`);
        const labelX = centerX + ((planet.radius / 2) + 20) * Math.cos(angle);
        const labelY = centerY + ((planet.radius / 2) + 20) * Math.sin(angle);
        labelElement.style.left = `${labelX}px`;
        labelElement.style.top = `${labelY}px`;
        
        // Обновление кольца Сатурна
        if (planet.id === 'saturn') {
            const ringElement = document.getElementById('saturn-ring');
            ringElement.style.left = `${x}px`;
            ringElement.style.top = `${y}px`;
            ringElement.style.transform = `translate(-50%, -50%) rotate(${angle * 10}rad)`;
        }
    });
}

// Инициализация и запуск обновлений
function init() {
    updateTime();
    updatePlanets();
    
    // Обновление каждую секунду
    setInterval(updateTime, 1000);
    setInterval(updatePlanets, 50);
}

// Запуск при загрузке страницы
window.onload = init;