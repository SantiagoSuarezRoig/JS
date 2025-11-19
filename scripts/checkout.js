import {cart, addToCart, removeCartItem, calculateCartQuantity, saveToStorage} from '../data/cart.js' ; 
import {products} from '../data/products.js' ;
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';







let checkOutOrdersHTML = document.querySelector(".order-summary")
let amountOfItemsHTML = document.querySelector('.js-amount-of-items')


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
                ${formHTMLdeliveryOptions(product,cartItem)}
              </div>
            </div>
          </div>`

    return orderHTML
}


let formHTMLdeliveryOptions = (product,cartItem) =>{
  let HTML;
  let today = dayjs()
  
  

  deliveryOptions.forEach((deliveryOption)=>{

    let dateString = today.add(deliveryOption.deliveryDays,'days').format('dddd, MMMM D')
    let DeliveryPrice = deliveryOption.pricecents == 0 ? 'FREE': `$${formatCurrency(deliveryOption.pricecents)}`
    let isChecked = deliveryOption.id === cartItem.deliveryOptionId
    
    HTML += 
      `<div class="delivery-option">
          <input type="radio"
            'checked'
            class="delivery-option-input"
            name="delivery-option-${product.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${DeliveryPrice} - Shipping
            </div>
          </div>
        </div>`
  })

  return HTML
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
    amountOfItemsHTML.innerText = calculateCartQuantity(JSON.parse(localStorage.getItem('cart')))
}





updateCheckOutItems()
renderOrders()


let linksDelete = document.querySelectorAll(".js-delete-link")


linksDelete.forEach(link =>
    link.addEventListener('click', ()=>{
        let {productId} = link.dataset
        removeCartItem(productId)
        updateCheckOutItems()
    })
)





let linksUpdate = document.querySelectorAll(".js-update-link")

function changeQuantityOfProduct(productId,quantity){
    let i = 0
    while(cart[i].productId!= productId)
        i++
    cart[i].quantity = quantity
}


function changeDisplay(listElement){
    listElement.forEach(e =>{
        if(e.classList.contains('NoDisplayable'))
            e.classList.remove('NoDisplayable')
        else e.classList.add('NoDisplayable')
    })
}

function updateNewQuantity(productId,currentQuantity,SaveButton,InputQuantity,UpdateButton){
    if(InputQuantity.value == "" || currentQuantity.innerText == InputQuantity.value){
        changeDisplay([currentQuantity,SaveButton,InputQuantity,UpdateButton])
        return;
    }
    if(InputQuantity.value == "0"){
        removeCartItem(productId)
        updateCheckOutItems()
        return;
    }
    let quantity = parseInt(InputQuantity.value)
    currentQuantity.innerText = quantity
    changeQuantityOfProduct(productId,quantity)
    changeDisplay([currentQuantity,SaveButton,InputQuantity,UpdateButton])

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

