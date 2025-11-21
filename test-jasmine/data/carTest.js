// import {Car} from '../../data/car-oop.js'

class Car{
    brand;
    model;
    speed;
    isTrunkOpen;

    constructor(brand,model){
        this.brand = brand;
        this.model = model;
        this.speed = 0;
        this.isTrunkOpen = false;
    }


    displayInfo(){
        console.log(`${this.brand} ${this.model}, Speed: ${this.speed} k/h, trunk:${this.isTrunkOpen? 'Open':'Closed'}`)
    }

    go(){
        if(!this.isTrunkOpen && this.speed <= 195) this.speed += 5 
    }

    break(){
        if(this.speed >=5) this.speed -= 5 
    }



    openTrunk(){
        if(this.speed == 0)
            this.isTrunkOpen = true
    }

    closeTrunk(){
        this.isTrunkOpen = false
    }


    darUnaVuelta(vueltas){
        for(let i = 0; i < vueltas; i++){
            if(Math.round(Math.random()) === 0){
                 this.go() 
            }else{
                 this.break() 
            }
            // Math.round(Math.floor()) == 0 ? this.go() : this.break
        }
    }
}



describe('test suite: car',()=>{
    let Car = new Car('Peugeot','408')

    it('verify if the car rus',()=>{
        Car.go()

        expected(Car.speed).toEqual(5)
    })

    it('verify if the car Breaks',()=>{
        Car.go()
        Car.break()

        expected(Car.speed).toEqual(0)
    })


    it('the car opens its truck',()=>{
        Car.openTrunk()

        expected(Car.isTrunkOpen).toEqual(true)
    })

    it('the car closes its truck',()=>{
        Car.openTrunk()
        Car.closeTrunk()

        expected(Car.isTrunkOpen).toEqual(false)
    })

    it('the trunk cant be open when car is moving',()=>{
        Car.go()
        Car.openTrunk()

        expected(Car.isTrunkOpen).toEqual(false)
    })
    

    it('verify that the car doesnt run with the trunk open',()=>{
        Car.openTrunk()
        Car.go()

        expected(Car.speed).toEqual(0)
    })


})