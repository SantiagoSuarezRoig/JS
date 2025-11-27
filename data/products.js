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
  keyWords;
  
  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name
    this.rating = productDetails.rating
    this.priceCents = productDetails.priceCents
    this.keyWords = productDetails.keywords
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




export async function loadProductsFetch(){
  const promise = await fetch('https://supersimplebackend.dev/products')
  const products_ = await promise.json() 
  products = products_.map((productDetails)=>{
    if(productDetails.type == 'clothing')
      return new Clothing(productDetails)
    if(productDetails.type == 'Electrodomestic')
      return new Appliance(productDetails)
    return new Product(productDetails)})
  
  console.log('LoadProducts')

  return products_
}


// export function loadProducts(fun){
//   const xhr = new XMLHttpRequest() ;

//   xhr.addEventListener('load',()=>{
//       products = JSON.parse(xhr.response).map((productDetails)=>{
//     if(productDetails.type == 'clothing')
//       return new Clothing(productDetails)

//     if(productDetails.type == 'Electrodomestic')
//       return new Appliance(productDetails)

//       return new Product(productDetails)})
      
//       console.log('loadProducts')
//       fun()
//   })

//   xhr.addEventListener('error',()=>{
//     console.log('Unexpected error, please try again later')
//   })

//   xhr.open('GET','https://supersimplebackend.dev/products')
//   xhr.send()
// }



// export function loadProductsFetch(){
//   let promise = fetch('https://supersimplebackend.dev/products').
//   then((response)=>{
//     return response.json();
//   }).
//   then((productsData)=>{
//     products = productsData.map((productDetails)=>{
//     if(productDetails.type == 'clothing')
//       return new Clothing(productDetails)
//     if(productDetails.type == 'Electrodomestic')
//       return new Appliance(productDetails)
//     return new Product(productDetails)})
//   }).catch(()=>{
//     console.log('Unexpected error please try again later')
//   })
  
//   return promise
// }










