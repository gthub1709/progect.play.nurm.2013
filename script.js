const gameData = {
    games: [
        {
            name: "Dark Souls",
            hint: "Prepare to die... Культовая серия от FromSoftware. Костры, перекаты и бессчётные смерти. Praise the Sun!"
        },
        {
            name: "Hollow Knight",
            hint: "Метроидвания про маленького рыцаря в павшем королевстве насекомых. Город слёз находится под Грибными пустошами."
        },
        {
            name: "Bloodborne",
            hint: "Охота начинается в Ярнаме. Страх старой крови приведёт к безумию. Глаза на висках помогут прозреть истину."
        },
        {
            name: "Sekiro",
            hint: "Дважды не умирают... Волк-шиноби защищает своего господина в средневековой Японии. Бессмертный клинок разит дважды."
        },
        {
            name: "Celeste",
            hint: "Платформер про восхождение на гору и борьбу с внутренними демонами. Мэдлин должна преодолеть себя на пике Селеста."
        },
        {
            name: "Cuphead",
            hint: "Братья заключили сделку с дьяволом. Run and gun в стиле мультфильмов 1930-х. Дьявольски сложные боссы."
        },
        {
            name: "Factorio",
            hint: "Автоматизация производства на враждебной планете. Завод должен расти. Конвейеры и роботы - ключ к оптимизации."
        },
        {
            name: "Dwarf Fortress",
            hint: "Самая сложная симуляция фэнтезийного мира. ASCII-графика скрывает невероятную глубину. Проигрыш - это весело!"
        },
        {
            name: "Binding of Isaac",
            hint: "Рогалик про плачущего мальчика в подвале. Мама услышала глас свыше. Предметы синергируют случайным образом."
        },
        {
            name: "Kerbal Space Program",
            hint: "Реалистичный симулятор космической программы. Зелёные человечки покоряют космос. Дельта-v решает всё."
        },
        {
            name: "Crusader Kings",
            hint: "Средневековый симулятор династий от Paradox. Инцест, убийства и интриги. Дуэлист-людоед на папском престоле."
        },
        {
            name: "Nethack",
            hint: "Классический рогалик с UNIX-систем. YASD - Yet Another Stupid Death. Можно приручить кошку и умереть от еды."
        },
        {
            name: "EVE Online",
            hint: "Космическая MMO про корпорации и предательство. Таблицы в Excel важнее боевых навыков. Интриги реальнее реальности."
        },
        {
            name: "Noita",
            hint: "Каждый пиксель симулируется. Создавай свои заклинания и умирай от них же. Алхимические реакции непредсказуемы."
        },
        {
            name: "Rain World",
            hint: "Выживание слагкэта в мире после апокалипсиса. Кармические врата требуют жертв. Хищники помнят твои повадки."
        },
        {
            name: "La Mulana",
            hint: "Археологические исследования древних руин. Загадки требуют записей и дедукции. Планшет с рунами хранит секреты."
        },
        {
            name: "Pathologic",
            hint: "Чумной доктор в степном городе. Время неумолимо, решения необратимы. Многорукий бог ждёт в театре."
        },
        {
            name: "Caves of Qud",
            hint: "Пост-пост-апокалиптический рогалик. Мутации и кибернетика. Живые пещеры хранят тайны древних."
        },
        {
            name: "Cultist Simulator",
            hint: "Карточная игра про оккультизм и безумие. Время пожирает карты. Мансус открывается через сны."
        },
        {
            name: "Getting Over It",
            hint: "Человек в котле с киркой карабкается вверх. Философ комментирует твои падения. Потеря прогресса неизбежна."
        }
    ]
};

let currentMode = 'games';
let currentIndex = 0;
let currentScore = 0;
let bestScore = {
    games: 0
};
let timeLeft = 30; // Время на ответ в секундах
let timer = null;
let hints = 3; // Количество подсказок

// Загружаем лучший счёт из localStorage
if (localStorage.getItem('bestScores')) {
    bestScore = JSON.parse(localStorage.getItem('bestScores'));
}

function updateTimer() {
    document.getElementById('timer').textContent = `Время: ${timeLeft}с`;
    if (timeLeft <= 0) {
        clearInterval(timer);
        showMessage(`Время вышло! Это была игра ${gameData.games[currentIndex].name}`, false);
        nextGame();
    }
    timeLeft--;
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timer = setInterval(updateTimer, 1000);
}

function nextGame() {
    currentIndex++;
    if (currentIndex >= gameData.games.length) {
        endGame();
        return;
    }
    timeLeft = 30;
    updateGame();
    startTimer();
}

function endGame() {
    clearInterval(timer);
    showMessage(`Игра окончена! Финальный счёт: ${currentScore}`, true);
    if (currentScore > bestScore.games) {
        bestScore.games = currentScore;
        localStorage.setItem('bestScores', JSON.stringify(bestScore));
        showMessage(`Новый рекорд: ${currentScore}!`, true);
    }
    currentIndex = 0;
    currentScore = 0;
    hints = 3;
    updateGame();
    updateScoreDisplay();
    startTimer();
}

function useHint() {
    if (hints > 0) {
        const game = gameData.games[currentIndex];
        const name = game.name;
        hints--;
        // Показываем первую букву и длину слова
        showMessage(`Первая буква: ${name[0]}, Длина: ${name.length} букв`, true);
        document.getElementById('hints').textContent = `Подсказки: ${hints}`;
    } else {
        showMessage('Подсказки закончились!', false);
    }
}

function updateGame() {
    const data = gameData.games[currentIndex];
    document.getElementById('hint').textContent = `Подсказка: ${data.hint}`;
    document.getElementById('user-input').value = '';
    document.getElementById('user-input').placeholder = 'Введите название игры';
    document.getElementById('hints').textContent = `Подсказки: ${hints}`;
    document.getElementById('timer').textContent = `Время: ${timeLeft}с`;
}

function showMessage(text, isCorrect) {
    const message = document.getElementById('message');
    message.textContent = text;
    message.style.color = isCorrect ? '#4CAF50' : '#ff4444';
    message.style.display = 'block';
    
    setTimeout(() => {
        message.style.display = 'none';
    }, 2000);
}

function updateScoreDisplay() {
    document.getElementById('currentScore').textContent = `Текущий счёт: ${currentScore}`;
    document.getElementById('bestScore').textContent = `Лучший счёт: ${bestScore.games}`;
}

function checkAnswer() {
    const userInput = document.getElementById('user-input').value.trim().toLowerCase();
    const correctAnswer = gameData.games[currentIndex].name.toLowerCase();
    
    if (userInput === correctAnswer) {
        currentScore++;
        showMessage('Правильно! +1 очко', true);
        // Бонусные очки за быстрый ответ
        if (timeLeft > 20) {
            currentScore++;
            showMessage('Бонус за скорость! +1 очко', true);
        }
    } else {
        showMessage(`Неправильно! Это была игра ${gameData.games[currentIndex].name}`, false);
    }
    
    nextGame();
}

// Инициализация игры
window.onload = () => {
    updateGame();
    updateScoreDisplay();
    startTimer();

    // Добавляем обработчик нажатия Enter
    document.getElementById('user-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });

    // Добавляем обработчик для кнопки подсказки
    document.getElementById('hint-btn').addEventListener('click', useHint);
};
