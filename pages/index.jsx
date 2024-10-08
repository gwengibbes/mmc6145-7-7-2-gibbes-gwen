import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import useLogout from "../hooks/useLogout";
import DestinationSearch from "../components/destination/search";
import searchableLocations from '../config/searchable-locations'

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const props = {};
    //This will display the list of countries the user can choose to search. 
    props.locations=searchableLocations;
    if (user) {
      props.user = req.session.user;
      props.isLoggedIn = true;
    } else {
      props.isLoggedIn = false;
    }
    return { props };
  },
  sessionOptions
);

export default function Home(props) {
  const router = useRouter();
  const logout = useLogout();
  return (
    <div className={styles.container}>
      <Head>
        <title>Travel Made Easy</title>
        <meta name="description" content="Find a destination. Research it. Start your journey here!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Travel Made Easy!
        </h1>

        <p className={styles.description}>
          <br />
          Status:{" "}
            {!props.isLoggedIn && " Not"} Logged In
        </p>
        <DestinationSearch locations={props.locations}/>

        <div className={styles.grid}>
          {props.isLoggedIn ? (
            <>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.card}>
                <h2>Login &rarr;</h2>
                <p>Visit the login page.</p>
              </Link>

              <Link href="/signup" className={styles.card}>
                <h2>Create Account &rarr;</h2>
                <p>Create an account.</p>
              </Link>
            </>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
       Travel Made Easy 
      </footer>
    </div>
  );
}
