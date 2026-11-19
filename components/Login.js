import { useState } from "react";
import SignUp from "./SignUp";
import styles from "../styles/Login.module.css";

function Login() {
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.left}></div>

      <div className={styles.right}>
        <h1>
          See what’s
          <br />
          happening
        </h1>

        <h2>Join Hackatweet today.</h2>

        <button
          className={styles.signUpButton}
          onClick={() => setSignUpOpen(true)}
        >
          Sign up
        </button>

        <p>Already have an account?</p>

        <button className={styles.signInButton}>Sign in</button>
      </div>

      {isSignUpOpen && (
        <div className={styles.overlay}>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label="Inscription"
          >
            <button
              className={styles.closeButton}
              aria-label="Fermer"
              onClick={() => setSignUpOpen(false)}
            >
              ×
            </button>

            <SignUp />
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
