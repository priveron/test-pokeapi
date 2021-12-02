import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

interface Pokemon {
  name: string,
  img: string
}

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[] | []>([])

  useEffect(() => {
    axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=9")
    .then((APIResponse) => {
      // console.log(APIResponse)
      const pokemonsList = APIResponse.data.results
      const promises = pokemonsList.map((pokemon: {name: string, url: string}) => {
        return axios.get(pokemon.url).then((res) => res.data)
      })
      Promise.all(promises).then((data) => {
        // console.log(data)
        const pkmList = data.map(({name, sprites}: any) => ({name, img: sprites.front_default}))
        // console.log(pkmList);
        
        setPokemons(pkmList);
      })
    })
    .catch((error) => {
      console.error(error);
    })
  }, [])

  return (
    <div className="App">
      <p>PokeAPI Test</p>
      {!pokemons.length ? (
      <p>Loading...</p>
      ) : (
        <div className="pokemon-container">
          {pokemons.map((pkm, i) => (
            <div className="pokemon" key={i}>
              <h1>{pkm.name}</h1>
              <img src={pkm.img} alt={pkm.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
