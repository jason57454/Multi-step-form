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
    const allInputsHaveValue = Array.from(input).every(
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

  // Handling step 2 btn behavior
  if (i > 0 && selectedRadio === null) {
    nextBtn.setAttribute("disabled", true);
  }

  if (i >= 2) {
    getData();
  }
}

console.log(i);

nextBtn.addEventListener("click", currentStep);
prevBtn.addEventListener("click", currentStep);

// Handling add-ons selection

function toggleActive(event) {
  event.currentTarget.classList.toggle("addons_active");
}

addons.forEach(function (addon) {
  addon.addEventListener("click", toggleActive);
});

// Handling last step data

let radioContent = [];
let addonsValues = [];

function getData() {
  const selectedPlan = document.querySelector(".selected_plan");

  // Getting the title and price of the step 2 plan
  const selectedPlanContent = ` ${
    selectedPlan.querySelector("label").textContent
  } - ${selectedPlan.querySelector(".price_plan").textContent}`;

  var activeAddons = document.querySelectorAll(".addons_active");

  radioContent.push(selectedPlanContent);

  activeAddons.forEach((addons) => {
    let addonData = {
      name: addons.querySelector(".addon_name").innerHTML,
      price: addons.querySelector(".addons_price").innerHTML,
    };
    addonsValues.push(addonData);
  });
  console.log(radioContent, addonsValues);
}
