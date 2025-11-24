import {Carrito} from '../../data/cart-class.js'
import {formatCurrency} from '../utils/money.js'
import { orders,addOrder } from '../../data/orders.js'


export function renderPaymentSummary(){
  let Cart = new Carrito('cart','TotalItems')
  let totalEnvios = Cart.calculateHandlingMoney()
  let totalProductos = Cart.calculateCartTotalMoney()
  let totalFinal = totalEnvios + totalProductos

  let SummaryOrdersHTML = 
          `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${Cart.totalItems}):</div>
            <div class="payment-summary-money">$${formatCurrency.change(totalProductos)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money
            js-total-shipping">$${formatCurrency.change(totalEnvios)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money
            js-total-beforetax">$${formatCurrency.change(totalFinal)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency.change(totalFinal/10)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency.change(totalFinal+totalFinal/10)}</div>
          </div>

          <button class="place-order-button js-placeOrder-Button button-primary">
            Place your order
          </button>
        </div>
      `
  document.querySelector(".js-payment-summary").innerHTML = SummaryOrdersHTML

  
  document.querySelector('.js-placeOrder-Button').addEventListener('click', async()=>{
    try{  
        const response = await fetch('https://supersimplebackend.dev/orders',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({cart: Cart})
      })

      const order = await response.json()
      addOrder(order)
      
    }catch(error){
      console.log('Unexpected problem happened')
    }

    
    
    window.location.href = 'orders.html'
    
  })
  
}

