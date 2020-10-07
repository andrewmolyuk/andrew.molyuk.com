import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5em;
  a {
    text-decoration: none;
    color: #333;
  }
`;

const Menu = styled.ul`
  list-style-type: none;
  text-align: right;
  li {
    display: inline;
    padding: 0 1em;
    a {
      text-decoration: none;
      color: #666;
    }
    a.selected {
      color: #333;
      border-bottom: 1px solid #333;
    }
  }
`;

export default function App() {
  return (
    <Nav>
      <Logo>
        <a href="/">#andrewmolyuk</a>
      </Logo>
      <Menu>
        <li>
          <NavLink exact to="/" activeClassName="selected">
            Info
          </NavLink>
        </li>
        <li>
          <NavLink to="/works" activeClassName="selected">
            Works
          </NavLink>
        </li>
        <li>
          <NavLink to="/links" activeClassName="selected">
            Links
          </NavLink>
        </li>
      </Menu>
    </Nav>
  );
}
