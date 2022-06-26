import type { NextPage } from "next";
import Main from "../app/components/Main/Main";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Datasub test task</h1>
        <Main />
      </main>
    </div>
  );
};

export default Home;
