let products = [
    {
        id: 0,
        name: "Hoddies",
        price: 14,
        stock: 3,
        urlImage: "./assets/images/featured1.png",
    },
    {
        id: 1,
        name: "Shirt",
        price: 24,
        stock: 20,
        urlImage: "./assets/images/featured2.png",
    },
    {
        id: 2,
        name: "Sweatshirts",
        price: 24,
        stock: 20,
        urlImage: "./assets/images/featured3.png",
    },
];



const contentCartShop = document.querySelector(".main__shoppingCart");
const detailsContent = document.querySelector(".details__content");
const contentCartShopItems = document.querySelector(".contentCartShop__items");
const contentCartShopTotal = document.querySelector(".contentCartShop__total");
const countProducts = document.querySelector(".cart__count");

const iconCart = document.querySelector(".bx-cart-alt");

const contentProduct = document.querySelector(".main__filter");



iconCart.addEventListener("click", ()=>{
    contentCartShop.classList.toggle("main__shoppingCart_show")
});

 
detailsContent.addEventListener("click", ()=>{
    contentCartShop.classList.remove("main__shoppingCart_show")
});

let objCartShop = {};

function addProduct(idProduct){
    const currentProducts = products.find((product) => product.id === idProduct);

    if(currentProducts.stock==objCartShop[currentProducts.id].amount)
        return alert('No hay mas productos en el stock')

    objCartShop[currentProducts.id].amount++;

};

function countProduct() {
    const arrayCartShop = Object.values(objCartShop);

    let suma = arrayCartShop.reduce((acum, curr) => {
        acum += curr.amount;
        return acum;
    }, 0);

    countProducts.textContent = suma;
    
}

function deleteProduct(idProduct){
    const op = confirm('Seguro que quieres eliminar');

    if(op) delete objCartShop[idProduct]
};
 
function printTotal(){
    const arrayCartShop = Object.values(objCartShop);
    if(!arrayCartShop.length)
        return(contentCartShopTotal.innerHTML = `<h3>Carrito vacio</h3>`)
    
    let total = arrayCartShop.reduce((acum,curr)=>{
       acum+=(curr.price * curr.amount);
        
        return acum;
    },0);

    contentCartShopTotal.innerHTML = `
    <div class='buy__total'>
        <h3> Price Total: ${total}.00</h3>
        <h3> Tax: 0.00</h3>
        <button class="btn btn__buy">Comprar</button>
    </div>
    `

}


//loading Academlo
const loadingAcademlo = () =>{
    const containerLoading = document.querySelector('.loading');
    window.addEventListener('load', ()=>{

        setTimeout(()=>{
            containerLoading.style.display = 'none';
        },3000);

    });
}



function printProducts() {
    let html = "";

       products.forEach(({ id, name, price, stock, urlImage }) => {
        const btnBuy = stock
            ? `<button class="button products__button" data-id="3" id="${id}">+</button>`
            : `<button class="btn btn__nodrop">No disponible</button>`;

        html += `

        <div class="filter filter__${name}">
            <p class="productimage"> <img src="${urlImage}" alt="${name}"> </p>

            <h2 class="products__price">$${price} <span class="products__quantity">| Stock: ${stock}</span></h2>

            <div class="food__options"> 
                ${btnBuy}
            </div>            
            
            <h3>${name}</h3>

        </div>


    `;
    });

    contentProduct.innerHTML = html;
    
}




contentProduct.addEventListener("click",(e)=>{
    
    if(e.target.classList.contains('button')){
        const idProduct = Number(e.target.id);

        const currentProducts = products.find((product) => product.id === idProduct);

        if(objCartShop[currentProducts.id]){
            addProduct(idProduct);

        }else{
            objCartShop[currentProducts.id] = { ...currentProducts};
            objCartShop[currentProducts.id].amount =1;
        }
        
        printFoodsInCart();
    };
});

function printFoodsInCart() { 
    let html = "";

    const arrayCartShop = Object.values(objCartShop);

    arrayCartShop.forEach(({ id, name, price, amount, urlImage }) => {
        html += `
        
        <div class="productin__cart">
            <div class="productin__img">
                <img src="${urlImage}" alt="${name}">
            </div>
            <div class="productcart__body">
                <h3>${name}</h3>
                <p><span>$${price}</span> - cant: <strong>${amount}</strong></p>
            </div>
            <div class="productcart__options">
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

contentCartShopItems.addEventListener("click",(e)=>{


    if(e.target.classList.contains('btn__rest')){
        const idProduct=Number(e.target.id);

        if(objCartShop[idProduct].amount==1){
           deleteProduct(idProduct);           
        } else{
            objCartShop[idProduct].amount--;
        }        
    }
    if(e.target.classList.contains('btn__add')){

        const idProduct=Number(e.target.id);

        addProduct(idProduct);     
      
    }
    if(e.target.classList.contains('btn__del')){
        const idProduct=Number(e.target.id);

        deleteProduct(idProduct);

    }

    printFoodsInCart();
});   

contentCartShopTotal.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn__buy")) {
        const op = confirm("Estas seguro de esto?");

        if (op) {
            products = products.map((product) => {
                if (objCartShop[product.id]?.id === product.id) {
                    return {
                        ...product,
                        stock: product.stock - objCartShop[product.id].amount,
                    };
                } else {
                    return product;
                }
            });

            objCartShop = {};
            printProducts();
            printFoodsInCart();
        }
    }
});



loadingAcademlo();
printProducts();
printTotal();
