import {renderOrdersSummary} from '../scripts/checkouts/orderSummary.js'
import {renderPaymentSummary} from '../scripts/checkouts/paymentSummary.js'
import {renderHeader} from '../scripts/checkouts/header.js'
import { loadProducts } from '../data/products.js'
import {loadCart} from '../data/cart-class.js'




Promise.all([
    new Promise((resolve)=>{
        loadProducts(()=>{
            resolve(10)
        })
    }),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve(5)
        })
    })
])
.then((cosas)=>{
    console.log(cosas)
    renderHeader()
    renderOrdersSummary()
    renderPaymentSummary()
})





