import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Header from "../components/header";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import Destination from '../components/destination';
import { getDestinations,addToList } from '../db/controllers/list';
import {Button, Row, Col, Container} from 'react-bootstrap';
import { useRouter } from "next/router"


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
  const router = useRouter()
  async function removeFromList (activityId){
    const response = await fetch (`/api/list/visited`, {
      method:"DELETE", 
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        destinationId:activityId
      })
    })
    //To refresh the page
    if (response.status === 200){
      router.replace(router.asPath)
    }
  }
    return(
        <>
        <Head>
        <title>Your Visited List | Travel Made Easy</title>
        <meta name="description" content="Places You Have Visited" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
{/* Render the header property to show the head on the visited list page */}
        <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username}/>
<main>
<div className={styles.container}>
 <h1>You have {props.destinations.length} destinations on your visited list</h1>
 <Container>
          <Row>
            <Col>
            <Row>
    {props.destinations.map((destination,i) => (<Col key={i} xs={12} sm={12} md={6} className='mb-4'><Destination destination={destination}/>
    <Button onClick={ev => {removeFromList(destination.id)}}>Remove from Visited</Button>
    </Col>))}
 </Row>
            </Col>
          </Row>
        </Container>
  <section className={styles.jumbo}>
    <p>Find a destination, save it here.<em></em></p>
  </section>
</div>
<section className={styles.goSearch}>
  <p>Why don&apos;t you go ahead and save a destination to your visited list?</p>
  <Link href="/" className="button">Search For a Destination</Link>
</section>
</main>
</>
    )}