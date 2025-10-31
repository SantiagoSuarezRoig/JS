// let randomNumber = (min,max)=>{
//    return Math.floor(Math.random()* (max-min+1) + min)
// }


// let randomStars = () => (0.5*randomNumber(5,10)).toFixed(1)
// let randomCount = () => randomNumber(50,100)
// let randomPrice = () => randomNumber(1000


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
            $${(product.priceCents / 100).toFixed(2)}
          </div>


         <div class="product-quantity-container">
            <select>
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

          <div class="added-to-cart" data-product-id="${product.id}">
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
let quantityCart = document.querySelector(".cart-quantity")



BottonAddToCart.forEach(boton=>{
  boton.addEventListener('click',()=>{
    let productAddedID = boton.dataset.productId
  
    let i = 0
    while(i < cart.length && cart[i].productId != productAddedID)
      i++
    
    if(i<cart.length) cart[i].quantity++
    else cart.push({productId: productAddedID, quantity: 1})

    quantityCart.innerText++
    console.log(cart)
    })
  })




