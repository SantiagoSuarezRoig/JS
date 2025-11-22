import {renderOrdersSummary} from '../scripts/checkouts/orderSummary.js'
import {renderPaymentSummary} from '../scripts/checkouts/paymentSummary.js'
import {renderHeader} from '../scripts/checkouts/header.js'
import { loadProducts } from '../data/products.js'


loadProducts(()=>{
    renderHeader()
    renderOrdersSummary()
    renderPaymentSummary()
})




