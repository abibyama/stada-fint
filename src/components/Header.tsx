import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand tag={Link} to="/">House Cleaning</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/bookings">Bookings</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;
