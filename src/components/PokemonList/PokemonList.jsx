import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){
     const [pokemonList, setPokemonList] = useState([]);
     const [isLoading, setIsLoading] = useState(true)
     const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon';
    async function downloadPokemons(){
        const response = await axios.get(POKEDEX_URL); // this downloads list of 20 pokemon 
        const pokemonResults = response.data.results;
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData);
       const res = pokemonData.map((pokeData) => {
             const pokemon = pokeData.data;
             return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default :pokemon.sprites.front_shiny ,
                types: pokemon.types
                }
        })
        console.log(res);
        setPokemonList(res)
        setIsLoading(false);
    }
    
    useEffect(()=>{
       
        downloadPokemons();
       
    }, []) // with empt array only first time the effect called will print
    // if we remove the array empty symbol the effect call will print always as page render
    // use effect generally used when we want to comr download data
   
    return(
        <div className="pokemon-list-wrapper">
        <div>Pokemon List</div>
        {(isLoading) ? 'Loading...' : 
        pokemonList.map((p)=> <Pokemon name = {p.name} image = {p.image} key = {p.id} />)
        }  
        </div>
    )
}
export default PokemonList;