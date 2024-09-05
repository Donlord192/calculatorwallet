let rubToUsdRate = 0.012;  // Примерный курс RUB -> USDT
let usdtToThbRate = 36.5;  // Примерный курс USDT -> THB

// Функция для получения процентной накрутки на основе суммы
function getMarkup(amount) {
    if (amount >= 1000 && amount < 10000) {
        return 0.05;  // 5% накрутка
    } else if (amount >= 10000 && amount < 20000) {
        return 0.04;
    } else if (amount >= 20000 && amount < 30000) {
        return 0.035;
    } else if (amount >= 30000 && amount < 40000) {
        return 0.032;
    } else if (amount >= 40000 && amount < 50000) {
        return 0.03;
    } else if (amount >= 50000 && amount < 60000) {
        return 0.028;
    } else if (amount >= 60000 && amount < 70000) {
        return 0.026;
    } else if (amount >= 70000 && amount < 80000) {
        return 0.024;
    } else if (amount >= 80000 && amount < 90000) {
        return 0.022;
    } else if (amount >= 90000 && amount < 100000) {
        return 0.02;
    } else {
        return 0;
    }
}

// Основная функция для расчета суммы
function calculateTHB() {
    const currency = document.getElementById('currencySelect').value;
    const amount = parseFloat(document.getElementById('inputAmount').value) || 0;
    const markup = getMarkup(amount);  // Получаем процентную накрутку

    let result = 0;
    let finalRate = 0;

    // Рассчитываем сумму и итоговый курс с учетом накрутки
    if (currency === 'RUB') {
        const rubToThbRate = 2.85;  // Примерный курс RUB -> THB (базовый)
        finalRate = rubToThbRate * (1 - markup);  // Уменьшаем курс, улучшая его для клиента
        result = amount / finalRate;  // Рассчитываем сумму в THB
        document.getElementById('exchangeRate').innerText = `1 THB = ${finalRate.toFixed(2)} RUB`;
    } else if (currency === 'USDT') {
        finalRate = usdtToThbRate * (1 - markup);  // Уменьшаем курс для USDT
        result = amount * finalRate;  // Рассчитываем сумму в THB
        document.getElementById('exchangeRate').innerText = `1 USDT = ${finalRate.toFixed(2)} THB`;
    }

    // Отображаем итоговую сумму
    document.getElementById('outputAmount').value = result.toFixed(2);
    document.getElementById('thbRate').innerText = `Текущий курс: 1 THB = ${finalRate.toFixed(2)} RUB/USDT`;
}