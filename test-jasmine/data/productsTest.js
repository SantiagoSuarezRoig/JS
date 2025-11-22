import { Product, products, Appliance, Clothing } from "../../data/products";
import { formatCurrency } from "../../scripts/utils/money";



describe('test suite: Product',()=>{

    afterEach(()=>{
        document.querySelector('.js-test-container').innerHTML = ''
    })


    it('Propeties are set correctly',()=>{
        let product1 = new Product({
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

        expect(product1.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(product1.image).toEqual("images/products/athletic-cotton-socks-6-pairs.jpg")
        expect(product1.name).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs")
        expect(product1.priceCents).toEqual(1090)
    })

    it('Get starsURL works fine',()=>{
        let product1 = new Product({
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
        document.querySelector('.js-test-container').innerHTML =
        `<img src=${product1.getStarsUrl()}>`

        expect(document.querySelector('.js-test-container').innerHTML)
        .toEqual(`<img src='images/ratings/rating-45.png'>`)

    })

    it('Get price works fine',()=>{
        let product1 = new Product({
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

        spyOn(formatCurrency())

        document.querySelector('.js-test-container').innerText =
        `$${product1.getPriceUrl()}`

        expect(document.querySelector('.js-test-container').innerText)
        .toEqual('$10.90')

    })

})

describe('test suite: Clothing',()=>{

    afterEach(()=>{
        document.querySelector('.js-test-container').innerHTML = ''
    })


    it('Propeties of father class are set correctly',()=>{
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

        expect(product1.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")
        expect(product1.image).toEqual("images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg")
        expect(product1.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack")
        expect(product1.priceCents).toEqual(799)
    })

    it('Get starsURL (father class method) works fine',()=>{
        let product1 = new Product({
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
        
        document.querySelector('.js-test-container').innerHTML =
        `<img src=${product1.getStarsUrl()}>`

        expect(document.querySelector('.js-test-container').innerHTML)
        .toEqual(`<img src='images/ratings/rating-45.png'>`)
    })

    it('Get price (father class method) works fine',()=>{
        let product1 = new Product({
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
        document.querySelector('.js-test-container').innerText =
        `$${product1.getPriceUrl()}`

        expect(document.querySelector('.js-test-container').innerText)
        .toEqual('$10.90')
    })


})


describe('test suite: Appliance',()=>{
    it()
})