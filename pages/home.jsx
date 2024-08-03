import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home2() {
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
      </main>
    </>
  )
}
