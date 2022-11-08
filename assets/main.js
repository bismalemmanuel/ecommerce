let foods = [
    {
        id: 0,
        name: "Algo raro",
        price: 1200,
        stock: 5,
        urlImage: "./assets/images/algoRaro.png",
    },
    {
        id: 1,
        name: "Comida sana",
        price: 1300,
        stock: 7,
        urlImage: "./assets/images/comidaSana.png",
    },
    {
        id: 2,
        name: "Ensalada",
        price: 1400,
        stock: 8,
        urlImage: "./assets/images/ensalada.png",
    },
    {
        id: 3,
        name: "Hamburguesa",
        price: 1400,
        stock: 8,
        urlImage: "./assets/images/hambur.png",
    },
    {
        id: 4,
        name: "Perrito",
        price: 1500,
        stock: 5,
        urlImage: "./assets/images/perrito.png",
    },
    {
        id: 5,
        name: "Pez",
        price: 2000,
        stock: 3,
        urlImage: "./assets/images/pez.png",
    },
    {
        id: 6,
        name: "Pizza",
        price: 3000,
        stock: 11,
        urlImage: "./assets/images/pizza.png",
    },
    {
        id: 7,
        name: "Pez",
        price: 1700,
        stock: 5,
        urlImage: "./assets/images/pez.png",
    },
    {
        id: 8,
        name: "Pizza",
        price: 1900,
        stock: 11,
        urlImage: "./assets/images/pizza.png",
    },
];

const contentFoods = document.querySelector(".contentFoods");
const iconCart = document.querySelector(".bx-cart-alt");
const contentCartShop = document.querySelector(".contentCartShop");
const contentCartShopItems = document.querySelector(".contentCartShop__items");
const contentCartShopTotal = document.querySelector(".contentCartShop__total");
const countFood = document.querySelector(".countFood");

let objCartShop = {};

function addFood(idFood) {
    const currentFood = foods.find((food) => food.id === idFood);

    if (currentFood.stock === objCartShop[idFood].amount)
        return alert("No hay mas productos en el stock");

    objCartShop[currentFood.id].amount++;
}

function deletefood(idFood) {
    const op = confirm("Seguro que quieres eliminar?");

    if (op) {
        delete objCartShop[idFood];
    }
}

function countProduct() {
    const arrayCartShop = Object.values(objCartShop);

    let suma = arrayCartShop.reduce((acum, curr) => {
        acum += curr.amount;
        return acum;
    }, 0);

    countFood.textContent = suma;
}

function printTotal() {
    const arrayCartShop = Object.values(objCartShop);

    if (!arrayCartShop.length)
        return (contentCartShopTotal.innerHTML = `<h3>Carrito vacio</h3>`);

    let total = arrayCartShop.reduce((acum, curr) => {
        acum += curr.price * curr.amount;
        return acum;
    }, 0);

    contentCartShopTotal.innerHTML = `
        <h3>${total}</h3>
        <button class="btn btn__buy">Comprar</button>
    `;
}

function printFoods() {
    let html = "";

    foods.forEach(({ id, name, price, stock, urlImage }) => {
        const btnBuy = stock
            ? `<button class="btn btn__add" id="${id}">Agregar</button>`
            : `<button class="btn btn__nodrop">No disponible</button>`;

        html += `
        <div class="food">
            <div class="food__img">
                <img src="${urlImage}" alt="${name}">
            </div>
            <div class="food__body">
                <h3>${name}</h3>
                <p><span>$${price}</span> - stock: ${stock}</p>
            </div>
            <div class="food__options">
                ${btnBuy}
            </div>
        </div>
    `;
    });

    contentFoods.innerHTML = html;
}

function printFoodsInCart() {
    let html = "";

    const arrayCartShop = Object.values(objCartShop);

    arrayCartShop.forEach(({ id, name, price, amount, urlImage }) => {
        html += `
        <div class="food">
            <div class="food__img">
                <img src="${urlImage}" alt="${name}">
            </div>
            <div class="food__body">
                <h3>${name}</h3>
                <p><span>$${price}</span> - cant: <strong>${amount}</strong></p>
            </div>
            <div class="food__options">
                <button class="btn btn__rest" id="${id}">-</button>
                <button class="btn btn__add" id="${id}">+</button>
                <button class="btn btn__del" id="${id}">del</button>
            </div>
        </div>
        `;
    });

    contentCartShopItems.innerHTML = html;

    printTotal();
    countProduct();
}

contentFoods.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn__add")) {
        const idFood = Number(e.target.id);

        const currentFood = foods.find((food) => food.id === idFood);

        if (objCartShop[currentFood.id]) {
            addFood(idFood);
        } else {
            objCartShop[currentFood.id] = { ...currentFood };
            objCartShop[currentFood.id].amount = 1;
        }

        printFoodsInCart();
    }
});

contentCartShopItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn__add")) {
        const idFood = Number(e.target.id);
        addFood(idFood);
    }

    if (e.target.classList.contains("btn__rest")) {
        const idFood = Number(e.target.id);

        if (objCartShop[idFood].amount === 1) {
            deletefood(idFood);
        } else {
            objCartShop[idFood].amount--;
        }
    }

    if (e.target.classList.contains("btn__del")) {
        const idFood = Number(e.target.id);

        deletefood(idFood);
    }

    printFoodsInCart();
});

iconCart.addEventListener("click", () => {
    contentCartShop.classList.toggle("contentCartShop__show");
});

contentCartShopTotal.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn__buy")) {
        const op = confirm("Estas seguro de esto?");

        if (op) {
            foods = foods.map((food) => {
                if (objCartShop[food.id]?.id === food.id) {
                    return {
                        ...food,
                        stock: food.stock - objCartShop[food.id].amount,
                    };
                } else {
                    return food;
                }
            });

            objCartShop = {};
            printFoods();
            printFoodsInCart();
        }
    }
});

printFoods();
printTotal();
