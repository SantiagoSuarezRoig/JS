import {Car} from '../../data/car-oop.js'



describe('test suite: car',()=>{


    it('verify if the car rus',()=>{
        let autito = new Car('Peugeot','408')
        autito.go()

        expect(autito.speed).toEqual(5)
    })

    it('verify if the car Breaks',()=>{
        let autito = new Car('Peugeot','408')
        autito.go()
        autito.break()

        expect(autito.speed).toEqual(0)
    })


    it('the car opens its truck',()=>{
        let autito = new Car('Peugeot','408')
        autito.openTrunk()

        expect(autito.isTrunkOpen).toEqual(true)
    })

    it('the car closes its truck',()=>{
        let autito = new Car('Peugeot','408')
        autito.openTrunk()
        autito.closeTrunk()

        expect(autito.isTrunkOpen).toEqual(false)
    })

    it('the trunk cant be open when car is moving',()=>{
        let autito = new Car('Peugeot','408')
        autito.go()
        autito.openTrunk()

        expect(autito.isTrunkOpen).toEqual(false)
    })
    

    it('verify that the car doesnt run with the trunk open',()=>{
        let autito = new Car('Peugeot','408')
        autito.openTrunk()
        autito.go()

        expect(autito.speed).toEqual(0)
    })


})