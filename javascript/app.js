function fetchApi(){
    const url = 'http://localhost:3000/customers';

    return fetch(url)
        .then(response => {
            if(!response.ok){
                throw new Error ('Could not fetch Data')
            }
            return response.json();            
        })
        .then(customersData => displayCard(customersData))
        .catch(error =>{
             console.error('Error' + error);
        });
}
fetchApi();

function displayCard(customersData){
    const cardContainer = document.querySelector('.ft-cards');

    customersData.forEach(customerData => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('card');
        itemCard.innerHTML = `
            <img src="../${customerData.product_img}" alt="">
                <p class="ft-description">${customerData.details}</p>
                <div class="rating">                    
                    <div class="star">&#9734;</div>
                    <div class="star">&#9734;</div>
                    <div class="star">&#9734;</div>
                    <div class="star">&#9734;</div>
                    <div class="star">&#9734;</div>
                </div>
                <p class="ft-price">                    
                    Price:<span class="new-price">${customerData.price}</span><span class="discount">$50.00</span>
                </p>
                <button class="addCart" onclick="addToCart()">Add to Cart</button>
        `;
        cardContainer.appendChild(itemCard) ;       
    });
}

// function addToCart(productId) {
//     fetch(`http://localhost:3000/customers/${productId}`)
//         .then(response => response.json())
//         .then(product => {
//             const selectedProduct = cart.find(item => item.id === productId);

//             if (selectedProduct) {
//                 selectedProduct.quantity += 1;
//             } else {
//                 cart.push({ ...product, quantity: 1 });
//             }

//             displayCartItems(); // Display updated cart after adding item
//         })
//         .catch(error => console.error('Error fetching product details: ' + error));
// }

// const tableContent = document.querySelector('.table');
// const chockoutBtn = document.querySelector('.chk-out');

// const alertContainer = document.querySelector('.alert');
// const messageContent = document.querySelector('.checkout-msg');
// const noItemsContainer = document.querySelector('.no-items');

// function displayCartItems(customerData){
//     tableContent.style.display = "block";
//     noItemsContainer.style.display = "none";

//     customerData.forEach(customerData => {        
//         const itemCard = document.createElement('tr');
//         itemCard.classList.add('pro-card');
//         itemCard.innerHTML=`
//             <td data-cell="Product" class="images">
//                 <img src="../${customerData.product_img}" alt="product image">
//             </td>
//             <td class="details" data-cell="Details">
//                 <p id="item-detail">${customerData.details}</p>
//                 <p id="item-price">Price: $${customerData.price}</p>
//                 <p><button class="Del">Remove product</button></p>
//             </td>
//             <td data-cell="No. of items" class="input">
//                 <input type="number" value="${customerData.quantity}" min="0" id="quantity">
//             </td>
//             <td data-cell="sub-total" class="price item">$${customerData.quantity*customerData.price}</td>
//         `;
//         document.querySelector('tbody').appendChild(itemCard);
//     })
// }