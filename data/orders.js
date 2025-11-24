
export const orders = localStorage.getItem('orders') || []

export function addOrder(order){
    orders.unshift(order)
    saveToStorage()
}

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders))
}

function renderOrders(){
    document.querySelector('.js-amount-of-items').innerText
    = localStorage.getItem('TotalItems')

    document.querySelectorAll('.js-order-container').
    forEach(orders =>{
        let ordersHTML = ``
        orders.forEach(order =>{

        })
        orders.innerHTML =
    })
}


renderOrders()

console.log(orders)





