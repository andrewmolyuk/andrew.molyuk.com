import React from "react";
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

export default function Home() {
  return (
    <div>
      <Title>Hi, nice to meet you</Title>

      <Grid>
        <Card>
          <CardTitle>I'm Andrew Molyuk</CardTitle>
          <p>
            I am the father of a gang of four, a happy husband, a hands-on
            development manager, an experienced software architect, a principal
            coder, a skilled devops and technology guru. I’m not only used to
            wearing those many hats, I sincerely enjoy it.
          </p>
          <p>
            I have many years of experience leading teams and companies to
            success.
          </p>
        </Card>
        <Card>
          <CardTitle>1997</CardTitle>
          <p>
            I joined a mid level Israeli company as developer in database
            management team to help shape the data and replication processes.
          </p>
          <p>
            It was a very challenging time to work immediatelly after emigrating
            to sunny Israel, but it was offset by acquaintance with so many
            professionals who accompany me to this day.
          </p>
        </Card>
        <Card>
          <CardTitle>2003</CardTitle>
          <p>
            First steps in complex financial systems, telecom solutions and
            involvement in design and development of huge web platform using
            data science to improve oncology care in children's departments.
          </p>
          <p>
            I got a very humane experience, we participated in the system
            deployment and configuration in hospitals and closely communicated
            with both doctors and children.
          </p>
        </Card>
        <Card>
          <CardTitle>2008</CardTitle>
          <p>
            I've been working as an architect in a small company that was
            engaged in managing video assets in the web and had huge ambitions.
            For a few years we became partners with all Israeli media moguls
            such as the Ynet, Maariv, Walla, TheMarker, Yellow pages and so on.
          </p>
          <p>
            It was a very interesting and challenging time, especially since the
            whole system was designed and developed from scratch and I got my
            first C-level managerial expirience.
          </p>
        </Card>
        <Card>
          <CardTitle>2016</CardTitle>
          <p>
            It was a time of American TV shows and very hard work. Distributed
            development teams and local units took all the time. In very short
            time we created a sophisticated voting system for an
            ultra-large-scale application that can handle 30 million
            simultaneous connections at a speed of up to 3 million requests per
            second. The system performed in US, Brazil, Argentina, Portugal,
            Indonesia, Israel and Russia.
          </p>
          <p>
            I was also excited to have collaborated with ABC, Disney, Univision
            and Fusion.
          </p>
        </Card>
        <Card>
          <CardTitle>Now</CardTitle>
          <p>
            I deeply entered the world of video ads and arbitration. Fully
            remote development team, about 23 billion aggregated events daily,
            complicated hiring process, 300 million database entries updated
            daily, complex decision-making algorithms, more than 250
            automatically scalable computing units at peak load and effective
            business processes automation.
          </p>
          <p>
            Coronola time, quarantine, working from home, new challenges and a
            lot of fun everyday.
          </p>
        </Card>
      </Grid>
    </div>
  );
}
