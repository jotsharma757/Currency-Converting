const BASE = "https://latest.currency-api.pages.dev/v1/currencies/";

// Dropdown population
const dropdowns = document.querySelectorAll(".dropdown select");
const msg = document.querySelector(".msg");
const amountInput = document.querySelector("input");
const convertBtn = document.querySelector("button");

// Populate currency dropdowns
for (let select of dropdowns) {
  for (let CurrCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = CurrCode;
    newOption.value = CurrCode;

    if (select.name === "from" && CurrCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && CurrCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Update flag based on selected currency
const updateFlag = (element) => {
  let CurrCode = element.value;
  let countryCode = countryList[CurrCode];
  let imgTag = element.parentElement.querySelector("img");
  imgTag.src = `https://flagsapi.com/${countryCode}/shiny/64.png`;
};

// Fetch and calculate exchange rate on button click
convertBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  let amount = parseFloat(amountInput.value);
  if (isNaN(amount) || amount <= 0) {
    msg.innerText = "Please enter a valid amount.";
    return;
  }

  let fromCurrency = document.querySelector("select[name='from']").value.toLowerCase();
  let toCurrency = document.querySelector("select[name='to']").value.toLowerCase();

  try {
    const url = `${BASE}${fromCurrency}.json`;
    const res = await fetch(url);
    const data = await res.json();

    const rate = data[fromCurrency][toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);

    msg.innerText = `${amount} ${fromCurrency.toUpperCase()} = ${convertedAmount} ${toCurrency.toUpperCase()}`;
  } catch (err) {
    msg.innerText = "Failed to fetch exchange rate.";
    console.error(err);
  }
});
