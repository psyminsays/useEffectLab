import React, { useEffect, useState } from 'react';

const PokemonList = () => {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
                const data = await response.json();

                // Check the structure of the fetched data
                console.log(data); // Inspect the response

                setPokemon(data.results); // Assuming data.results contains the Pokémon
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchPokemon();
    }, []);

    return (
        <div>
            <h1>Pokémon List</h1>
            <ul>
                {pokemon.map((poke) => (
                    <li key={poke.name}>{poke.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonList;
