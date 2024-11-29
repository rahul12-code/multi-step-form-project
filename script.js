
const step1 = document.querySelector('.step-1');
const step2 = document.querySelector('.step-2');
const step3 = document.querySelector('.step-3');
const step4 = document.querySelector('.step-4');
const step5 = document.querySelector('.step-5');

// STEP 1

let nxt_btn = document.querySelector('.next-step');
let back_btn = document.querySelector('.go-back');
let sec_heading = document.querySelector('.section-heading');
let sec_info = document.querySelector('.section-info');
let sec_heading_div=document.querySelector('.section-heading-div');

// STEP 2

const plansContainer = document.querySelector('.plan-container');
const cards = document.querySelectorAll('.card');
const prices = document.querySelectorAll('.price');
const offerContent = document.querySelectorAll('.offer');

const planChangingMY = {
    'Arcade(Monthly)': 'Arcade(Yearly)',
    'Advanced(Monthly)': 'Advanced(Yearly)',
    'Pro(Monthly)': 'Pro(Yearly)'
}

const planChangingYM = {
    'Arcade(Yearly)': 'Arcade(Monthly)',
    'Advanced(Yearly)': 'Advanced(Monthly)',
    'Pro(Yearly)': 'Pro(Monthly)'
}

const planChangingPricesMY = {'$9/mo':'$90/yr','$12/mo':'$120/yr','$15/mo':'$150/yr'};
const planChangingPricesYM = {'$90/yr': '$9/mo', '$120/yr': '$12/mo', '$150/yr': '$15/mo'}

const toggleSwitch = document.getElementById('toggleSwitch');
const month = document.getElementById('month');
const year = document.getElementById('year');

const planSelected = ['Arcade(Monthly)','$9/mo']
let word='(Monthly)';

//STEP 3

const addonPrices = document.querySelectorAll('.addonsPrice');
const allAddOns = document.querySelectorAll(".add-ons");

//STEP 4

const planNameElement = document.querySelector(".plan-name");
const planPriceElement = document.querySelector(".selected-plan-price");
const changePlanButton = document.querySelector(".change-plan-button");

const addOnContainer = document.querySelector(".add-ons-container"); // Proper container for add-ons
// const addOnTemplate = document.querySelector(".selected-add-on.template");
const addOnTemplate = document.querySelector(".selected-add-on");
console.log(addOnTemplate);

const selectedPlan = document.querySelector(".selected-plan");

const totalName = document.querySelector('.total-name');
const totalPrice = document.querySelector('.total-price');


const sectionHeadingsArray = [
    "Personal info",
    "Select your plan",
    "Pick add-ons",
    "Finishing up",
];

const sectionHeadingsInfoArray = [
    "Please provide your name, email address, and phone number.",
    "You have the option of monthly or yearly billing.",
    "Add-ons help enhance your gaming experience.",
    "Double-check everything looks OK before confirming.",
];

let count = 1;

// SIDEBAR,HEADINGS,NEXT BTN,BACK BTN 

function updateStep(count) {

    // Update previous circles
    for (let i = 1; i < count; i++) {
        let previousCircle = document.querySelector(`#circle${i}`);
        previousCircle.style.backgroundColor = "transparent";
        previousCircle.style.color = 'white';
        previousCircle.style.border = '1px solid hsl(0, 0%, 100%)';
    }

    // Update the current circle
    let currentCircle = document.querySelector(`#circle${count}`);
    currentCircle.style.backgroundColor = 'hsl(206, 94%, 87%)';
    currentCircle.style.color = 'hsl(213, 96%, 18%)';
    currentCircle.style.border = 'none';

    // Update the next circles
    for (let i = count + 1; i <= 4; i++) {
        let nextCircle = document.querySelector(`#circle${i}`);
        nextCircle.style.backgroundColor = "transparent";
        nextCircle.style.color = 'white';
        nextCircle.style.border = '1px solid hsl(0, 0%, 100%)';
    }

    sec_heading.innerText = sectionHeadingsArray[count - 1];
    sec_info.innerText = sectionHeadingsInfoArray[count - 1];

    back_btn.style.visibility = (count > 1 && count < 5) ? 'visible' : 'hidden';

    if (count===4){
        nxt_btn.innerText = 'Confirm';
        nxt_btn.style.backgroundColor='hsl(243, 100%, 62%)';
    }else{
        nxt_btn.innerText= 'Next Step';
        nxt_btn.style.backgroundColor='hsl(213, 96%, 18%)'
    }
}

// VALIDATING FORM

function validateInputs() {
    let isValid = true;

    // Get all the input fields and error labels
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const numberInput = document.querySelector('#number');

    const nameError = document.querySelector('.name-error');
    const emailError = document.querySelector('.email-error');
    const numberError = document.querySelector('.number-error');

    // Validate Name
    if (nameInput.value.trim() === '') {
        nameError.style.visibility = 'visible';
        nameInput.classList.add('border-red-500'); // Add red border
        nameInput.classList.remove('focus:border-blue-500'); // Remove blue border
        isValid = false; 
    } else {
        nameError.style.visibility = 'hidden';
        nameInput.classList.remove('border-red-500'); // Remove red border
        nameInput.classList.add('focus:border-blue-500'); // Restore blue border
    }

    // Validate Email
    if (emailInput.value.trim() === '') {
        emailError.style.visibility = 'visible';
        emailInput.classList.add('border-red-500'); 
        emailInput.classList.remove('focus:border-blue-500');
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailInput.value.trim())) {
        emailError.style.visibility = 'visible';
        emailInput.classList.add('border-red-500'); 
        emailInput.classList.remove('focus:border-blue-500');
        isValid = false;
    } else {
        emailError.style.visibility = 'hidden';
        emailInput.classList.remove('border-red-500'); 
        emailInput.classList.add('focus:border-blue-500'); 
    }

    // Validate Phone Number
    if (numberInput.value.trim() === '') {
        numberError.style.visibility = 'visible';
        numberInput.classList.add('border-red-500'); 
        numberInput.classList.remove('focus:border-blue-500'); 
        isValid = false;
    } else if (!/^\+?[0-9]{10,15}$/.test(numberInput.value.trim())) {
        numberError.style.visibility = 'visible';
        numberInput.classList.add('border-red-500'); 
        numberInput.classList.remove('focus:border-blue-500'); 
        isValid = false;
    } else {
        numberError.style.visibility = 'hidden';
        numberInput.classList.remove('border-red-500'); 
        numberInput.classList.add('focus:border-blue-500'); 
    }

    return isValid;
}

// TOGGLE SWITCH - UNCHECK ALL IN STEP3, MONTH-YEAR COLOR CHANGES,
// CHANGE IN CARDS, CHANGE IN VALUES IN STEP3

toggleSwitch.addEventListener('change', () => {

    //Uncheck all the checkboxes - change in toggleSwitch
    const allAddOnCheckboxes = document.querySelectorAll(".add-ons input[type='checkbox']");
    allAddOnCheckboxes.forEach((checkbox) => {
        checkbox.checked = false; 
        checkbox.parentElement.parentElement.style.borderColor='black';
        checkbox.parentElement.parentElement.style.backgroundColor='transparent';
    });

    // Determine if it's yearly or monthly
    const isYearly = toggleSwitch.checked;
    const planChanges = isYearly ? planChangingMY : planChangingYM;
    const priceChanges = isYearly ? planChangingPricesMY : planChangingPricesYM;
    const priceSuffix = isYearly ? '/yr' : '/mo';
    const totalLabel = isYearly ? 'Total (per year)' : 'Total (per month)';

    // Update planSelected based on toggle
    planSelected[0] = planChanges[planSelected[0]];
    planSelected[1] = priceChanges[planSelected[1]];
    console.log(planSelected);

    // Update offer content visibility
    offerContent.forEach((each) => {
        each.style.display = isYearly ? 'block' : 'none';
    });

    // Update prices and addon prices
    prices.forEach((each) => {
        each.innerText = `$${each.dataset[isYearly ? 'year_price' : 'month_price']}${priceSuffix}`;
    });

    addonPrices.forEach((each) => {
        each.innerText = `+$${each.dataset[isYearly ? 'year_price' : 'month_price']}${priceSuffix}`;
    });

    // Update the year/month text colors
    year.style.color = isYearly ? 'hsl(213, 96%, 18%)' : 'hsl(234, 14%, 74%)';
    month.style.color = isYearly ? 'hsl(234, 14%, 74%)' : 'hsl(213, 96%, 18%)';

    // Update total label
    totalName.innerText = totalLabel;

});

// SELECTING PLAN, STORING IT IN AN ARRAY

plansContainer.addEventListener('click', (eve) => {
    const targetCard = eve.target.closest('.card');

    // NodeList to an Array
    const cardArray = Array.from(cards);

    console.log(targetCard);
    console.dir(targetCard);

    // Reset all cards' styles
    cardArray.forEach((card) => {
        card.style.border = '1px solid hsl(229,24%,87%)';
        card.style.backgroundColor = 'transparent';
    });

    // Highlight the selected card
    targetCard.style.border = '1px solid indigo';
    targetCard.style.backgroundColor = 'hsl(206,94%,96%)';

    const word = toggleSwitch.checked ? '(Yearly)' : '(Monthly)';
    const priceType = toggleSwitch.checked ? 'year_price' : 'month_price';

    // Finding the index of the selected card
    const selectedCardIndex = cardArray.indexOf(targetCard);

    // Checking if a valid card was clicked
    if (selectedCardIndex !== -1) {
        const selectedCard = cardArray[selectedCardIndex];
        const selectedPrice = prices[selectedCardIndex].dataset[priceType];

        // Update the planSelected array
        planSelected[0] = `${selectedCard.dataset.name}${word}`;
        planSelected[1] = `$${selectedPrice}/${toggleSwitch.checked ? 'yr' : 'mo'}`;

        console.log(planSelected);
    }
});

//SELECTING ADD-ONS, STORING IN AN OBJECT

const selectedServices = {};

// Adding event listeners to all add-ons
allAddOns.forEach((addOn) => {
    const checkbox = addOn.querySelector("input[type='checkbox']");
    const addOnName = addOn.querySelector(".checkbox-content h3").innerText; 
    const addOnPrice = addOn.querySelector(".addonsPrice");

    checkbox.addEventListener("change", function () {
        
        const priceType = toggleSwitch.checked ? 'year_price' : 'month_price';
        const priceSuffix = toggleSwitch.checked ? '/yr' : '/mo';
        const priceValue = `+$${addOnPrice.dataset[priceType]}${priceSuffix}`;

        if (this.checked) {
            // Add checked add-on to the object
            selectedServices[addOnName] = priceValue;

            // Apply selected styling
            addOn.style.borderColor = "indigo";
            addOn.style.backgroundColor = "hsl(206,94%,96%)";
        } else {
            // Remove unchecked add-on from the object
            delete selectedServices[addOnName];

            // Reset unselected styling
            addOn.style.borderColor = "hsl(229,24%,87%)";
            addOn.style.backgroundColor = "transparent";
        }
        console.log("Selected Services:", selectedServices);
    });
});

// UPDATE PLAN DETAILS IN STEP 4

function updatePlanDetails(planSelected) {
    const [planName, planPrice] = planSelected; 
    planNameElement.innerText = planName;   
    planPriceElement.innerText = planPrice;
}

// CHANGE BUTTON, PAGE MOVES TO 2ND PAGE

let currentPage = 4;
function goToPage(pageNumber) {
  count=pageNumber
  updateStep(count);
  document.querySelectorAll(".step-box").forEach((page, index) => {
    if (index === pageNumber - 1) {
      page.style.display = "block"; // Show the target page
    } else {
      page.style.display = "none"; // Hide all other pages
    }
  });
}

// Attaching event listener to the button
changePlanButton.addEventListener("click", () => {
  goToPage(2); 
});


// ADDING ADD-ONS TO STEP 4

function renderAddOns(selectedServices) {
    // Clear existing add-ons (if any)
    addOnContainer.innerHTML = "";
    if (Object.keys(selectedServices).length === 0) {
        selectedPlan.style.border = "none";
        return; 
    } else {
        selectedPlan.style.borderBottom= "1px solid hsl(229, 24%, 87%)"; // Adjust the border style as needed
    }
    // Loop through selectedServices and clone the template
    for (const [serviceName, servicePrice] of Object.entries(selectedServices)) {
      const addOnClone = addOnTemplate.cloneNode(true);
      console.log(addOnClone); 
      addOnClone.style.display = "flex"; // Make it visible
  
      // Update the cloned element's content
      addOnClone.querySelector(".add-on-name").textContent = serviceName;
      addOnClone.querySelector(".add-on-price").textContent = servicePrice;
  
      // Append the cloned element to the container
      addOnContainer.appendChild(addOnClone);
    }
}


// CALCULATE THE TOTAL PRICE

function calculateTotal(planSelected, selectedServices) {
    let total = 0;

    // function to extract numeric value from a price string
    const extractPrice = (price) => Number(price.replace(/[^\d.-]/g, ""));

    // Add plan price to total
    if (planSelected.length > 1) {
        total += extractPrice(planSelected[1]);
    }

    // Add selected services prices to total
    Object.values(selectedServices).forEach((servicePrice) => {
        total += extractPrice(servicePrice);
    });
    const suffix = toggleSwitch.checked ? '/yr' : '/mo';
    totalPrice.innerText = `$${total}${suffix}`;
    return total;
}

// THANKYOU PAGE

function thankyouPage(){
    nxt_btn.style.display='none';
    back_btn.style.display='none';
    sec_heading_div.style.display='none';
}

// FOR HIDING PAGES

function hidingPages(count) {
    // Reset all steps first
    [step1, step2, step3, step4, step5].forEach((step, index) => {
        if (index + 1 === count) {
            step.style.display= 'flex';
        } else {
            step.style.display='none'
        }
    });
}
// Run this intially to set all
hidingPages(count);

// NEXT BUTTON

nxt_btn.onclick = () => {

    if (count === 1) {
        // Validate inputs when count is 1
        if (!validateInputs()) {
            console.error("Inputs are not valid.");
            return; // Exit early if inputs are invalid
        }
    }

    if (count < 5) {
        count += 1;

        if (count === 5) {
            hidingPages(count);
            thankyouPage();
        } else {
            hidingPages(count);
            updateStep(count);
            updatePlanDetails(planSelected);
            renderAddOns(selectedServices);
            calculateTotal(planSelected, selectedServices);
        }
    }
};

// BACK BUTTON

back_btn.onclick = () => {
    if (count > 1) {
        count -= 1;
        hidingPages(count); 
        updateStep(count);
    }
};
