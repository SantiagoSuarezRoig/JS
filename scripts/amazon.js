import {cart, addToCart} from '../data/cart.js' ; 
import {products} from '../data/products.js' ;
import {formatCurrency} from './utils/money.js';

const productsHTMLConteiner = document.querySelector(".products-grid")



let formHtmlProduct = product =>{
    let HTML = 
           `<div class="product-container">

          <div class="product-image-container">
            <img class="product-image"
              src=${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>


         <div class="product-quantity-container">
            <select class = "js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary"
          data-product-id="${product.id}">
            Add to Cart
          </button>



        </div> 
          `
    return HTML
}


let productsHTML = `` ;
products.forEach(product=>
    productsHTML += formHtmlProduct(product)
)

productsHTMLConteiner.innerHTML = productsHTML



let BottonAddToCart = document.querySelectorAll(".add-to-cart-button")
let quantityCartHTML = document.querySelector(".cart-quantity")
quantityCartHTML.innerText = JSON.parse(localStorage.getItem('quantity'))


let desaparicionAddButton = 0

function BuySignal(productId){
  clearTimeout(desaparicionAddButton)
  let addedToCart = document.querySelector(`.js-added-to-cart-${productId}`)
  addedToCart.classList.add("addedOpacity")
  desaparicionAddButton = setTimeout(()=>addedToCart.classList.remove("addedOpacity"),2000)
}


export function updateCartQuantity(){
  let quantity = 0;
  cart.forEach(cartItem => quantity += cartItem.quantity)
  localStorage.setItem('quantity',JSON.stringify(quantity))
  quantityCartHTML.innerText = JSON.parse(localStorage.getItem('quantity'))
}




BottonAddToCart.forEach(boton=>
  boton.addEventListener('click',()=>{
    let {productId} = boton.dataset
    BuySignal(productId)
    addToCart(productId)
    updateCartQuantity()
    })
)


