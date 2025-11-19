import {renderOrdersSummary} from '../scripts/checkouts/orderSummary.js'
import {renderPaymentSummary} from '../scripts/checkouts/paymentSummary.js'
import {updateDeliveryOption,removeCartItem} from '../data/cart.js'

export let OrdersPaymentHTML = document.querySelector(".payment-summary")

function changeDisplay(listElement){
    listElement.forEach(e =>{
        if(e.classList.contains('NoDisplayable'))
            e.classList.remove('NoDisplayable')
        else e.classList.add('NoDisplayable')
    })
}

function updateNewQuantity(productId,currentQuantity,SaveButton,InputQuantity,UpdateButton){
    if(InputQuantity.value == "" || currentQuantity.innerText == InputQuantity.value){
        changeDisplay([currentQuantity,SaveButton,InputQuantity,UpdateButton])
        return;
    }
    if(InputQuantity.value == "0"){
        removeCartItem(productId)
        return;
    }
    let quantity = parseInt(InputQuantity.value)
    currentQuantity.innerText = quantity
    changeQuantityOfProduct(productId,quantity)
    changeDisplay([currentQuantity,SaveButton,InputQuantity,UpdateButton])
}

let deliveryOptionsUpdate = document.querySelectorAll('.js-deliveryOption')
deliveryOptionsUpdate.forEach((option)=>{
  option.addEventListener('click',()=>{
    const {productId, deliveryOptionId} = option.dataset
    updateDeliveryOption(productId,deliveryOptionId)
    renderOrdersSummary()
  })
})

let linksDelete = document.querySelectorAll(".js-delete-link")
linksDelete.forEach(link =>
    link.addEventListener('click', ()=>{
        let {productId} = link.dataset
        removeCartItem(productId)
        renderOrdersSummary()
    })
)

let linksUpdate = document.querySelectorAll(".js-update-link")
linksUpdate.forEach(UpdateButton =>{
    UpdateButton.addEventListener('click', ()=>{
        let {productId} = UpdateButton.dataset
        let currentQuantity = document.querySelector(`.js-quantity-label-${productId}`)
        let SaveButton = document.querySelector(`.save-quantity-input-${productId}`)
        let InputQuantity = document.querySelector(`.quantity-input-${productId}`)
        changeDisplay([UpdateButton,SaveButton,InputQuantity,currentQuantity])
        InputQuantity.onkeydown = (event) => {
            if(event.key == 'Enter'){
              updateNewQuantity(productId,currentQuantity,SaveButton,InputQuantity,UpdateButton)
                renderOrdersSummary()
            }
        }
        SaveButton.onclick = () =>{
          updateNewQuantity(productId,currentQuantity,SaveButton,InputQuantity,UpdateButton)
          renderOrdersSummary()
        }
      })
    }
)


renderOrdersSummary()
renderPaymentSummary()