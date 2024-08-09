import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { useState } from 'react'
import Destination from '.';
import {Button, Row, Col, Container} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function DestinationSearch(props) {
  const [selectedLocation, setSelectedLocation]=useState(props.locations[0].id)
  const [activities, setActivities]=useState([])
  const [isLoadingResults, setIsLoadingResults]=useState(false)

  async function performSearch (ev){
    //Sets a state variable indicating that it is performing an API call to retrieve results. 
    setIsLoadingResults(true)
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
    //Updating to state that the API call is complete and the results have been loaded. 
    setIsLoadingResults(false)
  }

  function locationChanged (ev){
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
  //Show the instructions only where there are no activities on page. 
  let instructions 
  if (activities.length===0){
    instructions =  <section className={styles.jumbo}>
        <p>Why don&apos;t you go ahead and find a destination on your bucket list?</p>
      <p>Find a destination. Research it. Start your journey here.<em></em></p>
        <Image src="/images/beach.jpg" className={styles.foodImg} alt="white sandy beach" width="450" height="200"/>
      </section>
  }
  //Show a loading text while we are waiting on the API to respond. 
  let loadingText
  if (isLoadingResults===true){
    loadingText = "Loading..."
  }
  return (
    <>
      <Head>
        <title>Travel Made Easy!</title>
        <meta name="description" content="Travel Made Easy is a travel made easy app." />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍴</text></svg>"/>
      </Head>
      <main>

        {instructions}

        <InputGroup className='mb-4'>
        <Form.Select size='lg' onChange={ev => {locationChanged(ev)}}>
          {props.locations.map(location =><option key={location.id} value={location.id}>{location.title}</option>)}
        </Form.Select>
        <Button variant='primary' onClick={ev => {performSearch(ev)}}>Search</Button>
        </InputGroup>
        {loadingText}
        {/* Displaying the search results.  */}
        <Container>
          <Row>
            <Col>
            <Row>
         {activities.map((activity,i) => (
          <Col key={i} xs={12} sm={12} md={6} className='mb-4'>
            <Destination destination={activity}/>
            <Row>
              <Col className='text-center'>
              <Button className='mr-4' onClick={ev => {addToBucketList(activity.id)}}>Add to Bucket List</Button>
              </Col>
              <Col className='text-center'>
              <Button onClick={ev => {addToVisitedList(activity.id)}}>Add to Visited List</Button> 
              </Col>
            </Row>
          </Col>))}
       </Row>
            </Col>
          </Row>
        </Container>
       
      </main>
    </>
  )
}
