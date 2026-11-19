import styles from '../styles/Home.module.css';

import Trends from './Trends';

function Home() {
  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
        </h1>
        <Trends />
      </main>
    </div>
  );
}

export default Home;
