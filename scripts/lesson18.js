
function loadAnswerXHML18a(){
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load',()=>{
        console.log(xhr.response)
    })
    xhr.addEventListener('error',()=>{
    console.log('Unexpected error, please try again later')
    })
    xhr.open('GET','https://supersimplebackend.dev/greeting')
    xhr.send()
}


 function loadAnswerFetch18b(){
    awaitfetch('https://supersimplebackend.dev/greeting').
    then( response =>{
        return response.text();
    }).then(response =>{
        console.log(response)
    })
}

async function loadAnswerFetch18c(){
    const response = await fetch('https://supersimplebackend.dev/greeting')
    const text  = await response.text()
    console.log(text)
}


async function sendingStuff18d(){
    const response = await fetch('https://supersimplebackend.dev/greeting',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({name: 'Santiago'})
    })

    const text = await response.text()

    console.log(text)
}


async function requestToAmazon18e(){
    try{
        const response = await fetch('https://amazon.com')
        const text = await response.text()
        console.log(text)
    }catch(error){
        console.log('CORS error, your request was blocked by the backend')
    }
}

async function PostToNowhere18f(){
    try{
        const response = await fetch('https//supersimplebackend.dev',{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        }
        })

        if(response.status >= 400)
            throw response

    }catch(error){
        if(error.status === 400)
            console.log(await error.json())     
    }
}

PostToNowhere18f()
