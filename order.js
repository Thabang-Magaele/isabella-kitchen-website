const orderChoice = document.getElementById("order-choice");
const pizzaSizeSection = document.getElementById("pizza-size-section");
const pizzaFlavourSection = document.getElementById("pizza-flavour-section");
const mealSection = document.getElementById("meal-section");
const pizzaqty = document.getElementById("pizza-qty-section");
const mealqty = document.getElementById("meal-qty-section");

const pizzaPrices = {
    Foccacia: { medium: 65, large: 80 },
    FoccaciaCheese: { medium: 85, large: 95 },
    Margherita: { medium: 80, large: 95 },
    Regina: { medium: 110, large: 125 },
    Hawaiian: { medium: 110, large: 120 },
    Trabella: { medium: 120, large: 135 },
    Vegetarian: { medium: 110, large: 125 },
    FourSeasons: { medium: 130, large: 140 },
    Carne: { medium: 120, large: 135 },
    Bellas: { medium: 130, large: 140 },
    Chicken: { medium: 120, large: 135 },
    Isabellas: { medium: 120, large: 135 },
    FourCheeses: { medium: 125, large: 140 },
    Romana: { medium: 120, large: 135 },
    Roberto: { medium: 120, large: 135 },
    Biltong: { medium: 120, large: 135 },
    Brettiano: { medium: 110, large: 125 },
    Mexicana: { medium: 120, large: 135 },
    Giordano: { medium: 155, large: 180 }
};

const mealPrices = {
    Lasagne: 170,
    MeatballsFettuccini: 150,
    HamFettucciniAlfredo: 135,
    ChickenFettucciniAlfredo: 135,
    SpaghettiBolognese: 135,
    BobotieRice: 150,
    BantingLasagne: 150,
    ChickenCurryRice: 150,                        
    MacaroniCheese: 130,
    ChickenVeggieSoup: 45
 
};    

    function calculateTotal() {
        const orderChoice = document.getElementById("order-choice").value;
        const mealType = document.getElementById("meal-choice").value;
        const pizzaSize = document.getElementById("pizza-size").value;
        const pizzaFlavour = document.getElementById("pizza-flavour").value;

        const pizzaqty = parseInt(document.getElementById("pizza-qty").value) || 0;
        const mealqty = parseInt(document.getElementById("meal-qty").value) || 0;

        let total = 0;

        // PIZZA
        if (orderChoice === "pizza" || orderChoice === "pizza-meal") {
            const pizzaCost = pizzaPrices[pizzaFlavour]?.[pizzaSize] || 0;
            total += pizzaCost * pizzaqty;
        }

        // MEAL
        if (orderChoice === "meal" || orderChoice === "pizza-meal") {
            const mealCost = mealPrices[mealType] || 0;
            total += mealCost * mealqty;
        }

        document.getElementById("total-price").textContent = `Total: R${total}`;
    }

    document.addEventListener("DOMContentLoaded", function () {
    const inputs = ["order-choice","meal-choice","pizza-size","pizza-flavour","pizza-qty","meal-qty"];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("change", calculateTotal);
            el.addEventListener("input",  calculateTotal);
        }
    });

    calculateTotal(); // run once on load
});

orderChoice.addEventListener("change", function () {

    const choice = this.value;

    pizzaSizeSection.hidden = true;
    pizzaFlavourSection.hidden = true;
    mealSection.hidden = true;
    pizzaqty.hidden = true;
    mealqty.hidden = true;

    if (choice === "pizza") {
        pizzaSizeSection.hidden = false;
        pizzaFlavourSection.hidden = false;
        pizzaqty.hidden = false;        
    }

    if (choice === "meal") {
        mealSection.hidden = false;
        mealqty.hidden = false;
    }

    if (choice === "pizza-meal") {
        pizzaSizeSection.hidden = false;
        pizzaFlavourSection.hidden = false;
        mealSection.hidden = false;
        pizzaqty.hidden = false;        
        mealqty.hidden = false;        

    }
});

document.getElementById("confirm-order").addEventListener("click", function () {
    //  textarea values
    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const number = document.getElementById("number").value.trim();

    //  select value
    const orderChoice = document.getElementById("order-choice").value;
    const mealType = document.getElementById("meal-choice").value;
    const pizzaSize = document.getElementById("pizza-size").value;
    const pizzaFlavour = document.getElementById("pizza-flavour").value;

    // Validation
    if (!name || !surname || !number || orderChoice === "#") {
        alert("Please complete all fields.");
        return;
    }

 document.querySelectorAll("select, input").forEach(element => {
    element.addEventListener("change", calculateTotal);
    element.addEventListener("input", calculateTotal);
});


let totalpizza = 0;
let totalmeal = 0;

// FIXED quantities
const pizzaqty = parseInt(document.getElementById("pizza-qty").value) || 0;
const mealqty = parseInt(document.getElementById("meal-qty").value) || 0;

// PIZZA
if (orderChoice === "pizza" || orderChoice === "pizza-meal") {
    const pizzaCost = pizzaPrices[pizzaFlavour]?.[pizzaSize]|| 0;
    totalpizza = pizzaCost * pizzaqty;
}

// MEAL
if (orderChoice === "meal" || orderChoice === "pizza-meal") {
    const mealCost = mealPrices[mealType] || 0;
    totalmeal = mealCost * mealqty;
}

console.log("Flavour:", pizzaFlavour);
console.log("Size:", pizzaSize);
console.log("Price lookup:", pizzaPrices[pizzaFlavour]?.[pizzaSize]);

    // Whatsapp message
const message =
`New Order:

Name: ${name}
Surname: ${surname}
Mobile: ${number}

Order Type: ${orderChoice}

--- Pizza ---
Flavour: ${pizzaFlavour || "N/A"}
Size: ${pizzaSize || "N/A"}
Quantity: ${pizzaqty}
Price: R${(pizzaqty * (pizzaPrices[pizzaFlavour]?.[pizzaSize])) || 0}

--- Meal ---
Meal: ${mealType || "N/A"}
Quantity: ${mealqty}
Price: R${(mealqty * (mealPrices[mealType])) || 0}

TOTAL: R${totalpizza + totalmeal}`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "27760915274";

    // Open WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
    alert("Thank You, Come Back Soon");
});