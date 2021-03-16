import React from 'react'
import { 
  Navbar, 
  Nav, 
  // NavDropdown, 
} from 'react-bootstrap'

const NavigationBar = props => {
  return(
    <Navbar expand="lg" light bg="light">
      <Navbar.Brand href="/">
        CS 432 Cryptography Project
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link onClick={props.navigateHome}>Home</Nav.Link>
        <Nav.Link href="https://github.com/nbennett320/cs-432-cryptography-project">About</Nav.Link>
        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
      </Nav>
    </Navbar>
  )
}

export default NavigationBar