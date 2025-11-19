import {calculateCartQuantity} from '../../data/cart.js'

let amountOfItemsHTML = document.querySelector('.js-amount-of-items')

export function renderHeader(){
    amountOfItemsHTML.innerText = calculateCartQuantity(JSON.parse(localStorage.getItem('cart')))
}
