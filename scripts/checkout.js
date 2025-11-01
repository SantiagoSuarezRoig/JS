import {cart, addToCart, removeCartItem} from '../data/cart.js' ; 
import {products} from '../data/products.js' ;
import {formatCurrency} from './utils/money.js';



let checkOutOrdersHTML = document.querySelector(".order-summary")

let formHtmlOrders = (product,cartItem) =>{
    let orderHTML = `
        <div class="cart-item-container js-item-container-${product.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">


              <img class="product-image"
                src=${product.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${product.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link"
                  data-product-id= "${product.id}">
                    Update
                  </span>
                  <input class="quantity-input-${product.id} quantity-input-Size NoDisplayable">
                  <span class="save-quantity-input-${product.id} link-primary NoDisplayable">Save</span>

                  <span class="delete-quantity-link link-primary js-delete-link"
                  data-product-id="${product.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>


                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>`

    return orderHTML
}

let productOfId = (id) => {
    let i = 0;
    while(products[i].id != id)
        i++
    return products[i]
}

function renderOrders(){
    let ordersHTML = ``
    cart.forEach(cartItem =>{
        ordersHTML += formHtmlOrders(productOfId(cartItem.productId),cartItem)
    })
    checkOutOrdersHTML.innerHTML = ordersHTML
}



function updateCheckOutItems(){
    document.querySelector('.js-amount-of-items').innerText = localStorage.getItem('quantity')
}





updateCheckOutItems()
renderOrders()
let linksDelete = document.querySelectorAll(".js-delete-link")


linksDelete.forEach(link =>
    link.addEventListener('click', ()=>{
        let {productId} = link.dataset
        removeCartItem(productId)
        updateCheckOutItems()
        console.log(cart)
    })
)





let linksUpdate = document.querySelectorAll(".js-update-link")




function changeDisplay(listElement){
    listElement.forEach(e =>{
        if(e.classList.contains('NoDisplayable'))
            e.classList.remove('NoDisplayable')
        else e.classList.add('NoDisplayable')
    })
}

function updateNewQuantity(productId,currentQuantity,SaveButton,InputQuantity,UpdateButton){
    if(InputQuantity.value == ""){
        changeDisplay([currentQuantity,SaveButton,InputQuantity,UpdateButton])
        return;
    }
    if(InputQuantity.value == "0"){
        removeCartItem(productId)
        updateCheckOutItems()
        return;
    }

    let quantity = parseInt(InputQuantity.value)
    currentQuantity.innerText = quantity;
    changeDisplay([currentQuantity,SaveButton,InputQuantity,UpdateButton])
    addToCart(productId,quantity)
    updateCheckOutItems()
    console.log(cart)
}







linksUpdate.forEach(UpdateButton =>
    UpdateButton.addEventListener('click', ()=>{
        let {productId} = UpdateButton.dataset
        let currentQuantity = document.querySelector(`.js-quantity-label-${productId}`)
        let SaveButton = document.querySelector(`.save-quantity-input-${productId}`)
        let InputQuantity = document.querySelector(`.quantity-input-${productId}`)
        changeDisplay([UpdateButton,SaveButton,InputQuantity,currentQuantity])
        InputQuantity.onkeydown = (event) => {
            if(event.key == 'Enter')
                updateNewQuantity(productId,currentQuantity,SaveButton,InputQuantity,UpdateButton)
        }
            
        SaveButton.onclick = () =>
            updateNewQuantity(productId,currentQuantity,SaveButton,InputQuantity,UpdateButton)
        })
)

