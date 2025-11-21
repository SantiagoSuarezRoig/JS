import {priceOfDeliveryOption} from './deliveryOptions.js'
import {productOfId} from './products.js'


class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadCartFromStorage()
    }

    #loadCartFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey))

        if(!this.cartItems) this.cartItems = [
        {productId:"c2a82c5e-aff4-435f-9975-517cfaba2ece" , quantity:1, deliveryOptionId:'1'},
        {productId:"6b07d4e7-f540-454e-8a1e-363f25dbae7d", quantity:1, deliveryOptionId:'2'}  
        ];
    }

    saveToStorage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems))
    }

    addToCart(productId,quantity){
        let i = 0
        while(i < this.cartItems.length && this.cartItems[i].productId != productId)
            i++
        
        if(i < this.cartItems.length) this.cartItems[i].quantity += quantity
        else this.cartItems.push({productId, quantity, deliveryOptionId:'1'})
        
        this.saveToStorage()
    }

    calculateHandlingMoney(){
    let total = 0;
    this.cartItems.forEach(cartItem =>
        total += priceOfDeliveryOption(cartItem.deliveryOptionId))
    return total
    }

    calculateCartTotalMoney(){
        let total = 0;
        this.cartItems.forEach(cartItem=>
            total += cartItem.quantity * productOfId(cartItem.productId).priceCents
        )
        return total
    }

    calculateCartQuantity(){
        let total = 0
        this.cartItems.forEach(cartItem => total+= cartItem.quantity)

        return total
    }

    removeCartItem(id){
        this.cartItems = this.cartItems.filter(cartitem=> cartitem.productId !== id)

        if(document.querySelector(`.js-item-container-${id}`)!=null)
            document.querySelector(`.js-item-container-${id}`).remove()

        this.saveToStorage()
    }

    changeQuantityOfProduct(productId,quantity){
        let i = 0
        while(this.cartItems[i].productId!= productId)
            i++
        this.cartItems[i].quantity = quantity
        
        this.saveToStorage()
    }

    updateDeliveryOption(productId,deliveryOption){
        if(deliveryOption != '1' && deliveryOption != '2'&& deliveryOption != '3')
            return;

        let i = 0
        while(i<this.cartItems.length && this.cartItems[i].productId != productId)
            i++

        if(i == this.cartItems.length)
            return;

        this.cartItems[i].deliveryOptionId = deliveryOption

        this.saveToStorage()
    }

}




// let cartPijin = new Cart('cart-Pijin')
// let cartBusiness = new Cart('cart-Pijin')


// cartPijin.addToCart('b0f17cc5-8b40-4ca5-9142-b61fe3d98c85',1)
// console.log(cartPijin)
// console.log(cartBusiness)
// console.log(cartPijin instanceof Cart)
