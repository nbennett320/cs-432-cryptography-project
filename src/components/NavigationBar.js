import React from 'react'
import { 
  Navbar, 
  Nav, 
  Dropdown, 
  Collapse 
} from 'bootstrap-4-react'

const NavigationBar = () => {
  return(
    <Navbar expand="lg" light bg="light">
      <Navbar.Brand href="/">
        CS 432 Cryptography Project
      </Navbar.Brand>
      <Navbar.Toggler target="#nav-dropdown" />
      <Collapse navbar id="nav-dropdown">
        <Navbar.Nav mr="auto">
          <Nav.Item dropdown>
            <Nav.Link dropdownToggle>Options</Nav.Link>
            <Dropdown.Menu>
              <Dropdown.Item>Steganography Encode</Dropdown.Item>
              <Dropdown.Item>Steganography Decode</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>About</Dropdown.Item>
            </Dropdown.Menu>
          </Nav.Item>
        </Navbar.Nav>
      </Collapse>
    </Navbar>
  )
}

export default NavigationBar