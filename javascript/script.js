let cart = [];

function addToCart(product) {
    const selectedProduct = cart.find(item => item.id === product.id);

    if (selectedProduct) {
        selectedProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    displayCart();
}

function removeFromCart(productid) {
    cart = cart.filter(item => item.id !== productid)
    displayCart();
}

function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItemsDiv.innerHTML = '';
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `<p>Your cart has no items</p>`;
        cartTotal.innerText = '';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - Ksh${item.price} x ${item.quantity}</p>
            <button onClick='removeFromCart(${item.id})>Remove<button>
        `;
        cartItemsDiv.appendChild(cartItem);
    });

    cartTotal.innerText = `Total: Ksh${total.toFixed(2)}`;
}
function checkOut() {
    if (cart.length === 0){
        alert("Your cart is empty");
    }else{
        const total =cart.reduce((sum,item) => sum + item.price*item.quantity);
        alert(`Total amount: $${total.toFixed(2)}. Thank you for your purchase`);
        cart = [];
        displayCart();
    }
}