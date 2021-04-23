import React from 'react'
import { 
  Navbar, 
  Nav, 
} from 'react-bootstrap'

const NavigationBar = () => {
  return(
    <Navbar expand="lg" bg="light" style={styles.navbar}>
      <Navbar.Brand href="/">
        CS 432 Cryptography Project
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link onClick={() => window.location.reload()}>Home</Nav.Link>
        <Nav.Link href="https://github.com/nbennett320/cs-432-cryptography-project">About</Nav.Link>
      </Nav>
    </Navbar>
  )
}

const styles = {
  navbar: {
    backgroundColor: '#f8f9fa'
  }
}

export default NavigationBar