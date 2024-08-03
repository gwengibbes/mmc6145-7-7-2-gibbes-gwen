import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from "../components/header";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
      const user = req.session.user;
      const props = {};
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
  
export default function bucketList(props) {
    return(
        <>
        <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username}/>
<main>
<div className={styles.container}>
 <h1>Hey there, Welcome to the Details Page.</h1>
  <section className={styles.jumbo}>
    <Image src="/food.jpg" className={styles.foodImg} alt="food on a table" width="1200" height="900"/>
    <p>Find a destination. Research more about it here.<em></em></p>
  </section>
</div>
<section className={styles.goSearch}>
  <p>Add this destination to your Bucket List.</p>
  <Link href="/search" className="button">Search For a Destination</Link>
</section>
</main>
</>
    )}