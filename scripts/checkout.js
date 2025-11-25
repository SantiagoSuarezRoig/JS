import {renderOrdersSummary} from '../scripts/checkouts/orderSummary.js'
import {renderPaymentSummary} from '../scripts/checkouts/paymentSummary.js'
import {renderHeader} from '../scripts/checkouts/header.js'
import { loadProductsFetch } from '../data/products.js'
import {loadCartFetch} from '../data/cart-class.js'



async function loadPage(){
    try{
        await loadProductsFetch()
        await loadCartFetch()
    } catch (error){
        console.log('Unexpected error please try agaian later')
    }


    renderHeader()
    renderOrdersSummary()
    renderPaymentSummary()
}

loadPage()




// async function loadPage(){
//     try{
//         // throw('error 1')
//         await loadProductsFetch()

//         await new Promise((resolve,reject)=>{
//             // throw('error 2')
//             loadCart(()=>{
//                 // reject('error 3')
//                 resolve()
//             })
//         })
        
//     } catch (error){
//         console.log('Unexpected error please try agaian later')
//     }


//     renderHeader()
//     renderOrdersSummary()
//     renderPaymentSummary()
// }






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





