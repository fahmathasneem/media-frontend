import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
function Landingpage() {

  // useNavigate is hook 
  const navigate=useNavigate()
  const handleNavigate=()=>{
    // navigate to home 
    navigate('/home')
  }
    return (
        <div>
            <Row className='align-items-center'>
              <Col></Col>
              <Col lg={6}>
                <h1>WELCOME TO VIDEOO.COM</h1>
                <p style={{textAlign:"justify"}}>
                    When user can use their favourite videos user can upload any youtube videos by copy and paste their url video.com will allow to add and remove their uploaded videos and also arrange them in different categories by drag and drop it is free try it now!!!!

                </p>
                <button onClick={handleNavigate} className='btn btn-success'>click here to know more!!!</button>
              </Col>
              <Col lg={4}>
<img className='img-fluid ms-5' src="http://www.onextrapixel.com/wp-content/uploads/2015/07/Music-Player.jpg" alt="no image" />
              </Col>
              <Col></Col>
            </Row>
        </div>
    )
}

export default Landingpage