const pizzaPrices = {
    Foccacia:              { medium: 65,  large: 80  },
    FoccaciaCheese:        { medium: 85,  large: 95  },
    Margherita:            { medium: 80,  large: 95  },
    Regina:                { medium: 110, large: 125 },
    Hawaiian:              { medium: 110, large: 120 },
    Trabella:              { medium: 120, large: 135 },
    Vegetarian:            { medium: 110, large: 125 },
    FourSeasons:           { medium: 130, large: 140 },
    Carne:                 { medium: 120, large: 135 },
    Bellas:                { medium: 130, large: 140 },
    Chicken:               { medium: 120, large: 135 },
    Isabellas:             { medium: 120, large: 135 },
    FourCheeses:           { medium: 125, large: 140 },
    Romana:                { medium: 120, large: 135 },
    Roberto:               { medium: 120, large: 135 },
    Biltong:               { medium: 120, large: 135 },
    Brettiano:             { medium: 110, large: 125 },
    Mexicana:              { medium: 120, large: 135 },
    Giordano:              { medium: 155, large: 180 }
};

const pizzaFlavourOptions = `
    <option value="">-- Select --</option>
    <option value="Foccacia">Foccacia</option>
    <option value="FoccaciaCheese">Foccacia with Cheese</option>
    <option value="Margherita">Margherita</option>
    <option value="Regina">Regina</option>
    <option value="Hawaiian">Hawaiian</option>
    <option value="Trabella">Trabella</option>
    <option value="Vegetarian">Vegetarian</option>
    <option value="FourSeasons">Four Seasons</option>
    <option value="Carne">Carne</option>
    <option value="Bellas">Bellas</option>
    <option value="Chicken">Chicken</option>
    <option value="Isabellas">Isabellas</option>
    <option value="FourCheeses">Four Cheeses</option>
    <option value="Romana">Romana</option>
    <option value="Roberto">Roberto</option>
    <option value="Biltong">Biltong</option>
    <option value="Brettiano">Brettiano</option>
    <option value="Mexicana">Mexicana</option>
    <option value="Giordano">Giordano</option>
`;

// ─── Pizza Cart ───────────────────────────────────────────────────────────────

let pizzaItemCount = 0;

/**
 * Creates a single pizza row (size + flavour + qty + remove btn).
 * Each row gets a unique numeric id (pizzaItemCount).
 */
function createPizzaRow() {
    pizzaItemCount++;
    const id = pizzaItemCount;

    const wrapper = document.createElement("div");
    wrapper.classList.add("pizza-item-row");
    wrapper.dataset.id = id;
    wrapper.style.cssText = "border:1px solid #ccc; border-radius:8px; padding:10px; margin-bottom:10px; background:#fafafa;";

    wrapper.innerHTML = `
        <strong>Pizza #${id}</strong>
        ${id > 1 ? `<button type="button" class="remove-pizza-btn" data-id="${id}" style="float:right; cursor:pointer; color:red; background:none; border:none; font-size:16px;">✕ Remove</button>` : ""}
        <br><br>

        <label>Size:</label>
        <select class="pizza-size" data-id="${id}">
            <option value="#">-- Select --</option>
            <option value="medium">Medium (R65 - R155)</option>
            <option value="large">Large (R80 - R180)</option>
        </select>
        <br><br>

        <label>Flavour:</label>
        <select class="pizza-flavour" data-id="${id}">
            ${pizzaFlavourOptions}
        </select>
        <br><br>

        <label>Quantity:</label>
        <input type="number" class="pizza-qty" data-id="${id}" min="1" value="1" style="width:60px;">

        <span class="pizza-row-subtotal" data-id="${id}" style="margin-left:12px; font-weight:bold; color:#555;">R0</span>
    `;

    // Wire up change listeners for this row
    wrapper.querySelectorAll("select, input").forEach(el => {
        el.addEventListener("change", calculateTotal);
        el.addEventListener("input",  calculateTotal);
    });

    // Wire up remove button
    const removeBtn = wrapper.querySelector(".remove-pizza-btn");
    if (removeBtn) {
        removeBtn.addEventListener("click", function () {
            wrapper.remove();
            calculateTotal();
        });
    }

    return wrapper;
}

function addPizzaRow() {
    const list = document.getElementById("pizza-items-list");
    list.appendChild(createPizzaRow());
    calculateTotal();
}

// ─── Total Calculation ────────────────────────────────────────────────────────

function calculateTotal() {
    const orderChoice = document.getElementById("order-choice").value;
    let total = 0;

    if (orderChoice === "pizza") {
        // Loop over every pizza row currently in the DOM
        document.querySelectorAll(".pizza-item-row").forEach(row => {
            const size    = row.querySelector(".pizza-size").value;
            const flavour = row.querySelector(".pizza-flavour").value;
            const qty     = parseInt(row.querySelector(".pizza-qty").value) || 0;
            const price   = pizzaPrices[flavour]?.[size] || 0;
            const subtotal = price * qty;

            // Update per-row subtotal label
            const subtotalEl = row.querySelector(".pizza-row-subtotal");
            if (subtotalEl) subtotalEl.textContent = `R${subtotal}`;

            total += subtotal;
        });
    }

    document.getElementById("total-price").textContent = `Total: R${total}`;
}

// ─── Order Choice Listener ────────────────────────────────────────────────────

document.getElementById("order-choice").addEventListener("change", function () {
    const builderSection = document.getElementById("pizza-builder-section");
    const list           = document.getElementById("pizza-items-list");

    builderSection.hidden = true;

    if (this.value === "pizza") {
        builderSection.hidden = false;

        // Add the first pizza row if the list is empty
        if (list.children.length === 0) {
            addPizzaRow();
        }
    }

    calculateTotal();
});

// ─── Add Pizza Button ─────────────────────────────────────────────────────────

document.getElementById("add-pizza-btn").addEventListener("click", addPizzaRow);

// ─── Confirm / WhatsApp ───────────────────────────────────────────────────────

document.getElementById("confirm-order").addEventListener("click", function () {
    const name        = document.getElementById("name").value.trim();
    const surname     = document.getElementById("surname").value.trim();
    const number      = document.getElementById("number").value.trim();
    const orderChoice = document.getElementById("order-choice").value;
    const special     = document.getElementById("special").value.trim();

    // Basic validation
    if (!name || !surname || !number || orderChoice === "#") {
        alert("Please complete all required fields.");
        return;
    }

    // Build pizza lines
    let pizzaLines = "";
    let grandTotal = 0;
    let pizzaIndex = 0;

    document.querySelectorAll(".pizza-item-row").forEach(row => {
        pizzaIndex++;
        const size    = row.querySelector(".pizza-size").value;
        const flavour = row.querySelector(".pizza-flavour").value;
        const qty     = parseInt(row.querySelector(".pizza-qty").value) || 0;
        const price   = pizzaPrices[flavour]?.[size] || 0;
        const subtotal = price * qty;
        grandTotal += subtotal;

        pizzaLines += `
Pizza #${pizzaIndex}:
  Flavour:  ${flavour  || "N/A"}
  Size:     ${size     || "N/A"}
  Quantity: ${qty}
  Subtotal: R${subtotal}
`;
    });

    // Validate that at least one pizza is fully selected
    if (orderChoice === "pizza" && pizzaIndex === 0) {
        alert("Please add at least one pizza.");
        return;
    }

    const message =
`New Order:

Name:    ${name}
Surname: ${surname}
Mobile:  ${number}

--- Pizzas ---${pizzaLines}
${special ? `Special Request: ${special}\n` : ""}
TOTAL: R${grandTotal}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber  = "27679824550";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
    alert("Thank You, Come Back Soon!");
});

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", calculateTotal);