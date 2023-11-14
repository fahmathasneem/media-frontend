import { Trash2 } from 'feather-icons-react/build/IconComponents';
import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Addhistory, deleteVideo } from '../services/allapi';
import { v4 as uuidv4 } from 'uuid';

function Videocard({card,handledeleteStatus,insidecategory}) {


  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow =async () => {setShow(true);

    const uid=uuidv4();
console.log(uid);
    let cardTime=new Date()
    console.log(cardTime);
    const{caption ,url}=card

    if(uid!==""&&caption!=""&&url!=""&&cardTime!=""){
      const body={
        id:uid,cardName:caption,url,date:cardTime 
      }
     const response= await Addhistory(body)
     console.log(response);
    }

  
  }


  // video remove
  const removeItem=async(id)=>{
    // maker call to all api 

  let response= await  deleteVideo(id)
  // console.log(response);
  if(response.status>=200&&response.status<300){
    handledeleteStatus(true)
  }
  }

  // drag started

  const dragStarted=(e,id)=>{
    console.log("drag started & source card id:",id);
    e.dataTransfer.setData("cardId",id)
  }
  return (
  <>
      <div>
      <Card draggable onDragStart={e=>dragStarted(e,card?.id)} 
       className='shodow' >
      <Card.Img variant="top" onClick={handleShow} height={'200px'} src={card?.thumbnail} />
      <Card.Body>
        <Card.Title>
          <span>
            {card?.caption}
          </span>
        </Card.Title>
      {
        insidecategory?"":
        <Trash2 onClick={()=>removeItem(card?.id)} color='red' style={{float:'right'}}/>
        }
      </Card.Body>
    </Card>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Video Caption</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width={'100%'} height={'400px'} src={`${card?.url}?autoplay=1`} title="Best of Arijit Singhs 2022 | Arijit Singh Hits Songs | Latest Bollywood Songs | Indian songs." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
       

        </Modal.Body>
       
      </Modal>

      </div>
  </>
  )
}

export default Videocard