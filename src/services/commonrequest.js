// import axios library package


import axios from "axios";

// create a function for common api request 
 export const commonRequest=async (method,url,body)=>{

// request configuration :object
let reqConfig={
    method,
    // method means get,put,post,delete
    url,
    // url means http://localhost:4000
   data: body,

   headers :{       //    not compalsary
   "Content-type":"application/json"
   }
}
// api call
// create axios instance 
return await axios (reqConfig).then((response)=>{
    return response
}).catch((err)=>{
    return err
})
}