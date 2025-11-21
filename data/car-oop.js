

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


let auto1 = new Car('Toyota','Corolla')
let auto2 = new Car('Tesla','Model 3')



auto1.displayInfo()
auto2.displayInfo()

auto1.go()
auto1.go()
auto1.go()
auto1.openTrunk()
auto1.displayInfo()
auto2.displayInfo()

auto2.openTrunk()
auto2.go()
auto2.go()


auto1.break()
auto1.break()
auto1.break()


auto1.displayInfo()
auto2.displayInfo()