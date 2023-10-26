const currencyEl1 = document.getElementById('currency-one');
const currencyEl2 = document.getElementById('currency-two');
const amountEl1 = document.getElementById('amount-one');
const amountEl2 = document.getElementById('amount-two');

const swapBtn = document.getElementById('swap');
const rateEl = document.getElementById('rate');

// Fetch exchange rates and udpate the DOM
function calculate() {
  const currency1 = currencyEl1.value;
  const currency2 = currencyEl2.value;

  fetch(`https://v6.exchangerate-api.com/v6/aa37964634c5e6986a0b09af/latest/${currency1}
  `)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[currency2];
      rateEl.textContent = `1 ${currency1} = ${rate} ${currency2}`;

      amountEl2.value = (amountEl1.value * rate).toFixed(2);
    });
}

function swapCurrencyHandler() {
  const temp = currencyEl2.value;
  currencyEl2.value = currencyEl1.value;
  currencyEl1.value = temp;
  calculate();
}

// Event listeners
swapBtn.addEventListener('click', swapCurrencyHandler);
amountEl1.addEventListener('input', calculate);
amountEl2.addEventListener('input', calculate);
currencyEl1.addEventListener('change', calculate);
currencyEl2.addEventListener('change', calculate);
