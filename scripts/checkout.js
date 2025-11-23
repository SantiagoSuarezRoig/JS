import {renderOrdersSummary} from '../scripts/checkouts/orderSummary.js'
import {renderPaymentSummary} from '../scripts/checkouts/paymentSummary.js'
import {renderHeader} from '../scripts/checkouts/header.js'
import { loadProducts, loadProductsFetch } from '../data/products.js'
import {loadCart} from '../data/cart-class.js'



async function loadPage(){
    

    await loadProductsFetch()

    await new Promise((resolve)=>{
        loadCart(()=>{
            resolve()
        })
    })
    renderHeader()
    renderOrdersSummary()
    renderPaymentSummary()
}

loadPage()




// Otra manera de hacer las cosas...

// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve()
//         })
//     })
// ])
// .then((cosas)=>{
    //     console.log(cosas)
    //     renderHeader()
    // renderOrdersSummary()
    // renderPaymentSummary()
// })






// Otra manera de hacerlo....

// Promise.all([
//     new Promise((resolve)=>{
//         loadProductsFetch(()=>{
//         resolve(10)
//         })
//     }),
//     new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve(5)
//         })
//     })
// ])
// .then((cosas)=>{
//     console.log(cosas)
//     renderHeader()
//     renderOrdersSummary()
//     renderPaymentSummary()
// })





