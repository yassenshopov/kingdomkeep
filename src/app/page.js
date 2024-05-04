import home from "./styles/css/home.module.css";
import Nav from "./components/nav";
import Hexagon from "./components/hexagon";

export default function Home() {
  return (
    <>
      <Nav />
      <main className={home.main}>
        <h1 className={home.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <h1 className={home.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <h1 className={home.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <svg width="800" height="600">
          <Hexagon x={0} y={0} size={50} color="#fe4400" />
          <Hexagon x={76} y={44} size={50} color="#aa44ee" />
          {/* Add more Hexagon components as needed */}
        </svg>
      </main>
    </>
  );
}
