function fetchApi(){
    const url = 'http://localhost:3000/customers';

    return fetch(url)
        .then(response => {
            if(!response.ok){
                throw new Error ('Could not fetch Data')
            }
            return response.json();            
        })
        .catch(error =>{
             console.error('Error' + error);
        });
}
async function getData() {
    try {
        const customerData = await fetchApi();
        displayCartItems(customerData)
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}
getData();

const tableContent = document.querySelector('.table');
const chockoutBtn = document.querySelector('.chk-out');

const alertContainer = document.querySelector('.alert');
const messageContent = document.querySelector('.checkout-msg');
const noItemsContainer = document.querySelector('.no-items');

function displayCartItems(details){
    tableContent.style.display = "block";
    noItemsContainer.style.display = "none";
    details.forEach(customer => {        
        const itemCard = document.createElement('tr');
        itemCard.classList.add('pro-card');
        itemCard.innerHTML=`
            <td data-cell="Product" class="images">
                <img src="${customer.product_img}" alt="product image">
            </td>
            <td class="details" data-cell="Details">
                <p id="item-detail">${customer.details}</p>
                <p id="item-price">$${customer.price}</p>
                <p><button class="Del">Remove product</button></p>
            </td>
            <td data-cell="No. of items" class="input">
                <input type="number" value="${customer.quantity}" min="0" id="quantity">
            </td>
            <td data-cell="sub-total" class="price item">$0.00</td>
        `;
        document.querySelector('tbody').appendChild(itemCard);
    })
}