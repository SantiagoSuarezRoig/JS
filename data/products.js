import {formatCurrency} from '../scripts/utils/money.js'



export function productOfId(id){
    let i = 0;
    while(products[i].id != id)
        i++
    return products[i]
}


export class Product{
  id;
  image;
  name;
  rating;
  priceCents;
  
  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name
    this.rating = productDetails.rating
    this.priceCents = productDetails.priceCents
  }




  getStarsUrl(){
    return `images/ratings/rating-${this.rating.stars * 10}.png`
  }

  getPriceUrl(){
    return `$${formatCurrency.change(this.priceCents)}`
  }


  sizeChartLinkHTML(){
    return ""
  }

  instructionsLinkHTML(){
    return ""
  }

  warrantyLinkHTML(){
    return ""
  }

}

export class Clothing extends Product{
  sizeChartLink;

  constructor(productDetails){
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink
  }

  sizeChartLinkHTML(){
    return `<a href='${this.sizeChartLink}' target ='_blank'>Size Chart</a>`
  }
}


export class Appliance extends Product{
  instructionsLink;
  warrantyLink;

  constructor(productDetails){
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  instructionsLinkHTML(){
    return `<a href='${this.instructionsLink}' target='_blank'>Instructions</a>`
  }

  warrantyLinkHTML(){
    return `<a href='${this.warrantyLink}' target='_blank'>Warranty</a>`
  }

}



export let products = []

export function loadProducts(fun){
  const xhr = new XMLHttpRequest() ;

  xhr.addEventListener('load',()=>{
      products = JSON.parse(xhr.response).map((productDetails)=>{
    if(productDetails.type == 'clothing')
      return new Clothing(productDetails)
    if(productDetails.type == 'Electrodomestic')
      return new Appliance(productDetails)

      return new Product(productDetails)})
      
      fun()
  })

  xhr.open('GET','https://supersimplebackend.dev/products')
  xhr.send()
}







// const hoy = new Date()
// console.log(hoy)
// console.log(hoy.toLocaleTimeString())



