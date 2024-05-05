"use client";
import home from "./styles/css/home.module.css";
import Nav from "./components/nav";
import Hexagon from "./components/hexagon";
import { useEffect } from "react";
import castle from "./images/castle.png";

export default function Home() {
  const fieldWidth = 1260;
  const fieldHeight = 580;
  const hexSize = 30;
  const numRows = Math.ceil(fieldHeight / (hexSize * Math.sqrt(3)));
  const numCols = Math.ceil(fieldWidth / (hexSize * 1.5));

  // Generate the castle coordinates, making sure it is not on the border
  const castleX = Math.floor(Math.random() * (numCols - 2)) + 1;
  const castleY = Math.floor(Math.random() * (numRows - 2)) + 1;

  // Select the castle hexagon
  const castleIndex = castleY * numCols + castleX;
  useEffect(() => {
    document
      .getElementById(`hexagon_${castleIndex}`)
      .classList.add(home.castle);
    // get surrounding hexagons and add class land

    //check if the hexagon is on the upside of a row ridge or the downside
    //if it is on the upside, the surrounding hexagons are:
    // 1. the hexagon on the left
    // 2. the hexagon on the right
    // 3. the hexagon on the bottom left
    // 4. the hexagon on the bottom right
    //if it is on the downside, the surrounding hexagons are:
    // 1. the hexagon on the left
    // 2. the hexagon on the right
    // 3. the hexagon on the top left
    // 4. the hexagon on the top right

    let surroundingHexagons = [];
    console.log(castleX, castleX % 2 === 0)
    if (castleX % 2 === 0) {
      console.log("castle is on the upside");
      surroundingHexagons = [
        castleIndex - 1,
        castleIndex + numCols,
        castleIndex + 1,
        castleIndex - numCols - 1,
        castleIndex - numCols,
        castleIndex - numCols + 1,
        // Outer circle
        castleIndex - 2,
        castleIndex + 2,
        castleIndex - numCols - 2,
        castleIndex - numCols + 2,
        castleIndex + numCols - 2,
        castleIndex + numCols + 2,
        castleIndex + numCols - 1,
        castleIndex + numCols + 1,
        castleIndex - 2*numCols - 1,
        castleIndex - 2*numCols + 1,
        castleIndex - 2*numCols,
        castleIndex + 2*numCols,
      ];
    } else {
      console.log("castle is on the downside");
      surroundingHexagons = [
        castleIndex - 1,
        castleIndex - numCols,
        castleIndex + 1,
        castleIndex + numCols,
        castleIndex + numCols - 1,
        castleIndex + numCols + 1,
        // Outer circle
        castleIndex - 2,
        castleIndex + 2,
        castleIndex - numCols - 1,
        castleIndex - numCols + 1,
        castleIndex + numCols - 2,
        castleIndex + numCols + 2,
        castleIndex - numCols - 2,
        castleIndex - numCols + 2,
        castleIndex + 2*numCols - 1,
        castleIndex + 2*numCols + 1,
        castleIndex - 2*numCols,
        castleIndex + 2*numCols,
      ];
    }
    surroundingHexagons.forEach((index) => {
      if (index >= 0 && index < numRows * numCols) {
        console.log("surrounding hexagon", index, surroundingHexagons);
        //remove water class
        document
          .getElementById(`hexagon_${index}`)
          .classList.remove(home.water);
        document.getElementById(`hexagon_${index}`).classList.add(home.land);
      }
    });
    //every half second, add a new land hexagon
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * numRows * numCols);
      document
        .getElementById(`hexagon_${randomIndex}`)
        .classList.remove(home.water);
      document
        .getElementById(`hexagon_${randomIndex}`)
        .classList.add(home.land);
    }, 500);

    //set class corner for first and last hexagons
    document.getElementById(`hexagon_0`).classList.add(home.corner);
    document
      .getElementById(`hexagon_${numCols * numRows - 1}`)
      .classList.add(home.corner);

    // add castle png to the castle hexagon, but not by appending a child, but by creating an image element and adding it to the correct position
    const castleImage = new Image();
    castleImage.src = castle.src;
    castleImage.width = hexSize * 2;
    castleImage.height = hexSize * 2;
    castleImage.style.position = "absolute";
    castleImage.style.left = `${castleX * (hexSize * 1.5)}px`;
    castleImage.style.top = `${
      castleY * (1.01 * hexSize * Math.sqrt(3)) - 0.5 * hexSize
    }px`;
    castleImage.style.pointerEvents = "none";
    document.getElementById("gameFieldContainer").appendChild(castleImage);
  }, [castleIndex]);

  return (
    <>
      <Nav />
      <main className={home.main}>
        <h1 className={home.title}>Welcome to Kingdom Keep!</h1>
        <div className={home.gameFieldContainer} id="gameFieldContainer">
          <svg
            width={fieldWidth}
            height={fieldHeight}
            className={home.gameField}
          >
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
                    className={
                      rowIndex === 0 ||
                      rowIndex === numRows - 1 ||
                      colIndex === 0 ||
                      colIndex === numCols - 1
                        ? home.border
                        : home.water
                    }
                    index={rowIndex * numCols + colIndex}
                  />
                );
              })
            )}
          </svg>
        </div>
      </main>
    </>
  );
}
