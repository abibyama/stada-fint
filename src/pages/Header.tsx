import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import "../App.css";

const Header: React.FC = () => {
  return (
    <Navbar className="header">
      <NavbarBrand tag={Link} to="/">CleanFine</NavbarBrand>
      <NavLink tag={Link} to="/bookings">Bookings</NavLink>
      <NavLink tag={Link} to="/about">About us</NavLink>
      <NavLink tag={Link} to="/contact">Contact</NavLink>

      <Nav className="ml-auto" navbar>
      </Nav>
    </Navbar>
  );
};

export default Header;
