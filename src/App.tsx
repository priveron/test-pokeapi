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
    (async () => {
      try {
      const APIResponse = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=9")
      const pokemonAPIResults = APIResponse.data.results
      const pokemonArray: Pokemon[] = await Promise.all(pokemonAPIResults.map(async (pokemon: {name: string, url: string}) => {
        const pokemonResponse = await axios.get(pokemon.url)
        return {name: pokemonResponse.data.name, img: pokemonResponse.data.sprites.front_default}
      })) // Can replace Promise.all and add another state isLoaded to update pokemon independently on page
      setPokemons(pokemonArray);
    } catch (err) {
      console.error(err);
    }
  })(), []}
  )

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
