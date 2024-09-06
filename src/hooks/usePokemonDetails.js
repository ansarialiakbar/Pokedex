import axios from "axios";
import { useEffect, useState } from "react";
import usePokemonList from "./usePokemonList";

function usePokemonDetails(id){
    
     const [pokemon, setPokemon] = useState({})
    //  let  pokemonListHookResponse = [];


     async function downloadPokemon() {
     
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeomonOfSameTypes = await axios.get(`https://pokeapi.co/api/v2/type/${ response.data.types ? response.data.types[0].type.name : ''}`)
        console.log('s',pokeomonOfSameTypes );
        
        setPokemon({
            name:response.data.name,
            image:response.data.sprites.other.dream_world.front_default,
            weight:response.data.weight,
            height:response.data.height,
            types:response.data.types.map((t) => t.type.name),
            similarPokemons:pokeomonOfSameTypes.data.pokemon.slice(0, 5)
        })
        setPokemonListSate({...pokemonListState, type: response.data.types ? response.data.types[0].type.name : ''})
       
     }

     const [pokemonListState, setPokemonListSate] = usePokemonList()

     useEffect(() =>{
        downloadPokemon();
        console.log("list", pokemon.types, pokemonListState );
        
     }, []);

     return [pokemon]

}

export default usePokemonDetails;