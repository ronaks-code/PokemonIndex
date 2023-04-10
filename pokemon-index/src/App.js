import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import TogglePages from './TogglePages';
import axios from 'axios';

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageURL, setCurrentPageURL] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageURL, setNextPageURL] = useState()
  const [prevPageURL, setPrevPageURL] = useState()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageURL, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setPrevPageURL(res.data.previous)
      setNextPageURL(res.data.next)
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel()
  }, [currentPageURL])  

  function gotoNextPage() {
    setCurrentPageURL(nextPageURL)
  }

  function gotoPrevPage() {
    setCurrentPageURL(prevPageURL)
  }

  if (loading) return "Loading..."

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <TogglePages
        gotoPrevPage={prevPageURL ? gotoPrevPage : null}  
        gotoNextPage={nextPageURL ? gotoNextPage : null}
      />
    </>
  );
}

export default App;