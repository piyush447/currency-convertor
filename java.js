console.log("java.js working");

const populate = async (currency, value) => {
  let myStr = "";
  const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_iexhfWeuRiq7XOFlIYugNTCwoIWKkZ3GM5gb7DUq&base_currency=${currency}`;
  
  try {
    let response = await fetch(url);
   
    let rJson = await response.json();
    console.log(rJson);
    document.querySelector(".vijay").style.display = "flex";

    if (rJson["data"]) {
      for (let key of Object.keys(rJson["data"])) {
        
        myStr += `<tr>
                   <td>${key}</td>
                   <td>${rJson["data"][key]["code"]}</td>
                   <td>${Math.round(rJson["data"][key]["value"] * value)}</td>
                </tr>`;
      }

      const tableBody = document.querySelector("tbody");
      tableBody.innerHTML = myStr;
    } else {
      console.error("API response does not contain 'data' field");
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

const btn = document.querySelector(".btn");
if (btn) {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const quantityInput = document.getElementById("quantity");
    const currencyInput = document.getElementById("currencyValue");
    
    if (!quantityInput || !currencyInput) {
      console.error("Input elements not found");
      return;
    }
    
    const value = parseInt(quantityInput.value);
    const currency = currencyInput.value // Ensure currency is in uppercase
    // console.log(value, currency);
    
    if (isNaN(value)) {
      console.error("Quantity is not a valid number:", value);
      return;
    }
    
    populate(currency, value);
  });
} else {
  console.error("Button element not found");
}

console.log("Button was Clicked");
