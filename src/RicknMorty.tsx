import "./ricknmorty.css";
import axios from "axios";
import React, { useState } from "react";

const RicknMorty = () => {
  const id: number = 0;
  const status: string = "";
  const species: string = "";
  const gender: string = "";
  const name: string = "";
  const image: string = "";
  const [character, setCharacter] = useState({
    id,
    status,
    species,
    gender,
    name,
    image,
  });
  const [origin, setOrigin] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [idChar, setIdChar] = useState<string>("0");
  const [isActive, setIsActive] = useState<boolean>(false);
  // ddddda
  const fetchBtn = () => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${idChar}`)
      .then((res) => {
        console.log(res.data);
        setCharacter(res.data);
        setOrigin(`origin: ${res.data.origin.name}`);
        setLocation(`location: ${res.data.location.name}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsActive(true);
  };

  const renderCharInfo = () => {
    if (character.id == 0) {
      return <div></div>;
    } else {
      return `#${character.id}, ${character.status}, ${character.species}, ${character.gender}`;
    }
  };

  return (
    <div className="container">
      <div className="mainWrapper">
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={idChar}
            onChange={(e) => setIdChar(e.target.value)}
            min="1"
            max="826"
            className="input"
          />
          <button onClick={fetchBtn} className="btn">
            Fetch
          </button>
        </form>
        <div className="mainParagraph">
          <span>Which Rick and Morty Character?</span>
        </div>

        <div className="fetchData">
          <div className="imgContainer">
            {/* IMG could be imported from mui */}
            <img
              src={
                character.image
                  ? character.image
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMP0k85NZy2bExyNmtQaB4jwOZUcw9QzlXkw&usqp=CAU"
              }
              alt="an epic Rick and Morty character"
              className="imgCharacter"
              style={{
                border: isActive ? "1px solid" : "1px dotted",
              }}
            />
          </div>
          <div className="textContainer">
            <div className="characterName">
              {character.name ? character.name : "???"}
            </div>
            <div className="characterText">{renderCharInfo()}</div>
            <div className="characterText">{origin}</div>
            <div className="characterText">{location}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RicknMorty;
