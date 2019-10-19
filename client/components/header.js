import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';
class NavigationMenu extends Component {
    render() {
      return (
      <div>    
        <Navbar color="dark" dark expand="lg" >
          <NavbarBrand href="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AI-CAREER-COACH</NavbarBrand>
          <NavbarToggler />
          <Collapse navbar>
            <Nav className="ml-auto" Navbar>
              <NavItem>
                <NavLink href=''></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#"></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#"></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
       </div>
      );
    }
  }
  export default NavigationMenu;