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

interface ICompany {
  title: string;
  text: [string];
}

export default function Works() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  useEffect(() => {
    fetch("/data/works.json")
      .then((response) => response.json())
      .then((data) => setCompanies(data));
  }, []);

  return (
    <div>
      <Title>I do good things with good people</Title>
      <Grid>
        {companies.map((company, i) => (
          <Card key={i}>
            <CardTitle>
              <a href={`/works/${company.title.toLowerCase()}`}>
                {company.title}
              </a>
            </CardTitle>
            {company.text.map((line: string, j) => (
              <p key={j}>{line}</p>
            ))}
          </Card>
        ))}
      </Grid>
    </div>
  );
}
