import {priceOfDeliveryOption} from './deliveryOptions.js'
import {productOfId} from './products.js'


export class Cart {
    cartItems;
    totalItems;
    #keyCartItems;
    #keyTotalItems;

    constructor(keyCartItems,keyTotalItems){
        this.#keyCartItems = keyCartItems;
        this.#keyTotalItems = keyTotalItems;

        this.#loadCartFromStorage()
    }

    #loadCartFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#keyCartItems))
        this.totalItems = JSON.parse(localStorage.getItem(this.#keyTotalItems))

        if(!this.cartItems){
            this.cartItems = [
            {productId:"c2a82c5e-aff4-435f-9975-517cfaba2ece" , quantity:1, deliveryOptionId:'1'},
            {productId:"6b07d4e7-f540-454e-8a1e-363f25dbae7d", quantity:1, deliveryOptionId:'2'}  
            ];
            this.totalItems = 2;
        }
    }

    saveToStorage(){
        localStorage.setItem(this.#keyCartItems,JSON.stringify(this.cartItems))
        localStorage.setItem(this.#keyTotalItems,this.totalItems)
    }

    addToCart(productId,quantity){
        let i = 0
        while(i < this.cartItems.length && this.cartItems[i].productId != productId)
            i++
        
        if(i < this.cartItems.length)
            this.cartItems[i].quantity += quantity
        else
            this.cartItems.push({productId, quantity, deliveryOptionId:'1'})
        
        this.totalItems += quantity
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

    removeCartItem(id){
        let i = 0
        while(i < this.cartItems.length && this.cartItems[i]!=id)
            i++

        if(i==this.cartItems.length)
            return;
        

        let deletedQuantity = this.cartItems[i].quantity
        this.totalItems -= deletedQuantity
        this.cartItems.splice(i,1)
        document.querySelector(`.js-item-container-${id}`).remove()

        this.saveToStorage()
    }

    changeQuantityOfProduct(productId,quantity){
        let i = 0
        while(i < this.cartItems.length && this.cartItems[i].productId!= productId)
            i++

        if(i==this.cartItems.length)
            return;

        this.totalItems = this.totalItems - this.cartItems[i].quantity + quantity
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




