import {Carrito} from '../../data/cart-class.js'


describe('test suite: addToCart',()=>{
   

    beforeEach(()=>{
        spyOn(localStorage,'setItem')
    })


    it('adds an existing product in the cart',()=>{
        
        let Cart = new Carrito('cartTest','TotalItemsTest')
        Cart.cartItems = [{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:1,
                deliveryOptionId:'1'
            }];
        
        Cart.totalItems = 1;

        Cart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add',1)

        expect(Cart.cartItems.length).toEqual(1)
        expect(Cart.cartItems[0].quantity).toEqual(2)
        expect(Cart.cartItems[0].productId).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add')
    })





    it('adds a new product in the cart',()=>{

        let Cart = new Carrito('cartTest','TotalItemsTest')
        Cart.cartItems = [{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:1,
                deliveryOptionId:'1'
            }];
        
        Cart.totalItems = 1;

        Cart.addToCart("901eb2ca-386d-432e-82f0-6fb1ee7bf969",2)
            

        expect(Cart.cartItems.length).toEqual(2)
        expect(Cart.cartItems[0].quantity).toEqual(1)
        expect(Cart.cartItems[1].quantity).toEqual(2)
        expect(Cart.cartItems[0].productId).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add')
    })



    it('removes a product that is in the car', ()=>{

        let Cart = new Carrito('cartTest','TotalItemsTest')
        Cart.cartItems = [{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:1,
                deliveryOptionId:'1'
            }];
        
        Cart.totalItems = 1;


        document.querySelector('.js-test-container').innerHTML = `
        <div class='js-item-container-54e0eccd-8f36-462b-b68a-8182611d9add'><div>
        `

        expect(Cart.cartItems.length).toEqual(1)
        Cart.removeCartItem('54e0eccd-8f36-462b-b68a-8182611d9add')
        expect(Cart.cartItems.length).toEqual(0)
    })



    it('removes a product that is NOT in the car', ()=>{
        let Cart = new Carrito('cartTest','TotalItemsTest')
        Cart.cartItems = [{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:1,
                deliveryOptionId:'1'
            }];
        
        Cart.totalItems = 1;

        document.querySelector('.js-test-container').innerHTML = `
        <div class='js-item-container-54e0eccd-8f36-462b-b68a-8182611d9add'><div>
        `

        expect(Cart.cartItems.length).toEqual(1)
        Cart.removeCartItem('56b07d4e7-f540-454e-8a1e-363f25dbae7d')
        expect(Cart.cartItems.length).toEqual(1)
    })


    it('updates a new deliveryOption of a product that IS in the car',()=>{
        let Cart = new Carrito('cartTest','TotalItemsTest')
        Cart.cartItems = [{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:1,
                deliveryOptionId:'1'
            }];
        
        Cart.totalItems = 1;
        Cart.updateDeliveryOption('54e0eccd-8f36-462b-b68a-8182611d9add','2')

        expect(Cart.cartItems[0].deliveryOptionId).toEqual('2')
    })


    it('updates a new deliveryOption of a product that is NOT in the car',()=>{
        let Cart = new Carrito('cartTest','TotalItemsTest')
        Cart.cartItems = [{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:1,
                deliveryOptionId:'1'
            }];
        
        Cart.totalItems = 1;

        Cart.updateDeliveryOption('6b07d4e7-f540-454e-8a1e-363f25dbae7d','2')

        expect(Cart.cartItems[0].deliveryOptionId).toEqual('1')
    })



    it('updates a not valid deliveryOption',()=>{
        let Cart = new Carrito('cartTest','TotalItemsTest')
        Cart.cartItems = [{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:1,
                deliveryOptionId:'1'
            }];
        
        Cart.totalItems = 1;
        
        Cart.updateDeliveryOption('54e0eccd-8f36-462b-b68a-8182611d9add','4')

        expect(Cart.cartItems[0].deliveryOptionId).toEqual('1')
    })

})
