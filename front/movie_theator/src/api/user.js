import axios from "axios"

export const user = {
    login : (data)=>axios.post('/login',{},{
        auth : {
            username : data['username'],
            password:data['password']
        }
    }).then(res=>res.data),

    register : (data)=>axios.post('/user',data).then(res=>res.data),
    forget_password : (data)=>axios.post('/forget',data).then(res=>res.data)

}


