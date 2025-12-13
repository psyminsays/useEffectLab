import React, { useEffect, useState } from 'react';

const PokemonList = () => {
    const [pokemon, setPokemon] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 20; // Number of Pokémon to fetch at once

    const fetchPokemon = async (offset) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            const data = await response.json();

            console.log(data); // Inspect the response
            setPokemon(data.results); // Assuming data.results contains the Pokémon
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchPokemon(offset);
    }, [offset]);

    const handleNext = () => {
        setOffset((prevOffset) => prevOffset + limit);
    };

    const handlePrev = () => {
        setOffset((prevOffset) => Math.max(prevOffset - limit, 0)); // Prevent negative offset
    };

    return (
        <div>
            <h1>Pokémon List</h1>
            <ul>
                {pokemon.map((poke) => (
                    <li key={poke.name}>{poke.name}</li>
                ))}
            </ul>
            <div>
                <button onClick={handlePrev} disabled={offset === 0}>
                    Back
                </button>
                <button onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default PokemonList;
