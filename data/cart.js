
export let cart = JSON.parse(localStorage.getItem('cart')) 


if(!cart) cart = [{productId:"c2a82c5e-aff4-435f-9975-517cfaba2ece" , quantity:1},
  {productId:"6b07d4e7-f540-454e-8a1e-363f25dbae7d", quantity:2}];






function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart))
}




export function addToCart(productId,quantity){

  let i = 0
  while(i < cart.length && cart[i].productId != productId)
    i++
  
  if(i < cart.length) cart[i].quantity += quantity
  else cart.push({productId, quantity})
  
  localStorage.setItem('quantity',JSON.stringify(calculateCartQuantity()))
  saveToStorage()
}



export function calculateCartQuantity(){
  let i = 0
  cart.forEach(cartItem => i+= cartItem.quantity)
  return i
}

export function removeCartItem(id){
  cart = cart.filter(cartitem=> cartitem.productId !== id)
  document.querySelector(`.js-item-container-${id}`).remove()
  localStorage.setItem('quantity',JSON.stringify(calculateCartQuantity()))
  saveToStorage()
}



