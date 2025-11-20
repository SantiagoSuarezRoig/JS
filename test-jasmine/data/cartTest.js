import {addToCart,cart,loadCartFromStorage, saveToStorage} from '../../data/cart.js'


describe('test suite: addToCart',()=>{


    beforeEach(()=>{
        spyOn(localStorage,'setItem')
    })


    it('adds an existing product in the cart',()=>{
        
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:1,
                deliveryOptionId:'1'
            }])
        })

        loadCartFromStorage()

        addToCart('54e0eccd-8f36-462b-b68a-8182611d9add',1)


        
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:2,
                deliveryOptionId:'1'
            }]))

        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart[0].quantity).toEqual(2)
        expect(cart[0].productId).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add')
    })





    it('adds a new product in the cart',()=>{

        
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([])
        })
        loadCartFromStorage()

        addToCart('54e0eccd-8f36-462b-b68a-8182611d9add',1)


        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:1,
                deliveryOptionId:'1'
            }]))

        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart[0].quantity).toEqual(1)
        expect(cart[0].productId).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add')
    })
})
