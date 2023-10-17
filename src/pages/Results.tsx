import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const matchesToPrint = searchParams.get("matchesToPrint");
  const resultsToPrint = searchParams.get("resultsToPrint");

  const competitionName = searchParams.get("competitionName");
  const sport = searchParams.get("sport");
  const scoringSystem = searchParams.get("scoringSystem");

  const matchesToPrintParts = matchesToPrint?.split("*");
  const resultsToPrintParts = resultsToPrint?.split("*");

  if (resultsToPrintParts) {
    if (scoringSystem === "win/draw/loss") {
      resultsToPrintParts.sort((a, b) => {
        return (
          parseInt(b[b.length - 5]) -
          parseInt(b[b.length - 1]) -
          (parseInt(a[a.length - 5]) - parseInt(a[a.length - 1]))
        );
      });
    } else {
      resultsToPrintParts.sort((a, b) => {
        return (
          parseInt(b[b.length - 3]) -
          parseInt(b[b.length - 1]) -
          (parseInt(a[a.length - 3]) - parseInt(a[a.length - 1]))
        );
      });
    }
  }

  const navigate = useNavigate();

  return (
    <div>
      <h3>Competition name: {competitionName}</h3>
      <h3>{sport}</h3>
      <h3>Scoring system: {scoringSystem}</h3>
      <h3>Matches:</h3>
      {matchesToPrintParts?.map((item) => (
        <h4>{item}</h4>
      ))}
      <h3>Results:</h3>
      {resultsToPrintParts?.map((item) => (
        <h4>{item}</h4>
      ))}
      <button onClick={() => navigate("/")}>Create new competition</button>
    </div>
  );
};

export default Results;
