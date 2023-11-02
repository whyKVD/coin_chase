var AUTH_TOKEN = "c75c1bab-869e-4956-8c62-6e90d1499739"

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'https://api.example.com'
});

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

function createCrypto_box(element) {
  let crypto_box = document.createElement("div");
  crypto_box.classList.add("crypto_box")
  let symbol = document.createElement("div")
  symbol.classList.add("inline")
  symbol.classList.add("symbol")
  symbol.innerHTML = element.symbol
  crypto_box.appendChild(symbol);
  let name = document.createElement("div")
  name.classList.add("inline")
  name.classList.add("name")
  name.innerHTML = element.name
  crypto_box.appendChild(name);
  let price = document.createElement("div")
  price.classList.add("inline")
  price.innerHTML = parseFloat(element.priceUsd).toFixed(3);
  crypto_box.appendChild(price);
  document.getElementById("crypto_boxes").appendChild(crypto_box);
}

instance.get("https://api.coincap.io/v2/assets")
  .then(response => {
    document.getElementById("crypto_boxes").textContent = "";
    response.data.data.forEach(element => {
      createCrypto_box(element)
    });
  })
  .catch(error => console.error(error));

setInterval(() => {
  instance.get("https://api.coincap.io/v2/assets")
    .then(response => {
      document.getElementById("crypto_boxes").textContent = "";
      response.data.data.forEach(element => {
        createCrypto_box(element)
      });
    })
    .catch(error => console.error(error));
}, 1000 / 3)
