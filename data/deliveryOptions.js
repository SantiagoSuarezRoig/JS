import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function priceOfDeliveryOption(deliveryOptionId){
  let i = 0
  while(deliveryOptions[i].id != deliveryOptionId)
    i++
  return deliveryOptions[i].pricecents
}

export function deliveryDateOfId(id){
  let today = dayjs()
  let i = 0
  while(deliveryOptions[i].id != id)
    i++
  return today.add(deliveryOptions[i].deliveryDays,'days').format('dddd, MMMM D')
}


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



