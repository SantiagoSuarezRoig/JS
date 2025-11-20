import {renderOrdersSummary} from '../../scripts/checkouts/orderSummary.js'
import {loadCartFromStorage} from '../../data/cart.js'


describe('test suite: renderOrderSummary',()=>{
    const productId1 = 'c2a82c5e-aff4-435f-9975-517cfaba2ece'
    const productId2 = "6b07d4e7-f540-454e-8a1e-363f25dbae7d"

    it('displays the cart',()=>{

        document.querySelector(".js-test-container").innerHTML = 
        `<div class="js-amount-of-items"></div>
        <div class="js-payment-summary"></div>
        <div class="order-summary"><div>
        `

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([
            {productId: productId1 , quantity:2, deliveryOptionId:'1'},
            {productId: productId2, quantity:3, deliveryOptionId:'2'}  
            ])
        }) 
        loadCartFromStorage();

        renderOrdersSummary();

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2)
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`)
            .innerText).toContain('Quantity: 2')
        
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`)
            .innerText).toContain('Quantity: 3')
    })


    it('removes a product',()=>{
        document.querySelector(".js-test-container").innerHTML = `
        <div class="js-amount-of-items"></div>
        <div class="js-payment-summary"></div>
        <div class="order-summary"><div>
        

        `
        
        
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([
            {productId: productId1 , quantity:2, deliveryOptionId:'1'},
            {productId: productId2, quantity:3, deliveryOptionId:'2'}  
            ])
        })

        loadCartFromStorage()

        renderOrdersSummary()

        document.querySelector(`.js-delete-link-${productId1}`).click()
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1)
    })
})