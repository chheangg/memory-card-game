import React, {useState, useEffect} from 'react'
import uniqid from "uniqid";
import Card from "./utils/box-card"
import BoxGrid from "./utils/box-grids"

const Main = (props) => {
  const pokemons = ['charizard', 'charmander', 'pikachu', 'bulbasaur', 'eevee', 'squirtle', 'blastoise', 'snorlax'];
  const [pokemonList, setPokemonList] = useState(null);
  const shuffleList = (list) => {
    return list.sort(() => {
      return Math.random() < 0.5 ? -1 : 1
    })
  }
  // Fetch image and populate content
  useEffect(() => {
    // Fetch pokemon image from PokeAPI
    const fetchImage = async (name) => {
      const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokeInfo = await pokeData.json();
      const img = await pokeInfo.sprites.front_default;

      return img
    }

    // Configure pokemon on start
    const initializeState = pokemons.map((pokemon) => {
        return fetchImage(pokemon).then((img) => {
          return {
            name: pokemon,
            key: uniqid(),
            img,
          };
        })
      })
    Promise.all(initializeState).then((obj) => {
      setPokemonList(shuffleList(obj))
    })
  }, [])

  return (
    <main className='main-container'>
      <BoxGrid>
      { pokemonList ? pokemonList.map((pokemon) => {
          return <Card type={pokemon} key={pokemon.key} />
        }) : null}
      </BoxGrid>
    </main>
  )
}

export default Main