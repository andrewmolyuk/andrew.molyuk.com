import React from "react";

export default function Home() {
  return (
    <div>
      <h1>I do good things with good people</h1>

      <div id="cards">
        <div className="card">
          <h2>
            <a href="/works/novoroll">Novoroll</a>
          </h2>
          <p>
            I managed a 100% remote creative and development teams since the
            very beginning of company's growth and led business processes in the
            most efficient way. As a CTO, defined, designed and developed one of
            the hugest projects in my career.
          </p>
        </div>
        <div className="card">
          <h2>Screenz</h2>
          <p>... .</p>
        </div>
        <div className="card">
          <h2>Synerion</h2>
          <p>...</p>
        </div>
        <div className="card">
          <h2>BestTV</h2>
          <p>...</p>
        </div>
        <div className="card">
          <h2>dsIT</h2>
          <p>...</p>
        </div>
      </div>
    </div>
  );
}
