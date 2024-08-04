import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from "../components/header";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import Destination from '../components/destination';
import { getDestinations,addToList } from '../db/controllers/list';


/**
 * Get the visited list items for the specified user.
 */
async function getVisitedListItems({user}) {
    return await getDestinations("visited", user)
}
export const getServerSideProps = withIronSessionSsr(

    async function getServerSideProps({ req }) {
      const user = req.session.user;
      const props = {};
      if (user) {
        props.user = req.session.user;
        props.isLoggedIn = true;
        //Setting the destinations for the user on the component property
        props.destinations = await getVisitedListItems({user})
      } else {
        props.isLoggedIn = false;
      }
      return { props };
    },
    sessionOptions
  );

export default function VisitedList(props) {
    return(
        <>
{/* Render the header property to show the head on the visited list page */}
        <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username}/>
<main>
<div className={styles.container}>
 <h1>You have {props.destinations.length} destinations on your visited list</h1>
 <ul>
    {props.destinations.map((destination,i) => (<li key={i}><Destination destination={destination}/></li>))}
 </ul>
  <section className={styles.jumbo}>
    <p>Find a destination, save it here.<em></em></p>
  </section>
</div>
<section className={styles.goSearch}>
  <p>Why don't you go ahead and save a destination to your visited list?</p>
  <Link href="/search" className="button">Search For a Destination</Link>
</section>
</main>
</>
    )}