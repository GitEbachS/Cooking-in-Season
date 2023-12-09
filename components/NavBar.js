/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navColor">
      <Container className="navSize">
        <Link passHref href="/">
          <Navbar.Brand className="navTitle">Cooking In Season</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link className="navHover">Home</Nav.Link>
            </Link>
            <Link passHref href="/myRecipes">
              <Nav.Link className="navHover">List</Nav.Link>
            </Link>
            <Link passHref href="/recipe/new">
              <Nav.Link className="navHover">New Recipe</Nav.Link>
            </Link>
            <Link passHref href="/day/new">
              <Nav.Link className="navHover">Plan</Nav.Link>
            </Link>
            <Link passHref href="/days">
              <Nav.Link className="navHover">Rotation</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link className="navHover">Profile</Nav.Link>
            </Link>
            <Button className="signOutBtn" variant="outline-warning" size="sm" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
