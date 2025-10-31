export const cart =[];


export function addToCart(productId){
  let quantity = parseInt(document.querySelector(`.js-quantity-selector-${productId}`).value)

  let i = 0
  while(i < cart.length && cart[i].productId != productId)
    i++
  
  if(i < cart.length) cart[i].quantity += quantity
  else cart.push({productId, quantity})
}
