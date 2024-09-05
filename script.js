// Ставим placeholder для курса
let rubToUsdRate = 0.012;  // Примерный курс RUB -> USDT
let usdtToThbRate = 36.5;  // Примерный курс USDT -> THB

// Функция для обновления данных
async function fetchRates() {
    rubToUsdRate = 0.012;  // Реальный курс RUB-USDT
    usdtToThbRate = 36.5;  // Реальный курс USDT-THB
}

// Определение процента накрутки в зависимости от выбранного диапазона
function getMarkup(range) {
    switch (range) {
        case '1000-10000':
            return 0.05; // 5% накрутка
        case '10000-20000':
            return 0.04; // 4% накрутка
        case '20000-30000':
            return 0.035; // 3.5% накрутка
        case '30000-40000':
            return 0.032; // 3.2% накрутка
        case '40000-50000':
            return 0.03; // 3% накрутка
        case '50000-60000':
            return 0.028; // 2.8% накрутка
        case '60000-70000':
            return 0.026; // 2.6% накрутка
        case '70000-80000':
            return 0.024; // 2.4% накрутка
        case '80000-90000':
            return 0.022; // 2.2% накрутка
        case '90000-100000':
            return 0.02;  // 2% накрутка
        default:
            return 0;
    }
}

// Основная функция для расчета суммы
function calculateTHB() {
    const currency = document.getElementById('currencySelect').value;
    const range = document.getElementById('rangeSelect').value;
    const amount = parseFloat(document.getElementById('inputAmount').value) || 0;
    const markup = getMarkup(range);

    let result = 0;

    // Рассчитываем сумму с накруткой
    if (currency === 'RUB') {
        const rubToThbRate = rubToUsdRate * usdtToThbRate;
        result = (amount * rubToThbRate) * (1 - markup); // Учитываем накрутку
        document.getElementById('exchangeRate').innerText = `1 RUB = ${rubToThbRate.toFixed(6)} THB`;
    } else if (currency === 'USDT') {
        result = amount * usdtToThbRate * (1 - markup);  // Учитываем накрутку
        document.getElementById('exchangeRate').innerText = `1 USDT = ${usdtToThbRate.toFixed(6)} THB`;
    }

    // Отображаем итоговую сумму
    document.getElementById('outputAmount').value = result.toFixed(2);
    document.getElementById('thbRate').innerText = `Текущий курс: ${usdtToThbRate.toFixed(2)} THB за USDT`;
}