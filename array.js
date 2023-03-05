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
            <label for="col_4" class="medium">${plan.title} </label>
            
            <div class="price_month price_plan monthly">${plan.month}</div>
            <div class="price_year price_plan yearly">${plan.year}</div>
            <div class="yr_offer yearly">${plan.offer}</div>
          </div>
        </div>
        `
  )
  .join("");

function handlePlan() {
  var monthOffer = document.querySelectorAll(".monthly");
  var yearOffer = document.querySelectorAll(".yearly");

  monthActive.classList.toggle("active_plan");
  yearActive.classList.toggle("active_plan");

  for (let i = 0; i < 9; i++) {
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

// Handling focus of step 2

var selectedRadio = null;
var radio = document.querySelectorAll(".col_4");

function toggleActive(event) {
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
  radio.addEventListener("click", toggleActive);
});
