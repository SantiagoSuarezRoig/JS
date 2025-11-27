

export class Car{
    #brand;
    #model;
    speed;
    isTrunkOpen;

    constructor(brand,model){
        this.#brand = brand;
        this.#model = model;
        this.speed = 0;
        this.isTrunkOpen = false;
    }

    get brand(){
        return this.#brand;
    }

    get model(){
        return this.#model;
    }



    displayInfo(){
        console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} k/h, trunk:${this.isTrunkOpen? 'Open':'Closed'}`)
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



class RaceCar extends Car {
    aceleration;

    constructor(brand,model){
        super(brand,model);
        this.aceleration = 20;
    }



    displayInfo(){
        console.log(`${this.brand} ${this.model}, Speed: ${this.speed} k/h, Aceleration:${this.aceleration}`)
    }

    go(){
        if(!this.isTrunkOpen && this.speed <= 300-this.aceleration)
            this.speed += this.aceleration 
    }

    openTrunk(){
        console.log('Race cars doesnt have a trunk')
    }

    
    closeTrunk(){
        console.log('Race cars doesnt have a trunk')
    }
}


let auto1 = new Car('Toyota','Corolla')
let auto2 = new Car('Tesla','Model 3')
let autote = new RaceCar('McLaren','F1')


// console.log(auto1.brand)
// console.log(auto2.model)

// autote.displayInfo()
// autote.go()
// autote.go()
// autote.go()
// autote.go()
// autote.go()
// autote.go()
// autote.go()
// autote.displayInfo()
// console.log('(frenando... paso una vieja)')
// autote.break()
// autote.break()
// autote.break()
// autote.break()
// autote.break()
// autote.displayInfo()

// autote.openTrunk()
// console.log('Vamo a dar una vueltita!')
// autote.darUnaVuelta()
// autote.displayInfo()

