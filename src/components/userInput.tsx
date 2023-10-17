import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserInput = () => {
  const [competitionName, setCompetitionName] = useState("Example Name");
  const [sport, setSport] = useState("football");
  const [scoringSystem, setScoringSystem] = useState("win/draw/loss");
  const [players, setPlayers] = useState<string[]>([]);

  const fourPlayers = ["1v2;3v4", "1v3;2v4", "1v4;2v3"];
  const fivePlayers = [
    "1v2;3v4;5vb",
    "1v3;2v5;4vb",
    "1v4;5v3;2vb",
    "1v5;2v4;3vb",
    "2v3;4v5;1vb",
  ];
  const sixPlayers = [
    "1v2;3v4;5v6",
    "1v3;2v5;4v6",
    "1v4;2v6;3v5",
    "1v5;2v4;3v6",
    "1v6;2v3;4v5",
  ];
  const sevenPlayers = [
    "1v2;3v4;5v6;7vb",
    "1v3;2v7;4v6;5vb",
    "1v4;2v5;3v7;6vb",
    "1v5;2v6;3v4;7vb",
    "1v6;2v4;3v5;7vb",
    "1v7;2v3;4v5;6vb",
  ];
  const eightPlayers = [
    "1v2;3v4;5v6;7v8",
    "1v3;2v4;5v7;6v8",
    "1v4;2v5;3v8;6v7",
    "1v5;2v6;3v7;4v8",
    "1v6;2v7;3v5;4v8",
    "1v7;2v8;3v6;4v5",
    "1v8;2v3;4v6;5v7",
  ];

  const roundsByNumberOfPlayers = [
    fourPlayers,
    fivePlayers,
    sixPlayers,
    sevenPlayers,
    eightPlayers,
  ];

  const handleChange = (value: string) => {
    setPlayers(value.replace(/\n/g, ";").split(";"));
  };

  const [matchesStrings, setMatchesStrings] = useState([""]);

  useEffect(() => {
    // console.log(players);
    // console.log(competitionName);
    // console.log(sport);
    // console.log(scoringSystem);
    // for (let i = 0; i < sevenPlayers.length; i++) {
    //   console.log("Round " + i);
    //   let strings = sevenPlayers[i].split(";");
    //   for (let j = 0; j < strings.length; j++) {
    //     if (strings[j][2] === "b")
    //       console.log(players[parseInt(strings[j][0]) - 1] + " has bye");
    //     else
    //       console.log(
    //         players[parseInt(strings[j][0]) - 1] +
    //           " vs " +
    //           players[parseInt(strings[j][2]) - 1]
    //       );
    //   }
    // }
  }, [players, competitionName, sport, scoringSystem]);

  const generateSchedule = () => {
    const temp = [];
    for (
      let i = 0;
      i < roundsByNumberOfPlayers[players.length - 4].length;
      i++
    ) {
      temp.push(`Round ${i + 1}`);
      let strings = roundsByNumberOfPlayers[players.length - 4][i].split(";");
      for (let j = 0; j < strings.length; j++) {
        if (strings[j][2] === "b")
          temp.push(players[parseInt(strings[j][0]) - 1] + " has bye");
        else
          temp.push(
            players[parseInt(strings[j][0]) - 1] +
              " vs " +
              players[parseInt(strings[j][2]) - 1]
          );
      }
    }
    setMatchesStrings(temp);
  };

  const matchesStringsThatHaveInput = matchesStrings.filter((value) =>
    value.includes(" vs ")
  );

  const [inputValues, setInputValues] = useState(
    matchesStringsThatHaveInput.map(() => "0:0")
  );

  let j = -1;

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    if (/^\d+:\d+$/.test(inputValue)) {
      const values = [...inputValues];
      values[index] = inputValue;
      setInputValues(values);
    }
  };

  // useEffect(() => {
  //   console.log(matchesStringsThatHaveInput);
  //   console.log(inputValues);
  //   console.log(inputValues.length);
  //   console.log(inputValues.length != matchesStringsThatHaveInput.length);
  // }, [inputValues]);

  const navigate = useNavigate();

  const generateScore = () => {
    const wins = new Map();
    const loses = new Map();
    const tied = new Map();

    for (let j = 0; j < players.length; j++) {
      wins.set(players[j], 0);
      loses.set(players[j], 0);
      tied.set(players[j], 0);
    }

    for (let i = 0; i < matchesStringsThatHaveInput.length; i++) {
      const partsOfString = matchesStringsThatHaveInput[i].split(" vs ");
      if (parseInt(inputValues[i][0]) > parseInt(inputValues[i][2])) {
        wins.set(partsOfString[0], wins.get(partsOfString[0]) + 1);
        loses.set(partsOfString[1], loses.get(partsOfString[1]) + 1);
      } else if (parseInt(inputValues[i][0]) < parseInt(inputValues[i][2])) {
        wins.set(partsOfString[1], wins.get(partsOfString[1]) + 1);
        loses.set(partsOfString[0], loses.get(partsOfString[0]) + 1);
      } else {
        tied.set(partsOfString[1], tied.get(partsOfString[1]) + 1);
        tied.set(partsOfString[0], tied.get(partsOfString[0]) + 1);
      }
    }

    let matchesToPrint = "";
    let resultsToPrint = "";

    for (let i = 0; i < matchesStringsThatHaveInput.length; i++) {
      //console.log(matchesStringsThatHaveInput[i] + " -> " + inputValues[i]);
      matchesToPrint +=
        matchesStringsThatHaveInput[i] + " -> " + inputValues[i] + "*";
    }

    for (let j = 0; j < players.length; j++) {
      // console.log(
      //   players[j] +
      //     ": " +
      //     wins.get(players[j]) +
      //     " " +
      //     loses.get(players[j]) +
      //     " " +
      //     tied.get(players[j])
      // );
      if (scoringSystem === "win/draw/loss")
        resultsToPrint +=
          players[j] +
          ": " +
          wins.get(players[j]) +
          "/" +
          tied.get(players[j]) +
          "/" +
          loses.get(players[j]) +
          "*";
      else {
        resultsToPrint +=
          players[j] +
          ": " +
          wins.get(players[j]) +
          "/" +
          loses.get(players[j]) +
          "*";
      }
    }
    navigate(
      `/results?matchesToPrint=${matchesToPrint}&resultsToPrint=${resultsToPrint}&competitionName=${competitionName}&sport=${sport}&scoringSystem=${scoringSystem}`
    );
  };

  return (
    <div className="userInputContainer">
      <h2>Name of the competition:</h2>
      <input
        type="text"
        onChange={(e) => setCompetitionName(e.target.value)}
        placeholder="Example Name"
      />
      <h2>Choose sport:</h2>
      <select name="sports" onChange={(e) => setSport(e.target.value)}>
        <option value="football" selected>
          Football
        </option>
        <option value="basketball">Basketball</option>
        <option value="chess">Chess</option>
      </select>
      <h2>Scoring system:</h2>
      <select onChange={(e) => setScoringSystem(e.target.value)}>
        <option value="win/draw/loss" selected>
          win/draw/loss
        </option>
        <option value="win/loss">win/loss</option>
      </select>
      <h2>Players:</h2>
      {(players.length < 4 || players.length > 8) && (
        <p className="playersLabelDesc">
          4-8, separate them with ";" or new line
        </p>
      )}
      <textarea
        cols={30}
        rows={10}
        onChange={(e) => handleChange(e.target.value)}
      ></textarea>
      <button
        className="generateBtn"
        disabled={players.length < 4 || players.length > 8}
        onClick={generateSchedule}
      >
        Generate schedule
      </button>
      {matchesStrings &&
        matchesStrings.map((item, i) => {
          let index = -1;
          if (item.includes(" vs ")) {
            j++;
            index = j;
          }

          return (
            <div key={i}>
              <p>{item}</p>
              {index !== -1 && (
                <div>
                  <input
                    type="text"
                    placeholder="0:0"
                    value={inputValues[index]}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  <p className="inputRule">
                    Input values must have same format as shown as placeholder,
                    after inserting value you can stil edit it but each number
                    must stay all the time. For example, if you want to change
                    1:0 to 0:0 first write 0 then delete 1: 1:0 then 01:0 then
                    0:0.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      {inputValues.length === matchesStringsThatHaveInput.length &&
        matchesStrings.length > 1 && (
          <button
            className="generateBtn"
            disabled={inputValues.length != matchesStringsThatHaveInput.length}
            onClick={generateScore}
          >
            Generate score
          </button>
        )}
    </div>
  );
};

export default UserInput;
