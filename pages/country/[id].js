import Head from 'next/head'
import { useRouter } from 'next/router'

const defaultEndpoint = 'https://restcountries.eu/rest/v2/all'

export async function getServerSideProps({query}) {
  const {id} = query
  console.log(id)
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  var i, data1;
  for(i=0 ; i<data.length ;i++ ) {
    if(data[i]["alpha3code"] === query) {
      console.log(data[i]["alpha3code"])
      data1 = data[i]
      break;
    }
  }
  return {
    props: {
      data
    }
  }
}



export default function Country({data}) {
  console.log(data)

  const router = useRouter()
  console.log(router["query"]["id"])
  var countr = {};
  var neigh;
  var id = router["query"]["id"];
  var languages = []
  var timezones = []
  for(var i = 0; i<data.length ; i++) {
    if(data[i].alpha3Code === id) {
      countr = data[i]
      
      break
    }
  }
  neigh = countr.borders
  
  var neighbours_flag = []
  for(var i = 0; i<data.length ; i++) {
    for(var j=0 ; j<neigh.length ; j++) {
      if(neigh[j] === data[i].alpha3Code) {
        neighbours_flag.push(data[i].flag)
      }
    }
  }
  for(var i =0; i<countr["languages"].length ; i++) {
    languages.push(countr["languages"][i]["name"])
  }
  for(var i =0; i<countr["timezones"].length ; i++) {
    timezones.push(countr["timezones"][i])
  }

  var language_string = ""
  for(var i=0 ; i<languages.length-1 ; i++) {
    language_string += languages[i]
    language_string += ", "
  }
  if(languages.length >1) {
    language_string += "and "
  }
  language_string += languages[languages.length-1]
  

  var timezones_string = ""
  for(var i=0 ; i<timezones.length-1 ; i++) {
    timezones_string += timezones[i]
    timezones_string += ", "
  }
  if(timezones.length >1) {
    timezones_string += "and "
  }
  timezones_string += timezones[timezones.length-1]
  console.log(neighbours_flag)

  return (
    <div className="container">
      <Head>
        <title>Countries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <table>
            <tr>
              <td>
                <h1>
                  {countr.name}
                </h1>
              </td>
            </tr>
            <tr>
              <td>
                <img className="flagsize" width="500" height="300" src={countr.flag} alt={`${countr.name}`}></img> 
              </td>
              <td>
                <table>
                  <tr>
                    <p>
                      Native Name: {countr.nativeName}
                    </p>
                  </tr>
                  <tr>
                    <p>
                      Capital: {countr.capital}
                    </p>
                  </tr>
                  <tr>
                    <p>
                      Population: {countr.population} 
                    </p>
                  </tr>
                  <tr>
                    <p>
                      Region: {countr.region}
                    </p>
                  </tr>
                  <tr>
                    <p>
                      Sub-Region: {countr.subregion}
                    </p>
                  </tr>
                  <tr>
                    <p>
                      Area: {countr.area} Km sq.
                    </p>
                  </tr>
                  <tr>
                    <p>
                      Country code: +{countr.callingCodes}
                    </p>
                  </tr>
                  <tr>
                    <p>
                      Languages: {language_string}
                    </p>
                  </tr>
                  <tr>
                    <p>
                      Currencies: {countr.currencies[0]["name"]}
                    </p>
                  </tr>
                  <tr>
                    <p>
                      Timezones: {timezones_string}
                    </p>
                  </tr>
                </table>
              </td>
            </tr>
            <tr className="card">
              <div>
                <h1>neighbour countries</h1>
                <ul className="grid">
                  {neighbours_flag.map(flag => {
                    return (
                      <img className="flagsize" src={flag} width="500" height="200"></img>         
                    )
                  })}
                </ul>
              </div>
            </tr>
          </table>
        </div>
      </main>

      <style jsx>{`
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

        .flagsize {
          border: 1px solid #555;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 2000px;
          margin-top: 3rem;

          list-style:none;
          margin-left: 0;
          padding-left: 0;
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

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          grid-column-gap: 50px;

          max-width: 1000px;
          margin-top: 3rem;

          list-style:none;
          margin-left: 0;
          padding-left: 0;
        }

        .flagsize {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 300px;
          margin-top: 3rem;

          list-style:none;
          margin-left: 0;
          padding-left: 0;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
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
