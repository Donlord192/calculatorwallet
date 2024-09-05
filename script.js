// Placeholder URLs for exchange rate fetching
const garantexUrl = 'https://garantex.org/trading/usdtrub';  // RUB-USD (USDT)
const investingUrl = 'https://ru.investing.com/currencies/usd-thb?ysclid=lup2iddwpb252455021';  // USDT-THB

let rubToUsdRate = 0.012; // Default rate
let usdtToThbRate = 36;   // Default rate

// Mock function to fetch rates (you would replace this with actual API fetching)
async function fetchRates() {
    // For now, use hardcoded rates
    rubToUsdRate = 0.012;  // Placeholder rate from garantex
    usdtToThbRate = 36.5;  // Placeholder rate from investing.com
}

// Calculate THB based on RUB or USDT input
async function calculateTHB() {
    await fetchRates(); // Fetch the latest rates
    
    const currency = document.getElementById('currencySelect').value;
    const inputAmount = document.getElementById('inputAmount').value;
    const outputAmountField = document.getElementById('outputAmount');
    const exchangeRateField = document.getElementById('exchangeRate');
    const thbRateField = document.getElementById('thbRate');

    let exchangeRate, thbAmount;

    if (currency === 'RUB') {
        exchangeRate = rubToUsdRate * usdtToThbRate;
        thbAmount = inputAmount * exchangeRate;
        exchangeRateField.innerText = `1 RUB = ${exchangeRate.toFixed(3)} THB`;
    } else if (currency === 'USDT') {
        exchangeRate = usdtToThbRate;
        thbAmount = inputAmount * exchangeRate;
        exchangeRateField.innerText = `1 USDT = ${exchangeRate.toFixed(3)} THB`;
    }

    thbRateField.innerText = `1 THB = ${(1 / exchangeRate).toFixed(3)} ${currency}`;
    outputAmountField.value = thbAmount.toFixed(2);
}
