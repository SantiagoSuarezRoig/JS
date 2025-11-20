import { formatCurrency } from '../../scripts/utils/money.js'



console.log('Pone 2000 en buen formato (20.00)?')
if(formatCurrency(2000)==='20.00'){
    console.log('passed\n\n')
}else{
    console.log('failed\n\n')
}


console.log('Pone el 0 en buen formato?')
if(formatCurrency(0)==='0.00'){
    console.log('passed\n\n')
}else{
    console.log('failed\n\n')
}


console.log('Redondea bien para arriba?')
if(formatCurrency(2000.5)==='20.01'){
    console.log('passed\n\n')
}else{
    console.log('failed\n\n')
}

console.log('Redondea bien para abajo?')
if(formatCurrency(2000.4)==='20.00'){
    console.log('passed\n\n')
}else{
    console.log('failed\n\n')
}

console.log('Funciona con negativo?')
if(formatCurrency(-2000.4)==='-20.00'){
    console.log('passed\n\n')
}else{
    console.log('failed\n\n')
}