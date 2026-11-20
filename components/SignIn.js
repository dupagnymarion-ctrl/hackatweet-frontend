import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { login } from "../reducers/user";
import styles from "../styles/SignUp.module.css";

function SignIn() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = () => {
    setError("");

    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              token: data.token,
              firstname: null,
              username: username,
            }),
          );

          router.push("/tweet");
        } else {
          setError(data.error);
        }
      })
      .catch(() => {
        setError("Impossible de terminer la connexion.");
      });
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
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {error && <p>{error}</p>}

      <button onClick={handleSignIn}>Sign in</button>
    </div>
  );
}

export default SignIn;
