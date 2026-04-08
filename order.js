const orderChoice = document.getElementById("order-choice");

const pizzaSizeSection = document.getElementById("pizza-size-section");
const pizzaFlavourSection = document.getElementById("pizza-flavour-section");
const mealSection = document.getElementById("meal-section");

orderChoice.addEventListener("change", function () {

    const choice = this.value;

    pizzaSizeSection.hidden = true;
    pizzaFlavourSection.hidden = true;
    mealSection.hidden = true;

    if (choice === "pizza") {
        pizzaSizeSection.hidden = false;
        pizzaFlavourSection.hidden = false;
    }

    if (choice === "meal") {
        mealSection.hidden = false;
    }

    if (choice === "pizza & meal") {
        pizzaSizeSection.hidden = false;
        pizzaFlavourSection.hidden = false;
        mealSection.hidden = false;
    }
});

document.getElementById("confirm-order").addEventListener("click", function () {

    //  textarea values
    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const number = document.getElementById("number").value.trim();

    //  select value
    const orderType = document.getElementById("order-choice").value;
    const mealType = document.getElementById("meal-choice").value;
    const pizzaSize = document.getElementById("pizza-size").value;
    const pizzaFlavour = document.getElementById("pizza-flavour").value;


    // Validation
    if (!name || !surname || !number || orderType === "#") {
        alert("Please complete all fields.");
        return;
    }

    // Whatsapp message
    const message =
`New Order:
Name: ${name}
Surname: ${surname}
Mobile: ${number}
Order Type: ${orderType}
Pizza Size: ${pizzaSize || "N/A"}
Pizza Flavour: ${pizzaFlavour || "N/A"}
Meal: ${mealType || "N/A"}`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "27760915274";

    // Open WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
    alert("Thank You, Come Back Soon");
});