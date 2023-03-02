var inputs = document.querySelectorAll(".form_input");
var email = document.getElementById("email");
var phone = document.getElementById("phone");
var required = document.querySelectorAll(".field_required");
var invalidNumber = document.querySelector(".invalid_number");
var invalindEmail = document.querySelector(".invalid_mail");
var nextBtn = document.querySelector(".next");

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

    if (input.id === "email") {
      checkEmail();
    } else if (input.id === "phone") {
      checkNumber();
    }

    // Handling nextBtn attribute
    if (allInputsHaveValue) {
      if (checkEmail() === true && checkNumber() === true) {
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
