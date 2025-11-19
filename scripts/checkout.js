import {cart, addToCart, removeCartItem, calculateCartQuantity,saveToStorage,updateDeliveryOption,calculateCartTotalMoney,calculateHandlingMoney} from '../data/cart.js' ; 
import {products} from '../data/products.js' ;
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';








let checkOutOrdersHTML = document.querySelector(".order-summary")
let OrdersSummaryHTML = document.querySelector(".payment-summary")
let amountOfItemsHTML = document.querySelector('.js-amount-of-items')


function changeQuantityOfProduct(productId,quantity){
    let i = 0
    while(cart[i].productId!= productId)
        i++
    cart[i].quantity = quantity
}


let productOfId = (id) => {
    let i = 0;
    while(products[i].id != id)
        i++
    return products[i]
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
}

let deliveryDateOfId = (cartItemDeliveryId) =>{
  let today = dayjs()
  let i = 0
  while(deliveryOptions[i].id != cartItemDeliveryId)
    i++

  return today.add(deliveryOptions[i].deliveryDays,'days').format('dddd, MMMM D')
}




let formHTMLOrdersSummary = (cart) =>{
  let totalEnvios = calculateHandlingMoney()
  let totalProductos = calculateCartTotalMoney()
  let totalFinal = totalEnvios + totalProductos

  let SummaryOrdersHTML = 
          `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(totalProductos)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(totalEnvios)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalFinal)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(totalFinal/10)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalFinal+totalFinal/10)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
      `
    return SummaryOrdersHTML
}


let formHtmlOrders = (product,cartItem) =>{
  
  let dateOfDelivery = deliveryDateOfId(cartItem.deliveryOptionId)

    let orderHTML = `
        <div class="cart-item-container js-item-container-${product.id}">
            <div class="delivery-date js-delivery-date-${product.id}">
              Delivery date: ${dateOfDelivery}
            </div>

            <div class="cart-item-details-grid">


              <img class="product-image"
                src=${product.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(product.priceCents) * cartItem.quantity}
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
       `<div class="delivery-option
       js-deliveryOption"
       data-product-id="${product.id}"
       data-delivery-option-id="${deliveryOption.id}">

          <input type="radio"
            ${isChecked ? "checked": ''}
            class="delivery-option-input delivery-option-${product.id} data-product-id="${deliveryOption.id}""

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



function renderOrders(){
    let ordersHTML = ``
    OrdersSummaryHTML.innerHTML = formHTMLOrdersSummary(cart)
    cart.forEach(cartItem =>{
        ordersHTML += formHtmlOrders(productOfId(cartItem.productId),cartItem)
    })
    checkOutOrdersHTML.innerHTML = ordersHTML
    

    let deliveryOptionsUpdate = document.querySelectorAll('.js-deliveryOption')
    deliveryOptionsUpdate.forEach((option)=>{
      option.addEventListener('click',()=>{
        const {productId, deliveryOptionId} = option.dataset
        updateDeliveryOption(productId,deliveryOptionId)
        renderOrders()
      })
    })

    let linksDelete = document.querySelectorAll(".js-delete-link")
    linksDelete.forEach(link =>
        link.addEventListener('click', ()=>{
            let {productId} = link.dataset
            removeCartItem(productId)
            updateCheckOutItems()
            renderOrders()
        })
    )

    let linksUpdate = document.querySelectorAll(".js-update-link")
    linksUpdate.forEach(UpdateButton =>{
        UpdateButton.addEventListener('click', ()=>{
            let {productId} = UpdateButton.dataset
            let currentQuantity = document.querySelector(`.js-quantity-label-${productId}`)
            let SaveButton = document.querySelector(`.save-quantity-input-${productId}`)
            let InputQuantity = document.querySelector(`.quantity-input-${productId}`)
            changeDisplay([UpdateButton,SaveButton,InputQuantity,currentQuantity])
            InputQuantity.onkeydown = (event) => {
                if(event.key == 'Enter'){
                  updateNewQuantity(productId,currentQuantity,SaveButton,InputQuantity,UpdateButton)
                   renderOrders()
                }
            }
            SaveButton.onclick = () =>{
              updateNewQuantity(productId,currentQuantity,SaveButton,InputQuantity,UpdateButton)
              renderOrders()
            }
          })
        }
    )
}

function updateCheckOutItems(){
    amountOfItemsHTML.innerText = calculateCartQuantity(JSON.parse(localStorage.getItem('cart')))
}



updateCheckOutItems()
renderOrders()

