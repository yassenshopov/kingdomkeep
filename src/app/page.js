"use client";
import home from "./styles/css/home.module.css";
import Nav from "./components/nav";
import Hexagon from "./components/hexagon";
import { useEffect } from "react";

export default function Home() {
  const fieldWidth = 660;
  const fieldHeight = 480;
  const hexSize = 30;
  const numRows = Math.ceil(fieldHeight / (hexSize * Math.sqrt(3)));
  const numCols = Math.ceil(fieldWidth / (hexSize * 1.5));

  // Generate the castle coordinates
  const castleX = Math.floor(Math.random() * numCols);
  const castleY = Math.floor(Math.random() * numRows);

  // Select the castle hexagon
  const castleIndex = castleY * numCols + castleX;
  useEffect(() => {
    document.getElementById(`hexagon_${castleIndex}`).classList.add(home.castle);
    // get surrounding hexagons and add class land
    const surroundingHexagons = [
      castleIndex - numCols,
      castleIndex - 1,
      castleIndex + 1,
      castleIndex + numCols - 1,
      castleIndex + numCols,
      castleIndex + numCols + 1,
    ];
    surroundingHexagons.forEach((index) => {
      if (index >= 0 && index < numRows * numCols) {
        console.log('surrounding hexagon', index, surroundingHexagons);
        //remove water class
        document.getElementById(`hexagon_${index}`).classList.remove(home.water);
        document.getElementById(`hexagon_${index}`).classList.add(home.land);
      }
    });
    //every half second, add a new land hexagon
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * numRows * numCols);
      document.getElementById(`hexagon_${randomIndex}`).classList.remove(home.water);
      document.getElementById(`hexagon_${randomIndex}`).classList.add(home.land);
    }, 100);
  } , [castleIndex]);

  return (
    <>
      <Nav />
      <main className={home.main}>
        <h1 className={home.title}>Welcome to Kingdom Keep!</h1>
        <svg width={fieldWidth} height={fieldHeight} className={home.gameField}>
          {Array.from({ length: numRows }, (_, rowIndex) =>
            Array.from({ length: numCols }, (_, colIndex) => {
              const x = colIndex * (hexSize * 1.5);
              const y =
                rowIndex * (hexSize * Math.sqrt(3)) +
                (colIndex % 2 === 1 ? (hexSize * Math.sqrt(3)) / 2 : 0);
              return (
                <Hexagon
                  key={`${rowIndex}-${colIndex}`}
                  x={x}
                  y={y}
                  size={hexSize}
                  // className={(Math.random() > 0.8 ? home.water : home.land) + (castleIndex === rowIndex * numCols + colIndex ? ` ${home.castle}` : "")}
                  // className={home.water}
                  // if it is a border hexagon, add a class
                  className={(rowIndex === 0 || rowIndex === numRows - 1 || colIndex === 0 || colIndex === numCols - 1) ? home.border : home.water}
                  index={rowIndex * numCols + colIndex}
                />
              );
            })
          )}
        </svg>
      </main>
    </>
  );
}
