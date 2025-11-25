import {Carrito} from '../data/cart-class.js' ; 
import {products,loadProductsFetch} from '../data/products.js' ;


async function loadPage(){
  try{
    await loadProductsFetch()

  }catch(error){
    console.log('Error en LoadProductsFetch()')
  }
  renderProductsGridFinal()
}

loadPage()


function BuySignal(productId){
  document.querySelector(`.js-added-to-cart-${productId}`).classList.add("addedOpacity")
  return setTimeout(()=>{
      document.querySelector(`.js-added-to-cart-${productId}`).classList.remove("addedOpacity")       
    }, 2000)
}

function renderCartQuantity(){
  document.querySelector(".cart-quantity")
  .innerText = localStorage.getItem('TotalItems') == "0" ? "": localStorage.getItem('TotalItems')

}

function renderProductsGridFinal(){
  let Cart = new Carrito('cart','TotalItems')
  const URL_Ref = new URL(window.location.href)
  let search = URL_Ref.searchParams.get('search')
  
  let filteredProducts = products

  if(search){
    search = search.toLowerCase()
    filteredProducts = products.filter((product)=>{
      let similarToKeyWord = false;
      if(product.keyWords)
        product.keyWords.forEach(keyword => 
          similarToKeyWord = keyword.toLowerCase().includes(search)? true:similarToKeyWord
        )
      return product.name.toLowerCase().includes(search) || similarToKeyWord 
    })
  }
    
  let productsHTML = '';
  filteredProducts.forEach(product=>
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


  renderCartQuantity()

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

  document.querySelector('.search-bar').onkeydown = (event)=>{
    if(event.key == 'Enter'){
      const searchContent = document.querySelector('.search-bar').value
      window.location.href = `amazon.html?search=${searchContent}`
    }
  }

  document.querySelector('.search-button').addEventListener('click',()=>{
    const searchContent = document.querySelector('.search-bar').value
    window.location.href = `amazon.html?search=${searchContent}`
  })

}


function renderPageOld18p(){
  let Cart = new Carrito('cart','TotalItems')
  const URL_Ref = new URL(window.location.href)
  let search = URL_Ref.searchParams.get('search')

  let filteredProducts = products

  if(search){
    search = search.toLowerCase()
    filteredProducts = products.filter((product)=>{
      let similarToKeyWord = false;
      if(product.keyWords)
        product.keyWords.forEach(keyword => 
          similarToKeyWord = keyword.toLowerCase().includes(search)? true:similarToKeyWord
        )
      return product.name.toLowerCase().includes(search) || similarToKeyWord 
    })
  }

  let productsHTML = '';
  filteredProducts.forEach(product=>
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

  renderCartQuantity()

  document.querySelector('.search-button').addEventListener('click',()=>{
    const searchContent = document.querySelector('.search-bar').value
    window.location.href = `amazon.html?search=${searchContent}`
  })

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




