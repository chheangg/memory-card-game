import React, {useState, useEffect} from 'react'
import 'normalize.css'
import uniqid from "uniqid";
import Card from "./utils/box-card"
import BoxGrid from "./utils/box-grids"
import './styles/main.scss'

const Main = (props) => {
  const initialPokemons = ['Charizard', 'Charmander', 'Pikachu', 'Bulbasaur', 'Eevee', 'Squirtle', 'Blastoise', 'Snorlax']
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
    const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
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
    if (clicked.includes(current)) {
      if (score === 0 && best === 0 ) {
        setBest(0)
      } else {
        setBest(score - 1);
      }
      setClicked([])
      setCurrent(null)
      setScore(0)
    } else {
      if (best === 9) {
        setPokemons([...pokemons, 'Mewtwo', 'Vivillon'])
      }
      if (best === 7) {
        setPokemons([...pokemons, 'Mew', 'Pidgey'])
      }
      if (best === 5) {
        setPokemons([...pokemons, 'Beautifly', 'Starly'])
      }
      if (best === 3) {
        setPokemons([...pokemons, 'Dragonite', 'Butterfree'])
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
      <div className='score'>
        <p><b>Best:</b> {best}</p>
        <p><b>Score:</b> {score}</p>
      </div>
      <BoxGrid>
      { pokemonList ? pokemonList.map((pokemon) => {
          return <Card type={pokemon} key={pokemon.key} utility={pokemonClickEvent}/>
        }) : null}
      </BoxGrid>
    </main>
  )
}

export default Main