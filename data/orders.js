import {loadProductsFetch, productOfId } from "./products.js"
import { formatCurrency } from "../scripts/utils/money.js"
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { Carrito } from "./cart-class.js";




let cart = new Carrito('cart','TotalItems')
export let orders = JSON.parse(localStorage.getItem('orders')) || [];


export function renderOrders(){
    orders = JSON.parse(localStorage.getItem('orders')) || []
}


export function addOrder(order){
    orders.unshift(order)
    saveToStorage()
}

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders))
}

export function ProductOfOrder(idProduct,idOrder){
    let i = 0
    while(orders[i].id != idOrder)
        i++
    
    let j = 0

    while(orders[i].products[j].productId != idProduct)
        j++

    let exactProduct = orders[i].products[j]

    return exactProduct
}




function renderCartQuantity() {
    document.querySelector('.js-amount-of-items').innerText
    = localStorage.getItem('TotalItems')
}


function buySignal(id){
    document.querySelector(`.js-buyAgainText-${id}`).innerText = 'Added'
    return setTimeout(()=>{
        document.querySelector(`.js-buyAgainText-${id}`).innerText = 'Buy it again'
    },2000)
}


function formHtmlordersdetails(order){
    let HTML = ``
    let orderId = order.id
    order.products.forEach(product => {
        HTML += `
            <div class="product-image-container">
              <img src=${productOfId(product.productId).image}>
            </div>

            <div class="product-details">
              <div class="product-name">
                ${productOfId(product.productId).name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary
               js-buy-Again-button"
               data-product-id ="${product.productId}"
               data-quantity = "${product.quantity}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message js-buyAgainText-${product.productId}">
                Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${orderId}&productId=${product.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
            `
    })
    return HTML
}


async function renderOrdersHTML(){
    await loadProductsFetch()
    renderCartQuantity()

    let ordersHTML = `` ; 
    orders.forEach(order =>{
        ordersHTML += `
         <div class="order-container js-order-container-${order.id}">   
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(order.orderTime).format('MMMM D')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency.change(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

             <div class="order-details-grid js-product-order-id">
            ${formHtmlordersdetails(order)}
            </div>
        </div>
        `
    })
    document.querySelector('.js-orders-grid').innerHTML = ordersHTML

    
    document.querySelectorAll('.js-buy-Again-button')
    .forEach(button =>{
        let timeOut= 0;
        button.addEventListener('click',()=>{
            let {productId,quantity} = button.dataset
            clearTimeout(timeOut)
            timeOut = buySignal(productId)

            cart.addToCart(productId,quantity)
            renderCartQuantity()
        })
    })
}


renderOrders()
renderOrdersHTML()









