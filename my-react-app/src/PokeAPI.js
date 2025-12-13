// PokeAPI.js

export const fetchPokemons = async (offset, limit) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    return response.json();
};

export const fetchPokemonDetails = async (name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.json();
};
