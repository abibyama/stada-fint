import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import "../App.css";

const Header: React.FC = () => {
  return (
    <Navbar className="header">
      <NavbarBrand tag={Link} to="/">House Cleaning</NavbarBrand>
      <NavLink tag={Link} to="/bookings">Bookings</NavLink>
      <Nav className="ml-auto" navbar>
      </Nav>
    </Navbar>
  );
};

export default Header;
