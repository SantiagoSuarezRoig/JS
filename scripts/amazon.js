let randomNumber = (min,max)=>{
   return Math.floor(Math.random()* (max-min+1) + min)
}

let randomStars = () => (0.5*randomNumber(5,10)).toFixed(1)
let randomCount = () => randomNumber(50,100)
let randomPrice = () => randomNumber(1000,2000)



// let createProduct = (nombre,imagen,ratingCount,ratingStars,precio) =>{
//     let newProduct = {
//         image: imagen,
//         name: nombre,
//         rating:{
//             count: ratingCount,
//             stars: ratingStars
//         },
//         priceCents: precio
//     }
//     products.push(newProduct)
// }


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

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary">
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
