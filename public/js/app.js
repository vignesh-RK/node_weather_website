const weatherForm = document.querySelector('form')
const sendLocation = document.querySelector('#send-location')
const search = document.querySelector('input')
const message= [document.querySelector('#message-1'),document.querySelector('#message-2'),document.querySelector('#message-3'),document.querySelector('#message-4'),document.querySelector('#message-5'),document.querySelector('#message-6'),document.querySelector('#message-7')]
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    var location = search.value

   
    for(var i = 0; i < message.length; i++){
       message[i].innerHTML=''
    }
    message[0].textContent = 'Loading...'
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message[0].textContent = data.error
            } else {
                message[0].innerHTML = 'Location:'+'&emsp;'+'&emsp;'+'&emsp;'+data.location+'<hr>'
                message[1].innerHTML = 'Temprature:'+'&emsp;'+'&emsp;'+"It's currently " + data.body.current.temperature + ' degress out and ' + 'it seems '+data.body.current.weather_descriptions[0]+'<hr>'
                message[2].innerHTML='Wind Speed:'+'&emsp;'+'&emsp;'+data.body.current.wind_speed+' km/hr'+'<hr>'
                message[3].innerHTML='Pressure:'+'&emsp;'+'&emsp;'+'&emsp;'+data.body.current.pressure+' mb'+'<hr>'
                message[4].innerHTML='Humidity:'+'&emsp;'+'&emsp;'+'&emsp;'+data.body.current.humidity+' %'+'<hr>'
                message[5].innerHTML='Visibility:'+'&emsp;'+'&emsp;'+'&emsp;'+data.body.current.visibility +' km'+'<hr>'
                message[6].innerHTML='Feels Like '+data.body.current.feelslike + "&#8457;"

            }
        })
    })
    document.getElementById('my-input').value=''
   
})

sendLocation.addEventListener('click',(e)=>{
    for(var i = 0; i < message.length; i++){
        message[i].innerHTML=''
     }
    message[0].textContent = 'Loading...'
    navigator.geolocation.getCurrentPosition((position) => {
        fetch('/location?latitude='+position.coords.latitude+'&longitude='+position.coords.longitude).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    message[0].textContent = data.error
                } else {
                    message[0].innerHTML = 'Location:'+'&emsp;'+'&emsp;'+'&emsp;'+data.body.location.name+'<hr>'
                    message[1].innerHTML = 'Temprature:'+'&emsp;'+'&emsp;'+"It's currently " + data.body.current.temperature + ' degress out and ' + 'it seems '+data.body.current.weather_descriptions[0]+'<hr>'
                    message[2].innerHTML='Wind Speed:'+'&emsp;'+'&emsp;'+data.body.current.wind_speed+' km/hr'+'<hr>'
                    message[3].innerHTML='Pressure:'+'&emsp;'+'&emsp;'+'&emsp;'+data.body.current.pressure+' mb'+'<hr>'
                    message[4].innerHTML='Humidity:'+'&emsp;'+'&emsp;'+'&emsp;'+data.body.current.humidity+' %'+'<hr>'
                    message[5].innerHTML='Visibility:'+'&emsp;'+'&emsp;'+'&emsp;'+data.body.current.visibility +' km'+'<hr>'
                    message[6].innerHTML='Feels Like '+data.body.current.feelslike + "&#8457;"
    
                }
            })
        })
        //console.log(position)
    })
})
