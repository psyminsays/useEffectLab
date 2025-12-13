import React, { useEffect, useState } from 'react';
import './App.css'; // Styles are pulled in
import { fetchPokemons, fetchPokemonDetails } from './PokeAPI'; // Import your API functions

const App = () => {
    const [pokemon, setPokemon] = useState([]); 
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false); // New loading state
    const limit = 20;

    useEffect(() => {
        const getPokemons = async () => {
            setLoading(true); // Set loading state to true
            try {
                const data = await fetchPokemons(offset, limit);
                setPokemon(data.results);
            } catch (error) {
                console.error("Error fetching Pokémon:", error);
            } finally {
                setLoading(false); // Set loading state back to false
            }
        };
        getPokemons();
    }, [offset]);

    const handleNext = () => {
        setOffset((prevOffset) => prevOffset + limit);
    };

    const handlePrev = () => {
        setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
    };

    const handlePokemonClick = async (name) => {
        setLoading(true); // Set loading state to true
        try {
            const data = await fetchPokemonDetails(name);
            setSelectedPokemon(data);
        } catch (error) {
            console.error("Error fetching Pokémon details:", error);
        } finally {
            setLoading(false); // Set loading state back to false
        }
    };

    return (
        <div>
            <h1>Pokémon List</h1>
            {loading && <p>Loading Pokémon...</p>} {/* Show loading message */}

            <table>
                <thead>
                    <tr>
                        <th>Pokémon Names</th>
                    </tr>
                </thead>
                <tbody>
                    {pokemon.map((poke) => (
                        <tr key={poke.name}>
                            <td>
                                <button onClick={() => handlePokemonClick(poke.name)}>
                                    {poke.name}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-container">
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
                    <table>
                        <tbody>
                            <tr>
                                <td><b>Height:</b> {selectedPokemon.height}</td>
                                <td><b>Weight:</b> {selectedPokemon.weight}</td>
                            </tr>
                            <tr>
                                <td><b>Base Experience:</b> {selectedPokemon.base_experience}</td>
                                <td><b>Types:</b> {selectedPokemon.types.map(type => type.type.name).join(', ')}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <b>Abilities:</b> {selectedPokemon.abilities.map(ability => ability.ability.name).join(', ')}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default App;