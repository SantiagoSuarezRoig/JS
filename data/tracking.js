import { loadProductsFetch,productOfId } from "./products.js";
import { ProductOfOrder } from "./orders.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';



const url = new URL(window.location.href)
let productId = url.searchParams.get('productId')
let orderId = url.searchParams.get('orderId')

let product = ProductOfOrder(productId,orderId)



async function renderTracking(){
 
    await loadProductsFetch()
    
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
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    `
    document.querySelector('.order-tracking').innerHTML = HTML 
}

renderTracking()