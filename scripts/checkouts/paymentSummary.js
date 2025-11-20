import {calculateHandlingMoney,calculateCartTotalMoney,calculateCartQuantity} from '../../data/cart.js'
import { formatCurrency } from '../utils/money.js'


export function renderPaymentSummary(){
  let totalEnvios = calculateHandlingMoney()
  let totalProductos = calculateCartTotalMoney()
  let totalFinal = totalEnvios + totalProductos

  let SummaryOrdersHTML = 
          `<div class="payment-summary-title">
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
    document.querySelector(".js-payment-summary").innerHTML = SummaryOrdersHTML
}

