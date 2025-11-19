import {priceOfDeliveryOption} from './deliveryOptions.js'
import {productPriceOfId} from './products.js'


export let cart = JSON.parse(localStorage.getItem('cart')) 


if(!cart) cart = [
  {productId:"c2a82c5e-aff4-435f-9975-517cfaba2ece" , quantity:1, deliveryOptionId:'1'},
  {productId:"6b07d4e7-f540-454e-8a1e-363f25dbae7d", quantity:2, deliveryOptionId:'2'}
];






export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart))
}




export function addToCart(productId,quantity){

  let i = 0
  while(i < cart.length && cart[i].productId != productId)
    i++
  
  if(i < cart.length) cart[i].quantity += quantity
  else cart.push({productId, quantity, deliveryOptionId:'1'})
  saveToStorage()
}





export function calculateHandlingMoney(){
  let total = 0;
  cart.forEach(cartitem => total += priceOfDeliveryOption(cartitem.deliveryOptionId))

  return total
}

export function calculateCartTotalMoney(){
  let total = 0;
  cart.forEach(cartItem=>
    total += cartItem.quantity * productPriceOfId(cartItem.productId)
  )
  return total
}

export function calculateCartQuantity(){
  let i = 0
  cart.forEach(cartItem => i+= cartItem.quantity)
  return i
}

export function removeCartItem(id){
  cart = cart.filter(cartitem=> cartitem.productId !== id)
  document.querySelector(`.js-item-container-${id}`).remove()
  saveToStorage()
}



export function updateDeliveryOption(productId,deliveryOption){
  let i = 0
  while(cart[i].productId != productId)
    i++
  cart[i].deliveryOptionId = deliveryOption
  saveToStorage()
}


// localStorage.setItem('quantity',JSON.stringify(calculateCartQuantity()))