import { useEffect, useState } from "react";
import axios from "axios";

 function usePokemonList( ){
    //  const [pokemonList, setPokemonList] = useState([]);
    //  const [isLoading, setIsLoading] = useState(true)
    //  const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    //  const [nextUrl, setNextUrl] = useState('');
    //  const [prevUrl, setPrevUrl] = useState('');
    const [pokemonListState, setPokemonListSate] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: '',

    })

    async function downloadPokemons(){
        // setIsLoading(true);
         
        // setPrevUrl(response.data.previous)
      
            setPokemonListSate((state) => ({
               ...state,
                 isLoading: true
                 }));
            const response = await axios.get(pokemonListState.pokedexUrl); // this downloads list of 20 pokemon.
            const pokemonResults = response.data.results;// we get the array of pokemon from result.
            console.log("response is",response.data.pokemon);
            // setNextUrl(response.data.next);
            console.log(pokemonListState);
            
            setPokemonListSate((state) =>({
                ...state, 
                nextUrl: response.data.next,
                prevUrl: response.data.previous
            }));


        // iterating over array of pokemon, and using their url, to create an array of promises that will download those 20 pokemon.
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultPromise);//array of 20 pokemon detailed data.
        console.log(pokemonData);
        // now iterate on the data of each pokemon, and extract id, name, images and types.
       const pokeListResult = pokemonData.map((pokeData) => {
             const pokemon = pokeData.data;
             return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default :pokemon.sprites.front_shiny ,
                types: pokemon.types
                }
        })
        console.log(pokeListResult);
        // setPokemonList(pokeListResult)
        setPokemonListSate((state) => ({
            ...state, 
            pokemonList: pokeListResult,
            isLoading: false,    
         }));
       
      
    }
    
    useEffect(()=>{
       
        downloadPokemons();
       
    }, [pokemonListState.pokedexUrl])  // with empt array only first time the effect called will print
    // if we remove the array empty symbol the effect call will print always as page render
    // use effect generally used when we want to comr download data

    return[pokemonListState, setPokemonListSate];

}
export default usePokemonList; 
