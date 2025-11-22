import { Product, Appliance, Clothing } from "../../data/products.js";
import { formatCurrency } from "../../scripts/utils/money.js";



describe('test suite: Product',()=>{

    const product1 = new Product({
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
            stars: 4.5,
            count: 87
            },
            priceCents: 1090,
            keywords: [
            "socks",
            "sports",
            "apparel"
            ]
        })

    afterEach(()=>{
        document.querySelector('.js-test-container').innerHTML = ''
    })


    it('Propeties are set correctly',()=>{
        expect(product1.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(product1.image).toEqual("images/products/athletic-cotton-socks-6-pairs.jpg")
        expect(product1.name).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs")
        expect(product1.priceCents).toEqual(1090)
    })

    it('Get starsURL works fine',()=>{
        document.querySelector('.js-test-container').innerHTML =
        `<img src=${product1.getStarsUrl()}>`

        expect(document.querySelector('.js-test-container').innerHTML)
        .toEqual(`<img src="images/ratings/rating-45.png">`)

    })

    it('Get price works fine',()=>{

        spyOn(product1,'getPriceUrl').and.callThrough()

        document.querySelector('.js-test-container').innerText = product1.getPriceUrl()
        
        expect(product1.getPriceUrl).toHaveBeenCalledTimes(1)
        expect(document.querySelector('.js-test-container').innerText)
        .toEqual(`$10.90`)
        


    })

})

describe('test suite: Clothing',()=>{
    
    let product1 = new Clothing({
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
            stars: 4.5,
            count: 56
            },
            priceCents: 799,
            keywords: [
            "tshirts",
            "apparel",
            "mens"
            ],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png"
        })

    afterEach(()=>{
        document.querySelector('.js-test-container').innerHTML = ''
    })


    it('Propeties of father class are set correctly',()=>{
        expect(product1.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")
        expect(product1.image).toEqual("images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg")
        expect(product1.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack")
        expect(product1.priceCents).toEqual(799)
    })

    it('Get starsURL (father class method) works fine',()=>{

        document.querySelector('.js-test-container').innerHTML =
        `<img src=${product1.getStarsUrl()}>`

        expect(document.querySelector('.js-test-container').innerHTML)
        .toEqual(`<img src="images/ratings/rating-45.png">`)
    })

    it('Get price (father class method) works fine',()=>{

        spyOn(formatCurrency,'change').and.callThrough()

        document.querySelector('.js-test-container').innerText = product1.getPriceUrl()

        expect(document.querySelector('.js-test-container').innerText)
        .toEqual('$7.99')
        expect(formatCurrency.change).toHaveBeenCalledTimes(1)
    })

    it('Size chart method works fine',()=>{

        document.querySelector('.js-test-container').innerHTML =
        `<a href='${product1.sizeChartLink}' target="_blank">Size Chart</a>`

        expect(document.querySelector('.js-test-container').innerHTML)
        .toEqual(`<a href="images/clothing-size-chart.png" target="_blank">Size Chart</a>`)

    })

})


describe('test suite: Appliance',()=>{
    
    let product1 = new Appliance({
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
            stars: 5,
            count: 2197
            },
            priceCents: 1899,
            keywords: [
            "toaster",
            "kitchen",
            "appliances"
            ],
            type: 'Electrodomestic',
            instructionsLink:'images/appliance-instructions.png',
            warrantyLink:'images/appliance-warranty.png'
        })

    afterEach(()=>{
        document.querySelector('.js-test-container').innerHTML = ''
    })


    it('Propeties of father class are set correctly',()=>{
        expect(product1.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add")
        expect(product1.image).toEqual("images/products/black-2-slot-toaster.jpg")
        expect(product1.name).toEqual("2 Slot Toaster - Black")
        expect(product1.priceCents).toEqual(1899)
    })

    it('Get starsURL (father class method) works fine',()=>{

        document.querySelector('.js-test-container').innerHTML =
        `<img src=${product1.getStarsUrl()}>`

        expect(document.querySelector('.js-test-container').innerHTML)
        .toEqual(`<img src="images/ratings/rating-50.png">`)
    })

    it('Get price (father class method) works fine',()=>{

        spyOn(formatCurrency,'change').and.callThrough()

        document.querySelector('.js-test-container').innerText = product1.getPriceUrl()

        expect(document.querySelector('.js-test-container').innerText)
        .toEqual('$18.99')
        expect(formatCurrency.change).toHaveBeenCalledTimes(1)
    })

    it('instructionslink and warrantylink works fine',()=>{

        document.querySelector('.js-test-container').innerHTML =
        `<a href='${product1.instructionsLink}' target="_blank">Instructions</a>
        <a href='${product1.warrantyLink}' target="_blank">Warranty</a>`

        expect(document.querySelector('.js-test-container').innerHTML)
        .toEqual(`<a href="images/appliance-instructions.png" target="_blank">Instructions</a>
        <a href="images/appliance-warranty.png" target="_blank">Warranty</a>`)
    })
})