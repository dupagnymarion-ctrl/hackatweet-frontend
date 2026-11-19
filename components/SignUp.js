import { useState } from "react";
import styles from "../styles/SignUp.module.css";
function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    console.log("inscription demandée", firstname, username);
  };
  return (
    <div className={styles.container}>
      <h2>Create your Hackatweet account</h2>

      <input
        type="text"
        placeholder="Firstname"
        value={firstname}
        onChange={(event) => setFirstname(event.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button onClick={handleSignUp}>Sign up</button>
    </div>
  );
}
export default SignUp;
