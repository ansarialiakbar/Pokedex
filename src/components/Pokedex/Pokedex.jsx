import Search from "../Search/Search"
import PokemonList from "../PokemonList/PokemonList";
import './Pokedex.css';
import { useEffect, useState } from "react";
import PokemonDetails from "../PokemonDetails/PokemonDeatils";
function Pokedex(){
  const [searchTerm, setSearchTerm] = useState('')

  return(
    <div className="Pokedex-wrapper">
     <Search updateSearchTerm={setSearchTerm} />
     {(!searchTerm) ?  <PokemonList /> : <PokemonDetails key={searchTerm} pokemonName={searchTerm} /> }
    
    </div>
  )
}
export default Pokedex