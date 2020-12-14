import React, { useEffect, useState } from "react";
import { loadData } from "../../helpers";

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
    loadData("/data/works/novoroll.json", setCompanyDetails);
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
