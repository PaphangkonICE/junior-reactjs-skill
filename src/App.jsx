import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

//components import
import FavPoke from './components/FavPoke'

function App() {

  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, SetFav] = useState([]);

  useEffect(() => {

    let abortController = new AbortController();

    const loadPoke =  async () => {
      try {


      let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`, {
        signal: abortController.signal
      });

      setPoke(response.data);
      setError("");

      } catch(error){
        setError("Someting went wrong", error);
      } finally {
        setLoading(false);
      }
    }

    loadPoke();

    return () => abortController.abort();

  }, [number])


  const nextPoke = () =>  {
    setNumber((number) => number + 1);
  }

  const prevPoke = () =>  {
    setNumber((number) => number - 1);
  }

  const addFav = () => {
    SetFav((oldState) => [...oldState, poke]);
  }
  console.log(poke);
  console.log("Your fav Pofemon", fav)

  return (
    <div className='max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
        <div>
          {loading ? <p><Loading className=""></Loading></p> 
          : 
          <>
            <h1>{poke.name}</h1>
            <button onClick={addFav}>Add to faverion</button>
            <br />
            <img src={poke?.sprites?.other.home.front_default} alt={poke?.name} />
            <ul>
              {poke?.abilities?.map((abil, idx) => (
                <li key={idx}>{abil.ability.name}</li>
                ))}
            </ul>
            <button onClick={prevPoke}>Previous</button>
            <button onClick={nextPoke}>Next</button>

          </>
          }
          
        </div>

        <div>
          <h2>Your Favourite pokemon</h2>

          <FavPoke fav={fav}></FavPoke>
        </div>

      </div>
    </div>
  )
}

export default App
