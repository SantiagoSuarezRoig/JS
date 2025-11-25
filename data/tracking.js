import { loadProductsFetch,productOfId } from "./products.js";
import { ProductOfOrder } from "./orders.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';



const url = new URL(window.location.href)
let productId = url.searchParams.get('productId')
let orderId = url.searchParams.get('orderId')

let product = ProductOfOrder(productId,orderId)[0]
let order = ProductOfOrder(productId,orderId)[1]

let today = dayjs()
const orderTime = dayjs(order.orderTime);
const deliveryTime = dayjs(product.estimatedDeliveryTime);
const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;





async function renderTracking(){
 
    await loadProductsFetch()
    
    dayjs(product.estimatedDeliveryTime)
    let HTML;
    HTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dayjs(product.estimatedDeliveryTime).format('dddd, MMMM D')}
        </div>

        <div class="product-info">
          ${productOfId(productId).name}
        </div>

        <div class="product-info">
          Quantity: ${product.quantity}
        </div>

        <img class="product-image" src=${productOfId(productId).image}>

        <div class="progress-labels-container">
          <div class="progress-label ${percentProgress<50 ? "current-status" : ''} ">
            Preparing
          </div>
          <div class="progress-label ${percentProgress >= 50 && percentProgress<100 ? "current-status" : ''}">
            Shipped
          </div>
          <div class="progress-label ${percentProgress>=100 ? "current-status" : ''} ">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width:${percentProgress}%"></div>
        </div>
    `
    document.querySelector('.order-tracking').innerHTML = HTML
    document.querySelector('.cart-quantity').innerText = localStorage.getItem('TotalItems') || ''

}

renderTracking()