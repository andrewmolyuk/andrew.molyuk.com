import React from "react";
import { ReactComponent as HeartIcon } from "../assets/heart.svg";
import styled from "styled-components";

const FooterGrid = styled.footer`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-top: 3em;
  color: #666;
`;

const Left = styled.div`
  svg {
    vertical-align: sub;
    margin: 0 0.25em;
  }
`;

const Right = styled.div`
  text-align: right;
`;

export default function Footer() {
  return (
    <FooterGrid>
      <Left>
        Made with
        <HeartIcon />
        in Israel
      </Left>
      <Right>&copy; 2020 &middot; #andrewmolyuk</Right>
    </FooterGrid>
  );
}
