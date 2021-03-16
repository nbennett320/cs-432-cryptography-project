import React from 'react'
import { 
  Navbar, 
  Nav, 
  // NavDropdown, 
} from 'react-bootstrap'

const NavigationBar = props => {
  return(
    <Navbar expand="lg" bg="light">
      <Navbar.Brand href="/">
        CS 432 Cryptography Project
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link onClick={props.navigateHome}>Home</Nav.Link>
        <Nav.Link href="https://github.com/nbennett320/cs-432-cryptography-project">About</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default NavigationBar