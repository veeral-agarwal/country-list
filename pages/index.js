// https://restcountries.eu/rest/v2/all

import Head from 'next/head'
import Link from 'next/link'
import {useState} from 'react'
import { Button } from 'react-bootstrap';


const defaultEndpoint = 'https://restcountries.eu/rest/v2/all'

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}

function Time(x) {
  let d = new Date();
  let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  let nd = new Date(utc + (3600000 * x));
  return nd.toLocaleString();
}

export default function Home({data}) {
  
  var results = data;
  const defaultresults = data;
  

  const [new_data, setnew_data] = useState(results)
  function handleChange(e) {
    if(e.target.value === "") {
      setnew_data(results)
    }
    else {
      const a = results.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
      setnew_data(a)
    }
    console.log(new_data)
    console.log(e.target.value)
  };

  return (
    <div className="container">
      <Head>
        <title>Countries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
        Countries
        </h1>


        <form className="search" >
          <input className="search" onChange={handleChange} type="text"/>
          {/* <input onChange={handleChange}​​​ type="text"/> */}
          {/* <button>search</button> */}
        </form>

        {console.log(new_data)}
        <ul className="grid">
          {new_data.map(result => {
            const { alpha3code, name, flag, currencies, timezones} = result;
            
            return (
              <li  key={alpha3code} style={{border: "2px solid lightgray"}} >
                {/* <Link href="./country/${alpha3code}" > */}
                <div>
                  <div>
                    <div>
                      <table cellspacing="20">
                        <tr>
                          <td>
                            <table>
                              <tr  Padding="10px 10px 10px 10px">
                                <img width="450" height="270" className="flagsize" src={flag} alt={`${name}`}></img>          
                              </tr>        
                            </table>
                          </td>
                          <td>
                            <table>
                              <tr>
                                <h3>{name}</h3>          
                              </tr>
                              <tr>
                                <p>currency: {currencies[0]["name"]}</p>          
                              </tr>
                              <tr>
                                <p>current date and time: {Time(timezones[0].slice(3).replace(":", "."))}</p>          
                              </tr>
                              <tr>
                                <td >
                                  <Link href={`https://www.google.com/maps/place/${result.name}`}>
                                    <a target="_blank">
                                      <button className="buttons button2">
                                        <h2>Show Map</h2>
                                      </button>
                                      
                                    </a>
                                  </Link>  
                                </td>
                                <td>
                                  <Link href={`/country/${result.alpha3Code}`}>
                                    <a target="_blank">
                                      <button className="buttons button2">
                                        <h2>Details</h2>
                                      </button>
                                    </a>
                                  </Link>
                                </td>  
                              </tr>        
                            </table>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
            </li>
            )

          })}
        </ul>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>

      <style jsx>{`

        .buttons {
          margin: 4px 2px;
          background-color: white; Green
          border: 5px solid #4CAF50; 
          color: blue;
          padding: 1px 30px;
          text-align: center;
          text-decoration: none;

          font-size: 14px;
        }

        .button2 {
          background-color: white; 
          color: blue; 
          border: 5px solid ;
          width: 200px
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .show {
          width:"100%";
          height:"auto";
          borderRadius:"0";
          fontSize: "calc(60% + 0.5vw + 0.5vh)";
          border: "2px solid";
          marginBottom: "2%"
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .search {
          width: "100%";
          padding: "2%";
          border: "2px solid lightgray";
          fontSize: "calc(70% + 0.6vw + 0.6vh)";
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          grid-row-gap: 30px;

          max-width: 1100px;
          margin-top: 1rem;
          grid-gap = 20px;
          list-style:none;
          margin-left: 0;
          margin-top: 15px;
          /* padding-left: 0;
          padding-top: 10; */
          Padding: 10px,10px,10px,10px;
        }

        .flagsize {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          Padding: 10px,10px,10px,10px;
          max-width: 1200px;
          margin-top: 3rem;
          border: 1px solid #555;
        }

        .card {
          border: "2px solid lightgray"
          margin: 1rem;
          flex-basis: 95%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 5px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.35s ease;
        }

        .card1 {
          margin: 1rem;
          flex-basis: 95%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          /* text-decoration: none; */
          border: 1px solid #eaeaea;
          border-radius: 20px;
          /* transition: color 0.15s ease, border-color 0.15s ease; */
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
