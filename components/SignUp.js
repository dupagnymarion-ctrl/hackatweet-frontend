"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../styles/SignUp.module.css";

import { useRouter } from "next/router";
import { login } from "../reducers/user";

function SignUp() {
  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const router = useRouter();
  const handleSignUp = () => {
    setError("");

    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: firstname,
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
              firstname: firstname,
              username: username,
            }),
          );

          router.push("/tweet");
        } else {
          setError(data.error);
        }
      })
      .catch(() => {
        setError("Impossible de contacter le serveur.");
      });
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
