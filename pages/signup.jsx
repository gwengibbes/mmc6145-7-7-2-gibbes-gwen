import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Signup(props) {
  const router = useRouter();
  const [
    { username, password, "confirm-password": confirmPassword },
    setForm,
  ] = useState({
    username: "",
    password: "",
    "confirm-password": "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      username,
      password,
      "confirm-password": confirmPassword,
      ...{ [e.target.name]: e.target.value.trim() },
    });
  }
  async function handleCreateAccount(e) {
    e.preventDefault();
    if (!username) return setError("Must include username");
    if (password !== confirmPassword) return setError("Passwords must Match");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (res.status === 200) return router.push("/dashboard");
      const { error: message } = await res.json();
      setError(message);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Sign Up | Travel Made Easy</title>
        <meta name="description" content="Create Your Account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Travel Made Easy Login Page!
        </h1>

        <p className={styles.description}>
          Status:{" "}
          <code>
            {!props.isLoggedIn && " Not"} Logged In
          </code>
        </p>

        <form
          className={[styles.card, styles.form].join(" ")}
          onSubmit={handleCreateAccount}
        >
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={username}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={password}
          />
          <label htmlFor="confirm-password">Confirm Password: </label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            onChange={handleChange}
            value={confirmPassword}
          />
          <button>Submit</button>
          {error && <p>{error}</p>}
        </form>
        <Link href="/login">
          <p>Login instead?</p>
        </Link>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
