import {calculateCartQuantity} from '../../data/cart.js'


export function renderHeader(){
    document.querySelector('.js-amount-of-items').innerText = localStorage.getItem('TotalItems')
}
