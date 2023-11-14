import React, { useEffect, useState } from 'react'
import { gethistory } from '../services/allapi'

function Wacthistory() {

  const[history,sethistory]=useState([])

  const getwatchHistory=async()=>{
 const{data} = await  gethistory()
 sethistory(data)

  }
  console.log(history);
  useEffect(() => {
    getwatchHistory()
    
  }, [])
  
  return (
    <>
    <h1>Watch history</h1>
    <table className='table shadow m-3 rounded border'>
      <thead>
        <tr>
          <th>id</th>
          <th>cardName</th>
          <th>url</th>
          <th>date</th>
        </tr>
      </thead>
   
    <tbody>
      {
        history?.map((item,index)=>(
<tr>
        <td>{index+1}</td>
        <td>{item?.cardName}</td>
        <td>{item?.url}</td>
        <td>{item?.date}</td>
        </tr>
        ))
      }
      
    </tbody>
    </table>
    </>
  )
}

export default Wacthistory