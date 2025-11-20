import {addToCart,cart,loadCartFromStorage} from '../../data/cart.js'


describe('test suite: addToCart',()=>{
    it('adds an existing product in the cart',()=>{
        spyOn(localStorage,'setItem')
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:1,
                deliveryOption:'1'
            }])
        })
        loadCartFromStorage()

        addToCart('54e0eccd-8f36-462b-b68a-8182611d9add',1)
        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart[0].quantity).toEqual(2)
        expect(cart[0].productId).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add')
    })





    it('adds a new product in the cart',()=>{

        spyOn(localStorage,'setItem')
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([])
        })
        loadCartFromStorage()

        addToCart('54e0eccd-8f36-462b-b68a-8182611d9add',1)
        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart[0].quantity).toEqual(1)
        expect(cart[0].productId).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add')
    })
})
