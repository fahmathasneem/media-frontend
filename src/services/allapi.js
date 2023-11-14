import {BASE_URL} from"./baseurl";
import { commonRequest } from "./commonrequest";

// add videos Post

export const addVideo=async (body)=>{

return await commonRequest("POST",`${BASE_URL}/videos`,body)

}

// get videos 

export const getVideo=async()=>{

return await commonRequest("GET",`${BASE_URL}/videos`,"")

}

// delete video 

 export const deleteVideo=async(id)=>{

 return await  commonRequest("DELETE",`${BASE_URL}/videos/${id}`,{})

}

// add categories

 export const addCategories=async(body)=>{

  return await commonRequest("POST",`${BASE_URL}/category`,body)
  
}

// getall category

 export const getallCatrgory=async()=>{
  return await commonRequest("GET",`${BASE_URL}/category}`,"")
}

// delete category 

export const deleteCategory=async(id)=>{
return await  commonRequest("DELETE",`${BASE_URL}/category/${id}`,{})
}

// get history 
export const gethistory=async()=>{
  return await commonRequest("GET",`${BASE_URL}/watchhistory}`,"")
}

// addhistory 
export const Addhistory=async(body)=>{

  return await commonRequest("POST",`${BASE_URL}/watchhistory`,body)
  
}

// get single video 
export const getvideo=async(id)=>{

  return await commonRequest("GET",`${BASE_URL}/videos/${id}`,"")
  
  }

  // update category

  export const updateCategory=async(id,body)=>{
    commonRequest("PUT",`${BASE_URL}/category/${id}`,body)
  }

