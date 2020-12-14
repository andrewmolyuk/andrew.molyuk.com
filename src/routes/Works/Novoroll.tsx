import React, { useEffect, useState } from "react";

interface ISliderPhoto {
  src: string;
  alt: string;
}

interface ICompanyDetails {
  slider: ISliderPhoto[];
}

const initState: ICompanyDetails = {
  slider: [],
};

export default function Novoroll() {
  const [companyDetails, setCompanyDetails] = useState<ICompanyDetails>(
    initState
  );
  useEffect(() => {
    fetch("/data/works/novoroll.json")
      .then((response) => response.json())
      .then((data) => setCompanyDetails(data));
  }, []);

  return (
    <div>
      <h1>Novoroll</h1>

      <div className="slider">
        {companyDetails.slider.map((slide, i) => (
          <img key={i} src={slide.src} alt={slide.alt} />
        ))}
      </div>
    </div>
  );
}
