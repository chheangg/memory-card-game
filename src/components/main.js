import React, {useState, useEffect} from 'react'
import uniqid from "uniqid";
import Card from "./utils/box-card"
import BoxGrid from "./utils/box-grids"

const Main = (props) => {
  const initialPokemons = ['charizard', 'charmander', 'pikachu', 'bulbasaur', 'eevee', 'squirtle', 'blastoise', 'snorlax']
  const [pokemons, setPokemons] = useState(initialPokemons);
  const [best, setBest] = useState(0);
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(null);
  const [clicked, setClicked] = useState([]);
  const [pokemonList, setPokemonList] = useState(null);

  // Randomize a list using a sort function with a randomize method in it
  const shuffleList = (list) => {
    return list
    .map((value) => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value)                
  }

  // Fetch pokemon image from PokeAPI
  const fetchImage = async (name) => {
    const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokeInfo = await pokeData.json();
    const img = await pokeInfo.sprites.front_default;

    return img
  }

  // Fetch image and populate content
  useEffect(() => {
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
  }, [pokemons])

  function pokemonClickEvent(box) {
    setPokemonList(shuffleList(pokemonList))
    setCurrent(box.currentTarget.dataset.pokemon)
    setScore(score + 1)
  }

  useEffect(() => {
    console.log(score, clicked, current)
    if (clicked.includes(current)) {
      setBest(score - 1);
      setClicked([])
      setCurrent(null)
      setScore(0)
    } else {
      if (best === 8) {
        setPokemons([...pokemons, 'gengar', 'weedle'])
      }
      if (best === 6) {
        setPokemons([...pokemons, 'dragonite', 'arcanine'])
      }
      if (score > best) {
        setBest(score)
      } 
      if (clicked[0]) {
        setClicked([...clicked, current])
      } else {
        setClicked([current])
      }
    }
  }, [score])

  return (
    <main className='main-container'>
      <BoxGrid>
      { pokemonList ? pokemonList.map((pokemon) => {
          return <Card type={pokemon} key={pokemon.key} utility={pokemonClickEvent}/>
        }) : null}
      </BoxGrid>
    </main>
  )
}

export default Main