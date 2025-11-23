import {renderOrdersSummary} from '../../scripts/checkouts/orderSummary.js'
import {Carrito} from '../../data/cart-class.js'
import {loadProductsFetch, loadProducts, productOfId } from '../../data/products.js'
import { deliveryOptions } from '../../data/deliveryOptions.js'
import { cart } from '../../data/cart.js'


describe('test suite: renderOrderSummary',()=>{
    let productId1 = "c2a82c5e-aff4-435f-9975-517cfaba2ece"
    let productId2 = "6b07d4e7-f540-454e-8a1e-363f25dbae7d"
    

    beforeAll((done)=>{
        loadProductsFetch().then(()=>{
            done();
        })
    })

    beforeEach(()=>{
        document.querySelector(".js-test-container").innerHTML = `
        <div class="js-amount-of-items"></div>
        <div class="js-payment-summary"></div>
        <div class="order-summary"><div>
        `

        renderOrdersSummary()
    })
    



    afterEach(()=>{
        localStorage.clear()
        document.querySelector(".js-test-container").innerHTML = ''
    })

    it('displays the cart',()=>{
        expect(document.querySelector(`.js-product-name-${productId1}`).innerText)
        .toEqual('Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter')

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2)

        expect(document.querySelector(`.js-product-price-${productId1}`).innerText)
        .toEqual(`$30.74`)
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`)
            .innerText).toContain('Quantity: 1')
        
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`)
            .innerText).toContain('Quantity: 1')

    })


    it('removes a product',()=>{
        

        document.querySelector(`.js-delete-link-${productId1}`).click()

        let Cart = new Carrito('cart','TotalItems')

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1)
        expect(
            document.querySelector(`.js-item-container-${productId1}`)
        ).toEqual(null)
        
        expect(
            document.querySelector(`.js-item-container-${productId2}`)
        ).not.toEqual(null)

        expect(document.querySelector(`.js-product-name-${productId2}`).innerText)
        .toEqual('Ultra Soft Tissue 2-Ply - 18 Box')

        expect(document.querySelector(`.js-product-price-${productId2}`).innerText)
        .toEqual(`$23.74`)


        expect(Cart.cartItems.length).toEqual(1)
        expect(Cart.cartItems[0].productId).toEqual(productId2)

    })


    it('Update the delivery option correctly',()=>{

        document.querySelector(`.js-product-delivery-option-${productId1}-3`).click()
0
        let Cart = new Carrito('cart','TotalItems')

        expect(document.querySelector(`.js-product-delivery-option-${productId1}-3`).checked)
        .toEqual(true)

        expect(Cart.cartItems.length).toEqual(2)
        expect(Cart.cartItems[0].productId).toEqual("c2a82c5e-aff4-435f-9975-517cfaba2ece")
        expect(Cart.cartItems[0].deliveryOptionId).toEqual('3')
        expect(document.querySelector('.js-total-shipping').innerText).toEqual('$9.99')
        expect(document.querySelector('.js-total-beforetax').innerText).toEqual('$64.47')
    })


})