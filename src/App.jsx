import React, { useEffect, useState } from 'react';

const PokemonList = () => {
    const [pokemon, setPokemon] = useState([]);
    const [offset, setOffset] = useState(0);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const limit = 20;

    const fetchPokemon = async (offset) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            const data = await response.json();
            setPokemon(data.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchPokemonDetails = async (name) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await response.json();
            setSelectedPokemon(data);
        } catch (error) {
            console.error("Error fetching Pokémon details:", error);
        }
    };

    useEffect(() => {
        fetchPokemon(offset);
    }, [offset]);

    const handleNext = () => {
        setOffset((prevOffset) => prevOffset + limit);
    };

    const handlePrev = () => {
        setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
    };

    const handlePokemonClick = (name) => {
        fetchPokemonDetails(name);
    };

    return (
        <div>
            <h1>Pokémon List</h1>
            <ul>
                {pokemon.map((poke) => (
                    <li key={poke.name} onClick={() => handlePokemonClick(poke.name)}>
                        {poke.name}
                    </li>
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
            {selectedPokemon && (
                <div>
                    <h2>{selectedPokemon.name} Details</h2>
                    <p><b>Height:</b> {selectedPokemon.height}</p>
                    <p><b>Weight:</b> {selectedPokemon.weight}</p>
                    <p><b>Types:</b> {selectedPokemon.types.map(type => type.type.name).join(', ')}</p>
                    <p><b>Abilities:</b> {selectedPokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default PokemonList;