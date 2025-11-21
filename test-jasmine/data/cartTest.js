import {addToCart,cart,loadCartFromStorage, removeCartItem, updateDeliveryOption} from '../../data/cart.js'


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



    it('removes a product that is in the car', ()=>{

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:1,
                deliveryOptionId:'1'
            }])
        })

        loadCartFromStorage()

        document.querySelector('.js-test-container').innerHTML = `
        <div class='js-item-container-54e0eccd-8f36-462b-b68a-8182611d9add'><div>
        `

        expect(cart.length).toEqual(1)
        removeCartItem('54e0eccd-8f36-462b-b68a-8182611d9add')
        expect(cart.length).toEqual(0)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([]))
    })



    it('removes a product that is NOT in the car', ()=>{

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:1,
                deliveryOptionId:'1'
            }])
        })

        loadCartFromStorage()

        document.querySelector('.js-test-container').innerHTML = `
        <div class='js-item-container-54e0eccd-8f36-462b-b68a-8182611d9add'><div>
        `
        expect(cart.length).toEqual(1)
        removeCartItem('56b07d4e7-f540-454e-8a1e-363f25dbae7d')
        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:1,
                deliveryOptionId:'1'
            }]))
    })


    it('updates a new deliveryOption of a product that IS in the car',()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:1,
                deliveryOptionId:'1'
            }])
        })

        loadCartFromStorage()
        updateDeliveryOption('54e0eccd-8f36-462b-b68a-8182611d9add','2')

        expect(cart[0].deliveryOptionId).toEqual('2')
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:1,
                deliveryOptionId:'2'
            }]))
    })


    it('updates a new deliveryOption of a product that is NOT in the car',()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:1,
                deliveryOptionId:'1'
            }])
        })

        loadCartFromStorage()
        updateDeliveryOption('6b07d4e7-f540-454e-8a1e-363f25dbae7d','2')

        expect(cart[0].deliveryOptionId).toEqual('1')
        expect(localStorage.setItem).toHaveBeenCalledTimes(0)
    })



    it('updates a not valid deliveryOption',()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:1,
                deliveryOptionId:'1'
            }])
        })

        loadCartFromStorage()
        updateDeliveryOption('54e0eccd-8f36-462b-b68a-8182611d9add','4')

        expect(cart[0].deliveryOptionId).toEqual('1')
        expect(localStorage.setItem).toHaveBeenCalledTimes(0)
    })

})
