
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from "../components/header";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import Destination from '../components/destination';
import { getDestinations,addToList } from '../db/controllers/list';

/**
 * get the bucket list items for the specified user.
 */
async function getBucketListItems({user}) {
    return await getDestinations("bucket", user)
    // return[
    //     {
    //         title: "Barbados Beach",
    //         summary: "A beautiful beach in Barbados",
    //         image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?cs=srgb&dl=pexels-asadphoto-457882.jpg&fm=jpg"
    //     },
    //     {
    //         title: "Trinidad Beach",
    //         summary: "A beautiful beach in Barbados",
    //         image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?cs=srgb&dl=pexels-asadphoto-457882.jpg&fm=jpg"
    //     }
    // ]
}
export const getServerSideProps = withIronSessionSsr(

    async function getServerSideProps({ req }) {
      const user = req.session.user;
      const props = {};
      if (user) {
        //addToList("bucket", user, "barbados")
        props.user = req.session.user;
        props.isLoggedIn = true;
        //setting the destinations for the user on the component property
        props.destinations = await getBucketListItems({user})
        console.log ("destination on props:", props.destinations)//
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
{/* render the header property to show the head on the bucket list page */}
        <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username}/>
<main>
<div className={styles.container}>
 <h1>You have {props.destinations.length} destinations on your bucket list</h1>
 <ul>
    {props.destinations.map((destination,i) => (<li key={i}><Destination destination={destination}/></li>))}
 </ul>
  <section className={styles.jumbo}>
    <p>Find a destination, save it here.<em></em></p>
  </section>
</div>
<section className={styles.goSearch}>
  <p>Why don't you go ahead and find a destination on your bucket list?</p>
  <Link href="/search" className="button">Search For a Destination</Link>
</section>
</main>
</>
    )}