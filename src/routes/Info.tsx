import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  grid-gap: 40px;
  align-items: stretch;
  @media (max-width: 1050px) {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
`;

const Title = styled.h1`
  font-size: 4em;
  padding: 2rem 0;
  @media (max-width: 1050px) {
    font-size: 3em;
  }
`;

const Card = styled.div``;

const CardTitle = styled.h2`
  font-size: 2em;

  @media (max-width: 1050px) {
    font-size: 1.5em;
  }
`;

interface ICard {
  title: string;
  text: [string];
}

export default function Info() {
  const [cards, setCards] = useState<ICard[]>([]);
  useEffect(() => {
    fetch("/data/info.json")
      .then((response) => response.json())
      .then((data) => setCards(data));
  }, []);

  return (
    <div>
      <Title>Hi, nice to meet you</Title>
      <Grid>
        {cards.map((card, i) => (
          <Card key={i}>
            <CardTitle>{card.title}</CardTitle>
            {card.text.map((line: string, j) => (
              <p key={j}>{line}</p>
            ))}
          </Card>
        ))}
      </Grid>
    </div>
  );
}
