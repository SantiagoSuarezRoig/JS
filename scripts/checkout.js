import {renderOrdersSummary} from '../scripts/checkouts/orderSummary.js'
import {renderPaymentSummary} from '../scripts/checkouts/paymentSummary.js'
import {updateDeliveryOption,removeCartItem} from '../data/cart.js'

export let OrdersPaymentHTML = document.querySelector(".payment-summary")


renderOrdersSummary()
renderPaymentSummary()

