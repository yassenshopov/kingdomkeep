import home from "./styles/css/home.module.css";
import Nav from "./components/nav";
import Hexagon from "./components/hexagon";
import Head from "next/head";

export default function Home() {
  const fieldWidth = 1000;
  const fieldHeight = 600;
  const hexSize = 50;
  const numRows = Math.ceil(fieldHeight / (hexSize * Math.sqrt(3)));
  const numCols = Math.ceil(fieldWidth / (hexSize * 1.5));

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
                  className={Math.random() > 0.5 ? home.water : home.land}
                />
              );
            })
          )}
        </svg>
      </main>
    </>
  );
}
