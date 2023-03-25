"use strict";

let buildingType_select = document.getElementById("building-type");
let buildingType =
    buildingType_select.options[buildingType_select.selectedIndex].value;
let estimateNumElv_div = document.querySelector(".estimate-num-elv");
let numApt_input = document
    .getElementById("number-of-apartments")
    .querySelector("input");
let numFloors_input = document
    .getElementById("number-of-floors")
    .querySelector("input");
let numBasements_input = document
    .getElementById("number-of-basements")
    .querySelector("input");
let numElevators_input = document
    .getElementById("number-of-elevators")
    .querySelector("input");
let maxOcc_input = document
    .getElementById("maximum-occupancy")
    .querySelector("input");
let displayCalcElv_input = document
    .getElementById("elevator-amount")
    .querySelector("input");

let productLineSelection_div = document.querySelector(".product-line");
//let productLine = document.querySelector('input[name="product-line"]:checked').id;

let radioBtns_div = document.querySelector(".radio-btns");
let warning_p = document.getElementById("warning");

let finalPricingDisplay_div = document.querySelector(".final-pricing-display");
let displayUnitPrice_input = document
    .getElementById("elevator-unit-price")
    .querySelector("input");
let displayElvTotalPrice_input = document
    .getElementById("elevator-total-price")
    .querySelector("input");
let displayInstallFee_input = document
    .getElementById("installation-fees")
    .querySelector("input");
let displayEstTotalCost_input = document
    .getElementById("final-price")
    .querySelector("input");

let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});
const buildingTypeFields = {
    residential: [
        "number-of-apartments",
        "number-of-floors",
    ],
    commercial: [
        "number-of-floors",
        "maximum-occupancy",
    ],
    industrial: [
        "number-of-elevators",
    ]
};
const unitPrices = {
    standard: 8000,
    premium: 12000,
    excelium: 15000,
};
const installPercentFees = {
    standard: 10,
    premium: 15,
    excelium: 20,
};


// // CALCULATIONS
// function calcResidentialElev(numFloors, numApts) {
//     const elevatorsRequired = Math.ceil(numApts / numFloors / 6)*Math.ceil(numFloors / 20);
//     console.log(elevatorsRequired)
//     return elevatorsRequired;
// }
// function calcCommercialElev(numFloors, maxOccupancy) {
//     const elevatorsRequired = Math.ceil((maxOccupancy * numFloors) / 200)*Math.ceil(numFloors / 10);
//     const freighElevatorsRequired = Math.ceil(numFloors / 10);
//     return freighElevatorsRequired + elevatorsRequired;
// }

// function calcInstallFee(totalPrice, installPercentFee) {
//     return (installPercentFee / 100) * totalPrice;
// }

// DISPLAY
function resetForm() {
    estimateNumElv_div.style.display = "none";
    estimateNumElv_div.querySelectorAll("div").forEach((el) => {
        el.querySelectorAll("input[type='number']").forEach((input) => {
            input.value = "";
        });
        el.querySelectorAll("div.col-4").forEach((div) => {
            div.classList.add("d-none");
        });
    });
    displayCalcElv_input.value = "";
    productLineSelection_div.style.display = "none";
    warning_p.style.display = "none";
    productLineSelection_div
        .querySelectorAll("input[type='radio']")
        .forEach((radioBtn) => {
            radioBtn.checked = false;
        });

    finalPricingDisplay_div.style.display = "none";
    finalPricingDisplay_div
        .querySelectorAll("input[type='text']")
        .forEach((input) => {
            input.setAttribute("value", "");
        });
}

function displayBuildingFields(buildingType) {
    estimateNumElv_div.style.display = "block";
    estimateNumElv_div.querySelector(".step-description").style.display =
        "block";
    estimateNumElv_div.querySelector(".card-block").style.display = "block";
    estimateNumElv_div.querySelectorAll(".row").forEach((row) => {
        row.classList.remove("d-none");
    });
    for (let fieldID of buildingTypeFields[buildingType]) {
        estimateNumElv_div
            .querySelector(`div[id='${fieldID}']`)
            .classList.remove("d-none");
    }
    productLineSelection_div.style.display = "block";
    finalPricingDisplay_div.style.display = "block";
}

//get backend function for num elevators required
const baseUrl = 'http://localhost:4000/info/'
const numFloors = numFloors_input
const numApps = numApt_input
const maxOccupancy = maxOcc_input
const numElevators = numElevators_input



function displayElvCalcResult(buildingType) {
    async function getInfo(endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'GET',
        });
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(res);
        const data = await res.json();
        displayCalcElv_input.value = data.numElv;
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    if (buildingType == 'commercial') {
      getInfo(`${baseUrl}?buildingType=commercial&numFloors=${parseInt(numFloors.value)}&maxOccupancy=${parseInt(maxOccupancy.value)}`);
    } else if (buildingType == 'residential') {
      getInfo(`${baseUrl}?buildingType=residential&numFloors=${parseInt(numFloors.value)}&numApps=${parseInt(numApps.value)}`);
    } else if (buildingType == 'industrial'){
        getInfo(`${baseUrl}?buildingType=industrial&numElevators=${parseInt(numElevators.value)}`);
  }
}

/*
function displayElvCalcResult(buildingType) {
    async function getPricing(endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'GET',
        });
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(res);
        const data = await res.json();
        displayCalcElv_input.value = data.numElv;
      } catch (error) {
        console.error('Error:', error);
      }
    }

    let productLine = document.querySelector(
                "input[name='product-line']:checked"
            ).id;

    if (productLine == 'standard') {
      getPricing(`${baseUrl}?productLine=standard&numElevators=${parseInt(displayCalcElv_input.value)}`);
    } else if (productLine == 'premium') {
      getPricing(`${baseUrl}?productLine=premium&numElevators=${parseInt(displayCalcElv_input.value)}`);
    } else if (productLine == 'excelium') {
       getPricing(`${baseUrl}?productLine=excelium&numElevators=${parseInt(displayCalcElv_input.value)}`);
  }
}
}
*/

// function displayPricing(productLine, numElv) {
//     let unitPrice = unitPrices[productLine];
//     let installPercentFee = installPercentFees[productLine];
//     let subtotal = unitPrice * numElv;
//     let totalInstallFee = calcInstallFee(subtotal, installPercentFee);
//     let totalPrice = subtotal + totalInstallFee;


//     displayUnitPrice_input.setAttribute("value", formatter.format(unitPrice));
//     displayElvTotalPrice_input.setAttribute(
//         "value",
//         formatter.format(subtotal)
//     );
//     displayInstallFee_input.setAttribute(
//         "value",
//         formatter.format(totalInstallFee)
//     );
//     displayEstTotalCost_input.setAttribute(
//         "value",
//         formatter.format(totalPrice)
//     );
// }

const priceUrl = 'http://localhost:4000/price/'
function displayPricing(productLine) {

    async function getPricing(endpoint, numElvReq) {
        try {
          const res = await fetch(`${endpoint}&numElvReq=${parseInt(displayCalcElv_input.value)}`, {
            method: 'GET',
          });
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          console.log(res);
          const data = await res.json();
          displayUnitPrice_input.value = formatter.format(data.calcTotal.unitPrice);
          displayInstallFee_input.value = formatter.format(data.calcTotal.totalInstallFee);
          displayEstTotalCost_input.value = formatter.format(data.calcTotal.totalPrice);
          displayElvTotalPrice_input.value = formatter.format(data.calcTotal.subtotal);
        } catch (error) {
          console.error('Error:', error);
        }
      }
  
      let productLineSelected = document.querySelector(
                  "input[name='product-line']:checked"
              ).id;
  
      if (productLineSelected == 'standard') {
        getPricing(`${priceUrl}?productLineSelected=standard`);
      } else if (productLineSelected == 'premium') {
        getPricing(`${priceUrl}?productLineSelected=premium`);
      } else if (productLineSelected == 'excelium') {
         getPricing(`${priceUrl}?productLineSelected=excelium`);
    }


    }

const radioButtons = radioBtns_div.querySelectorAll("input[type='radio']");
let checked = false;
for (let i = 0; i < radioButtons.length; i++) {
  if (radioButtons[i].checked) {
    checked = true;
    break;
  }
}

function updatePricingDisplay() {
    
    if (!displayCalcElv_input.value) {
      warning_p.style.display = "block";
      radioButtons.forEach(function(radioBtn) {
        radioBtn.checked = false;
      });
       
    } else {
        let numElv = parseInt(displayCalcElv_input.value);
        warning_p.style.display = "none";
        try {
            let productLine = document.querySelector(
                "input[name='product-line']:checked"
            ).id;
            displayPricing(productLine, numElv);
        } catch {
            // empty: waiting for user to select product line;
        }
    }
}

// VALIDATION
function allBuildingFieldsCompleted(buildingType) {
    for (let fieldID of buildingTypeFields[buildingType]) {
        if (
            estimateNumElv_div.querySelector(`div[id='${fieldID}'] input`)
                .value == ""
        ) {
            return false;
        }
    }
    return true;
}

// MODEL
radioBtns_div.querySelectorAll("input[type='radio']").forEach((radioBtn) => {
    radioBtn.addEventListener("click", updatePricingDisplay);
});

buildingType_select.addEventListener("change", function () {
    resetForm();
    buildingType = this.value;
    if (buildingType == "---Select---") {
        resetForm();
    } else {
        displayBuildingFields(buildingType);
        estimateNumElv_div.addEventListener("change", function () {
            if (!allBuildingFieldsCompleted(buildingType)) {
                return;
            } else {
                displayElvCalcResult(buildingType);
                updatePricingDisplay();
            }
        });
    }
});
