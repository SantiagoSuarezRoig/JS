import {renderOrdersSummary} from '../../scripts/checkouts/orderSummary.js'
import {loadCartFromStorage,cart} from '../../data/cart.js'


describe('test suite: renderOrderSummary',()=>{
    let productId1 = 'c2a82c5e-aff4-435f-9975-517cfaba2ece'
    let productId2 = "6b07d4e7-f540-454e-8a1e-363f25dbae7d"

    beforeEach(()=>{
        document.querySelector(".js-test-container").innerHTML = `
        <div class="js-amount-of-items"></div>
        <div class="js-payment-summary"></div>
        <div class="order-summary"><div>`

        spyOn(localStorage,'setItem')
        
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([
            {productId: productId1 , quantity:2, deliveryOptionId:'1'},
            {productId: productId2, quantity:3, deliveryOptionId:'2'}  
            ])
        })

        loadCartFromStorage()
        renderOrdersSummary()
    })
    
    afterEach(()=>{
        document.querySelector(".js-test-container").innerHTML = ''
    })

    it('displays the cart',()=>{

        expect(document.querySelector(`.js-product-name-${productId1}`).innerText)
        .toEqual('Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter')

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2)


        expect(document.querySelector(`.js-product-price-${productId1}`))

        expect(
            document.querySelector(`.js-product-quantity-${productId1}`)
            .innerText).toContain('Quantity: 2')
        
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`)
            .innerText).toContain('Quantity: 3')

    })


    it('removes a product',()=>{



        document.querySelector(`.js-delete-link-${productId1}`).click()

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1)
        expect(
            document.querySelector(`.js-item-container-${productId1}`)
        ).toEqual(null)
        
        expect(
            document.querySelector(`.js-item-container-${productId2}`)
        ).not.toEqual(null)

        expect(document.querySelector(`.js-product-name-${productId2}`).innerText)
        .toEqual('Ultra Soft Tissue 2-Ply - 18 Box')

        expect(cart.length).toEqual(1)
        expect(cart[0].productId).toEqual(productId2)

    })
})