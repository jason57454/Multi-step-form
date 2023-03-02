var plansData = document.querySelector(".row_4");

// Initializing array of the second step
const plans = [
  {
    id: 0,
    title: "Arcade",
    image: "./assets/images/icon-arcade.svg",
    month: "$9/mo",
    year: "$90/yr",
    offer: "2 months free",
  },
  {
    id: 1,
    title: "Advanced",
    image: "./assets/images/icon-advanced.svg",
    month: "$12/mo",
    year: "$120/yr",
    offer: "2 months free",
  },
  {
    id: 3,
    title: "Pro",
    image: "./assets/images/icon-pro.svg",
    month: "$15/mo",
    year: "$150/yr",
    offer: "2 months free",
  },
];

// Mapping the plans array to generate html code
plansData.innerHTML = plans
  .map(
    (plan) => `
        <div class="wrapper_col_4">
          <div class="col col_4">
            <div class="icon_plan">
              <img src="${plan.image}" alt="" />
            </div>
            <label for="col_4">${plan.title} </label>
            <div class="price_month price_plan">${plan.month}</div>
            <div class="price_year price_plan">${plan.year}</div>
            <div class="yr_offer">${plan.offer}</div>
          </div>
        </div>
        `
  )
  .join("");
