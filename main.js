inputs = document.querySelectorAll(".form_input");
var inputName = document.getElementById("name");
var email = document.getElementById("email");
var phone = document.getElementById("phone");
var required = document.querySelectorAll(".field_required");
var invalidNumber = document.querySelector(".invalid_number");
var invalindEmail = document.querySelector(".invalid_mail");
var nextBtn = document.querySelector(".next");
var prevBtn = document.querySelector(".prev");
var step = document.querySelectorAll(".step");
var pagination = document.querySelectorAll(".number");
var submit = document.querySelector(".submit");
var btnStyle = document.querySelector(".space-between");
var addons = document.querySelectorAll(".wrapper_row_6");
var i = 0;
var changePlan = document.querySelector(".change_plan");
var selectedRadio = null;
var plansData = document.querySelector(".row_4");
var switchBtn = document.querySelector(".switch_btn");
var monthActive = document.querySelector(".switch_month");
var yearActive = document.querySelector(".switch_year");
var toggle = document.querySelector(".toggle");

// Initializing array of the second step
const plans = [
  {
    title: "Arcade",
    image: "./assets/images/icon-arcade.svg",
    month: "$9/mo",
    year: "$90/yr",
    offer: "2 months free",
  },
  {
    title: "Advanced",
    image: "./assets/images/icon-advanced.svg",
    month: "$12/mo",
    year: "$120/yr",
    offer: "2 months free",
  },
  {
    title: "Pro",
    image: "./assets/images/icon-pro.svg",
    month: "$15/mo",
    year: "$150/yr",
    offer: "2 months free",
  },
];

// Mapping the plans to generate html code
plansData.innerHTML = plans
  .map(
    (plan) => `
    <div class="wrapper_col_4">
    <div class="col col_4">
      <div class="icon_plan">
        <img src="${plan.image}" alt="" />
      </div>
      <div class="col col_12">
        <label for="col_4" class="medium">${plan.title} </label>
        <div class="price_month price_plan monthly">${plan.month}</div>
        <div class="price_year price_plan yearly">${plan.year}</div>
      <div class="yr_offer yearly">${plan.offer}</div>
      </div>
    </div>
  </div>
        `
  )
  .join("");

try {
  window.onload = function () {
    setTimeout(function () {
      document.querySelector(
        ".toggle:checked + .slider .slider_circle"
      ).style.transform = "translateX(8px)";
    }, 1000);
  };
} catch (error) {
  console.error(error);
}

// Make sure that the name is a string with letters
checkName = () => {
  var nameFormat = /^[A-Za-z\s]+$/;
  if (inputName.value.match(nameFormat)) return true;
};

// Check that email is correct
checkEmail = () => {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value.match(mailformat)) {
    invalindEmail.style.display = "none";
    return true;
  } else if (email.value === "") {
    invalindEmail.style.display = "none";
  } else {
    invalindEmail.style.display = "block";
  }
};

// Check that phone number is correct
checkNumber = () => {
  var numberFormat =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  if (phone.value.match(numberFormat)) {
    invalidNumber.style.display = "none";
    return true;
  } else if (phone.value === "") {
    invalidNumber.style.display = "none";
  } else {
    invalidNumber.style.display = "block";
  }
};

//Handling eventListeners on inputs

inputs.forEach((input, i) => {
  const alert = required[i]; // Indexing the "required" array to the "inputs" array

  // Check that all inputs have value to enable next step btn
  input.addEventListener("input", () => {
    const allInputsHaveValue = Array.from(inputs).every(
      (input) => input.value !== ""
    );

    if (input.value !== "") {
      alert.style.display = "none";
    }

    if (input.id === "name") {
      checkName();
    } else if (input.id === "phone") {
      checkNumber();
    } else if (input.id === "email") {
      checkEmail();
    }

    // Handling nextBtn attribute of first step
    if (allInputsHaveValue) {
      if (
        checkEmail() === true &&
        checkNumber() === true &&
        checkName() === true
      ) {
        nextBtn.removeAttribute("disabled");
      } else {
        nextBtn.setAttribute("disabled", true);
      }
    }
  });

  // Let user know that a field left blank is required
  input.addEventListener("blur", () => {
    if (input.value === "") {
      input.style.borderColor = "hsl(354, 84%, 57%)";
      alert.style.display = "block";
    } else {
      input.style.borderColor = "hsl(229, 24%, 87%)";
      alert.style.display = "none";
    }
  });
});

// Handling focus of step 2

let radio = document.querySelectorAll(".col_4");

function toggleRadio(event) {
  var targetRadio = event.currentTarget;

  if (selectedRadio !== null) {
    selectedRadio.classList.remove("selected_plan");
  }

  if (selectedRadio !== targetRadio) {
    targetRadio.classList.add("selected_plan");
    selectedRadio = targetRadio;
  } else {
    selectedRadio = null;
  }

  if (selectedRadio === null) {
    nextBtn.setAttribute("disabled", true);
  } else {
    nextBtn.removeAttribute("disabled");
  }
}

radio.forEach(function (radio) {
  radio.addEventListener("click", toggleRadio);
});

function handlePlan() {
  var monthOffer = document.querySelectorAll(".monthly");
  var yearOffer = document.querySelectorAll(".yearly");

  monthActive.classList.toggle("active_plan");
  yearActive.classList.toggle("active_plan");

  for (let i = 0; i < 11; i++) {
    if (monthActive.classList.contains("active_plan")) {
      if (monthOffer[i]) {
        monthOffer[i].style.display = "block";
      }
      if (yearOffer[i]) {
        yearOffer[i].style.display = "none";
      }
    } else {
      if (monthOffer[i]) {
        monthOffer[i].style.display = "none";
      }
      if (yearOffer[i]) {
        yearOffer[i].style.display = "block";
      }
    }
  }
}

toggle.addEventListener("click", handlePlan);

// Handling add-ons selection

function toggleAddons(event) {
  event.currentTarget.classList.toggle("addons_active");
}

addons.forEach(function (addon) {
  addon.addEventListener("click", toggleAddons);
});

// Handling last step data
let radioContent = [];
let addonsValues = [];

function extractNumbersFromString(str) {
  const regex = /\d+/g;
  const matches = str.match(regex);
  return matches ? parseInt(matches.join("")) : NaN;
}

function getData() {
  const selectedPlan = document.querySelector(".selected_plan");
  let activeAddons = Array.from(document.querySelectorAll(".addons_active"));
  var finalPlan = document.querySelector(".final_plan");
  var planPrice = document.querySelector(".plan_price");
  var showAddons = document.querySelectorAll(".row_9");
  var finalAddons = document.querySelectorAll(".row_9 .final_addons");
  var addonPrice = document.querySelectorAll(".row_9 .final_addons_price");
  var finalPrice = document.querySelector(".total_price");

  radioContent.splice(0, radioContent.length);
  addonsValues.splice(0, addonsValues.length);

  // Getting the title and price based on user selection
  let selectedPlanContent = {
    title: selectedPlan.querySelector("label").textContent,
    price: monthActive.classList.contains("active_plan")
      ? selectedPlan.querySelector(".price_month").textContent
      : selectedPlan.querySelector(".price_year").textContent,
  };
  radioContent.push(selectedPlanContent);

  activeAddons.forEach((addons, i) => {
    let addonData = {
      name: addons.querySelector(".addon_name").innerHTML,
      price: monthActive.classList.contains("active_plan")
        ? addons.querySelector(".addons_month").innerHTML
        : addons.querySelector(".addons_year").innerHTML,
    };
    addonsValues.push(addonData);
  });

  finalPlan.innerHTML = radioContent[0].title;
  planPrice.innerHTML = radioContent[0].price;

  finalAddons.forEach((addon, i) => {
    if (addonsValues[i]) {
      showAddons[i].style.display = "flex";
      addon.innerHTML = addonsValues[i].name;
      addonPrice[i].innerHTML = addonsValues[i].price;
    } else {
      showAddons[i].style.display = "none";
      addon.innerHTML = "";
      addonPrice[i].innerHTML = "";
    }
  });

  // Extracting numbers from string to calculate the final price

  let subscriptionPrice = extractNumbersFromString(radioContent[0].price);
  let addonsPrice = addonsValues.reduce((acc, cur) => {
    let numbers = extractNumbersFromString(cur.price);
    if (!isNaN(numbers)) {
      return acc + numbers;
    } else {
      return acc;
    }
  }, 0);
  let totalPrice = subscriptionPrice + addonsPrice;
  finalPrice.innerHTML = "$" + totalPrice;
}

// Handling btn to change the selected plan

function returnPlan() {
  let changeStep = document.querySelector(".step_2");
  let removeStep = document.querySelector(".step_4");

  changePlan.addEventListener("click", () => {
    i = 1;
    changeStep.classList.add("active_step");
    removeStep.classList.remove("active_step");
    document.querySelector(".submit").style.removeProperty("display");
    nextBtn.style.display = "block";
  });
}

// Handling next and prev btn

function currentStep(event) {
  event.preventDefault();
  const number = Array.from(pagination);
  const currentElement = step[i];
  const next = step[i].nextElementSibling;
  const prev = step[i].previousElementSibling;
  const currentNumber = number[i];
  const nextNumber = number[i + 1];
  const prevNumber = number[i - 1];

  if (event.target === nextBtn && next) {
    next.classList.add("active_step");
    nextNumber.classList.add("active_number");
    currentElement.classList.remove("active_step");
    currentNumber.classList.remove("active_number");
    i++;
  }

  if (event.target === prevBtn && prev) {
    prev.classList.add("active_step");
    prevNumber.classList.add("active_number");
    currentElement.classList.remove("active_step");
    currentNumber.classList.remove("active_number");
    i--;
  }

  // Handling first step buttons styling
  if (i > 0) {
    prevBtn.style.display = "block";
    btnStyle.style.justifyContent = "space-between";
    prevBtn.removeAttribute("disabled");
  } else {
    prevBtn.style.display = "none";
    btnStyle.style.justifyContent = "flex-end";
    prevBtn.setAttribute("disabled", true);
  }

  // Handling last step buttons styling
  if (i >= 3) {
    nextBtn.style.display = "none";
    submit.style.display = "block";
    nextBtn.setAttribute("disabled", true); //Disabling the button after it is no longer available
  } else {
    nextBtn.style.display = "block";
    submit.style.display = "none";
    nextBtn.removeAttribute("disabled");
  }

  if (i > 0 && selectedRadio === null) {
    nextBtn.setAttribute("disabled", true);
  }

  if (i > 2) {
    getData();
  }

  returnPlan();
}

nextBtn.addEventListener("click", currentStep);
prevBtn.addEventListener("click", currentStep);

submit.addEventListener("click", (event) => {
  event.preventDefault();
  let confirmation = document.querySelector(".thanks");
  let form = document.querySelector(".form");

  confirmation.style.display = "block";
  form.style.display = "none";
});
