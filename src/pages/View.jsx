import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Videocard from './Videocard'
import { getVideo } from '../services/allapi'


function View({serverRes}) {


// create a state for holding api response

const [allVideos,setallVideos]=useState([])

const [deleteStatus,setdeleteStatus]=useState(false)

const handledeleteStatus=(res)=>{
setdeleteStatus(res)
}



  // hook ----useeffect
useEffect(() => {
  // call back function body 
getAllVideos()

 
}, [serverRes,deleteStatus])


 const  getAllVideos =async ()=>{
let response=  await  getVideo()
setallVideos(response.data);
  }
  console.log(allVideos);
  return (
    <div className='border p-3 rounded ms-4'>
<Row>
   { 
   allVideos.map(video=>(
    <Col className='ps-3 mb-3' sm={12} md={6}>
    <Videocard card={video} handledeleteStatus={handledeleteStatus}/>
  </Col>
   ))

    }
</Row>
    </div>
  )
}

export default View