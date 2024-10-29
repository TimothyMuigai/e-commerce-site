function fetchApi(){
    const url = 'http://localhost:3000/customers';

    return fetch(url)
        .then(response => {
            if(!response.ok){
                throw new Error ('Could not fetch Data')
            }
            return response.json();            
        })
        .then(items => displayCard(items))
        .catch(error =>{
             console.error('Error' + error);
        });
}
fetchApi();

function displayCard(items){
    const cardContainer = document.querySelector('.ft-cards');

    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('card');
        itemCard.innerHTML = `
            <img src="../${item.product_img}" alt="">
                <p class="ft-description">${item.details}</p>
                <div class="rating">                    
                    <div class="star">&#9734;</div>
                    <div class="star">&#9734;</div>
                    <div class="star">&#9734;</div>
                    <div class="star">&#9734;</div>
                    <div class="star">&#9734;</div>
                </div>
                <p class="ft-price">                    
                    Price:<span class="new-price">${item.price}</span><span class="discount">$50.00</span>
                </p>
                <button class="addCart" onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        cardContainer.appendChild(itemCard) ;       
    });
}

let cart=[];
function addToCart(productId) {
    fetch(`http://localhost:3000/customers/${productId}`)
        .then(response => response.json())
        .then(customers => {
            const selectedProduct = cart.find(item => item.id === productId);

            if (selectedProduct) {
                selectedProduct.quantity += 1;
            } else {
                cart.push({ ...customers, quantity: 1 });
            }
            
            displayCartItems();
        })
        .catch(error => console.error('Error fetching product details: ' + error));
}

const table = document.querySelector('tbody');
const tableContent = document.querySelector('.table');
const displayTotal = document.getElementById('sub-total');



const noItemsContainer = document.querySelector('.no-items');

function displayCartItems(){
    if(cart.length > 0){
        tableContent.style.display ="block";
        noItemsContainer.style.display ="none";
    }else{
        tableContent.style.display ="none";
        noItemsContainer.style.display ="block";
    }

    table.innerHTML=``;
    let total = 0;
    cart.forEach(customerData => {  
        total+=customerData.price*customerData.quantity      
        const cartItem = document.createElement('tr');
        cartItem.classList.add('pro-card');
        cartItem.innerHTML=`

            <td data-cell="Product" class="images">
                <img src="../${customerData.product_img}" alt="product image">
            </td>
            <td class="details" data-cell="Details">
                <p id="item-detail">${customerData.details}</p>
                <p id="item-price">Price: $${customerData.price}</p>
                <p><button class="Del" onclick="removeProduct(${customerData.id})">Remove product</button></p>
            </td>
            <td data-cell="No. of items" class="input">
                <input type="number" value="${customerData.quantity}" min="0" id="quantity">
            </td>
            <td data-cell="sub-total" class="price item">$${customerData.price} x ${customerData.quantity} Items</td>
        `;
        table.appendChild(cartItem);
    })
    displayTotal.textContent = `$${total.toFixed(2)}`;
}

const alertContainer = document.querySelector('.alert');
const messageContent = document.querySelector('.checkout-msg');

const checkoutBtn = document.querySelector('.chk-out')
checkoutBtn.addEventListener("click", () =>{
    const total = cart.reduce((sum,item) => sum + item.price*item.quantity,0);
    alertContainer.style.display = "block";
    messageContent.textContent=`Total Amount $${total.toFixed(2)}. Thank you for shopping with us`
    cart = [];
    displayCartItems();
});