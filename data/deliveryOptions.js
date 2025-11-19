export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    pricecents: 0
},{
    id: '2',
    deliveryDays: 3,
    pricecents: 499
},{
    id: '3',
    deliveryDays: 1,
    pricecents: 999
}]



export function priceOfDeliveryOption(deliveryOptionId){
  let i = 0
  while(deliveryOptions[i].id != deliveryOptionId)
    i++
  return deliveryOptions[i].pricecents
}