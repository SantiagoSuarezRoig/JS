import {Carrito} from '../data/cart-class.js' ; 
import {products,loadProducts} from '../data/products.js' ;



new Promise((resolve)=>{
  loadProducts(()=>{
    resolve()
  })
}).then(()=>{
  renderProductsGrid()
})




function BuySignal(productId){
  document.querySelector(`.js-added-to-cart-${productId}`).classList.add("addedOpacity")
  return setTimeout(()=>{
      document.querySelector(`.js-added-to-cart-${productId}`).classList.remove("addedOpacity")       
    }, 2000)
}


function renderProductsGrid(){
  let Cart = new Carrito('cart','TotalItems')
  let productsHTML = '';
  products.forEach(product=>
      productsHTML += `
      <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src=${product.getStarsUrl()}>
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPriceUrl()}
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
          
          ${product.sizeChartLinkHTML()}
          ${product.instructionsLinkHTML()}
          ${product.warrantyLinkHTML()}

          

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary"
          data-product-id="${product.id}">
            Add to Cart
          </button>



        </div> `
  )
  document.querySelector(".products-grid").innerHTML = productsHTML


  document.querySelector(".cart-quantity")
  .innerText = localStorage.getItem('TotalItems') == "0" ? "": localStorage.getItem('TotalItems')

  document.querySelectorAll(".add-to-cart-button")
  .forEach(boton=>{
    let clearTime= 0;
    boton.addEventListener('click',()=>{ 
      let {productId} = boton.dataset
      let quantity = parseInt(document.querySelector(`.js-quantity-selector-${productId}`).value)
      clearTimeout(clearTime)
      clearTime = BuySignal(productId)
      Cart.addToCart(productId,quantity)
      document.querySelector(".cart-quantity").innerText = localStorage.getItem('TotalItems')
      })
    }
  )
}





