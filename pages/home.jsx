import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import Destination from '../components/destination';

export default function Home2(props) {
  const [selectedLocation, setSelectedLocation]=useState(props.locations[0].id)
  const [activities, setActivities]=useState([])

  async function performSearch (ev){
    console.log ('performing search for location:', selectedLocation)
    // To call the api to get the list of activities that the user can do in the selected location. 
    const response = await fetch (`/api/destinations?selectedLocation=${selectedLocation}`, {
      method:"GET", 
      headers: {
        "Content-Type": "application/json",
      }
    })
  
    //Storing the results to the state variable so they can be used in the user interface. 
    setActivities( await response.json())
    console.log ('activities for the selected location', activities)
  }

  function locationChanged (ev){
    console.log ('location changed to:', ev.target.value)
    //To get the value that the user chose by checking the event and the target. 
    setSelectedLocation(ev.target.value)
  }

  async function addToBucketList (activityId){
    const response = await fetch (`/api/list/bucket`, {
      method:"POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        destinationId:activityId
      })
    })
  }

  async function addToVisitedList (activityId){
    const response = await fetch (`/api/list/visited`, {
      method:"POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        destinationId:activityId
      })
    })
  }
  
  return (
    <>
      <Head>
        <title>Travel Made Easy!</title>
        <meta name="description" content="Travel Made Easy is a travel made easy app." />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍴</text></svg>"/>
      </Head>
      <main>
        <div className={styles.container}>
         <h1></h1>
          <section className={styles.jumbo}>
          <p>Find a destination. Research it here. Start your journey here.<em></em></p>
            <Image src="/images/beach.jpg" className={styles.foodImg} alt="white sandy beach" width="450" height="200"/>
          </section>
        </div>
        <section className={styles.goSearch}>
          <p>Why don't you go ahead and find a destination on your bucket list?</p>
          <Link href="/search" className="button">Search For a Destination</Link>
        </section>
        <select onChange={ev => {locationChanged(ev)}}>
          {props.locations.map(location =><option key={location.id} value={location.id}>{location.title}</option>)}
        </select>
        <button onClick={ev => {performSearch(ev)}}>Search</button>
        <ul>
         {activities.map((activity,i) => (
          <li key={i}>
            <Destination destination={activity}/>
            <button onClick={ev => {addToBucketList(activity.id)}}>Add to Bucket List</button>
            <button onClick={ev => {addToVisitedList(activity.id)}}>Add to Visited List</button> 
          </li>))}
       </ul>
      </main>
    </>
  )
}
