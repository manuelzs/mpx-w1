import styles from './page.module.css'

import GenerateToken from "@/components/GenerateToken";
import ValidateToken from "@/components/ValidateToken";

const Home = () => {
  return (
    <main className={styles.grid}>
      <div>
        <h2>Generate</h2>
        <GenerateToken />
      </div>
      <div>
        <h2>Validate</h2>
        <ValidateToken />
      </div>
    </main>
  );
}

export default Home
