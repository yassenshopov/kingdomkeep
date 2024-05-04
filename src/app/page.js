import Image from "next/image";
import mainStyles from "./styles/css/main.module.css";

export default function Home() {
  return (
    <main className={mainStyles.main}>
      <h1 className={mainStyles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

    </main>
  );
}
