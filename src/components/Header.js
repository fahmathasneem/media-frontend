
import { Link } from 'react-router-dom'
import UploadCloud from 'feather-icons-react/build/IconComponents/UploadCloud';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <div>
        <Navbar className="bg-primary">
        <Container>
          <Navbar.Brand>
            <Link to={''} style={{textDecoration:'none'}}>
          <UploadCloud color="white" size={45}/>
            <span className='text-light ms-3'>VIDEO UPLOAD</span>
            </Link>
            {/* icon from react feather icons  */}
            {/* ms-3 for gap between text and icon  */}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header