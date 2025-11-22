

const xhr = new XMLHttpRequest() ;

xhr.addEventListener('load',()=>{
    const products1 = JSON.parse(xhr.response)
    export const realProducts = products1
})



xhr.open('GET','https://supersimplebackend.dev/products')
xhr.send()