// Placeholder URLs for exchange rate fetching
const garantexUrl = 'https://garantex.org/trading/usdtrub';  // RUB-USD (USDT)
const investingUrl = 'https://ru.investing.com/currencies/usd-thb?ysclid=lup2iddwpb252455021';  // USDT-THB

let rubToUsdRate = 0.012; // Default rate (Replace with API call)
let usdtToThbRate = 36;   // Default rate (Replace with API call)

// Fetch rates (For demonstration, replace with real API calls)
async function fetchRates() {
    rubToUsdRate = 0.012;  // Placeholder for RUB-USD (USDT)
    usdtToThbRate = 36.5;  // Placeholder for USDT-THB
}

// Function to apply markup based on amount
function applyMarkup(amount, baseRate) {
    let markup = 0;

    if (amount >= 1000 && amount <= 10000) {
        markup = 0.05; // 5% markup
    } else if (amount > 10000 && amount <= 20000) {
        markup = 0.04; // 4% markup
    }

    return baseRate * (1 + markup); // Add markup to the base rate
}

// Calculate THB based on RUB or USDT input
async function calculateTHB() {
    await fetchRates(); // Fetch the latest rates
    
    const currency = document.getElementById('currencySelect').value;
    const inputAmount = parseFloat(document.getElementById('inputAmount').value);
    const outputAmountField = document.getElementById('outputAmount');
    const exchangeRateField = document.getElementById('exchangeRate');
    const thbRateField = document.getElementById('thbRate');

    if (isNaN(inputAmount) || inputAmount <= 0) {
        outputAmountField.value = '';
        exchangeRateField.innerText = '';
        thbRateField.innerText = '';
        return;
    }

    let baseRate, exchangeRate, thbAmount;

    if (currency === 'RUB') {
        baseRate = rubToUsdRate * usdtToThbRate; // Base rate without markup
        exchangeRate = applyMarkup(inputAmount, baseRate); // Apply markup
        thbAmount = inputAmount * exchangeRate;
        exchangeRateField.innerText = `1 RUB = ${exchangeRate.toFixed(3)} THB`;
    } else if (currency === 'USDT') {
        baseRate = usdtToThbRate; // Base rate without markup
        exchangeRate = applyMarkup(inputAmount, baseRate); // Apply markup
        thbAmount = inputAmount * exchangeRate;
        exchangeRateField.innerText = `1 USDT = ${exchangeRate.toFixed(3)} THB`;
    }

    thbRateField.innerText = `1 THB = ${(1 / exchangeRate).toFixed(3)} ${currency}`;
    outputAmountField.value = thbAmount.toFixed(2);
}