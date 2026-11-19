import { useState } from "react";
import styles from "../styles/SignUp.module.css";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log("connexion demandée", username);
  };

  return (
    <div className={styles.container}>
      <h2>Connect to Hackatweet</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button onClick={handleSignIn}>Sign in</button>
    </div>
  );
}

export default SignIn;
