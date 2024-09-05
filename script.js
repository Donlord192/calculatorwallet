// Placeholder for fetching real-time exchange rates
let rubToUsdRate = 0.012;  // Placeholder rate RUB to USDT
let usdtToThbRate = 36.5;  // Placeholder rate USDT to THB

// Fetch rates (For demonstration, replace with real API calls)
async function fetchRates() {
    rubToUsdRate = 0.012;  // RUB-USD (USDT)
    usdtToThbRate = 36.5;  // USDT-THB
}

// Function to calculate markup based on selected range
function getMarkup(range) {
    switch (range) {
        case '1000-10000':
            return 0.05; // 5% markup
        case '10000-20000':
            return 0.04; // 4% markup
        default:
            return 0;
    }
}

// Calculate THB based on input amount and selected range
async function calculateTHB() {
    await fetchRates(); // Fetch the latest rates
    
    const currency = document.getElementById('currencySelect').value;
    const range = document.getElementById('rangeSelect').value;  // Get selected range
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

    const markup = getMarkup(range);  // Get the markup for the selected range

    if (currency === 'RUB') {
        baseRate = rubToUsdRate * usdtToThbRate; // Base rate without markup
        exchangeRate = baseRate * (1 + markup);  // Apply markup to the base rate
        thbAmount = inputAmount * exchangeRate;
        exchangeRateField.innerText = `1 RUB = ${exchangeRate.toFixed(3)} THB`;
    } else if (currency === 'USDT') {
        baseRate = usdtToThbRate;  // Base rate without markup
        exchangeRate = baseRate * (1 + markup);  // Apply markup to the base rate
        thbAmount = inputAmount * exchangeRate;
        exchangeRateField.innerText = `1 USDT = ${exchangeRate.toFixed(3)} THB`;
    }

    thbRateField.innerText = `1 THB = ${(1 / exchangeRate).toFixed(3)} ${currency}`;
    outputAmountField.value = thbAmount.toFixed(2);  // Show the result in THB
}