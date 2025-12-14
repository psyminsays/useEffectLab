import React, { useEffect, useState } from "react";
import "./App.css";

const LIMIT = 20;

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  // ---- fetch a page of Pokémon ----
  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${LIMIT}`
        );
        const data = await res.json();
        setPokemonList(data.results);
      } catch (err) {
        console.error("List fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, [offset]);

  // ---- fetch details for a single Pokémon ----
  const handlePokemonClick = async (name) => {
    setLoading(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      setSelectedPokemon(data);
    } catch (err) {
      console.error("Detail fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---- pagination ----
  const handleNext = () => setOffset((p) => p + LIMIT);
  const handlePrev = () => setOffset((p) => Math.max(p - LIMIT, 0));

  return (
    <div>
      <h1>Pokémon List</h1>
      {loading && <p>Loading Pokémon…</p>}

      {/* ---------- 4 × 5 button grid ---------- */}
      <div className="grid-buttons">
        {pokemonList.map((poke) => (
          <button key={poke.name} onClick={() => handlePokemonClick(poke.name)}>
            {poke.name}
          </button>
        ))}
      </div>

      {/* ---------- Navigation controls (yellow) ---------- */}
      <div className="nav-controls">
        <button onClick={handlePrev} disabled={offset === 0}>
          Back
        </button>
        <button onClick={handleNext}>Next</button>
      </div>

      {/* ---------- Selected Pokémon details (silver card) ---------- */}
      {selectedPokemon && (
        <div className="details-card">
          <h2>{selectedPokemon.name} Details</h2>

          {selectedPokemon.sprites?.front_default && (
            <img
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
              style={{ marginBottom: "1rem" }}
            />
          )}

          <table>
            <tbody>
              <tr>
                <td><b>Height:</b> {selectedPokemon.height}</td>
                <td><b>Weight:</b> {selectedPokemon.weight}</td>
              </tr>
              <tr>
                <td colSpan="2">
                  <b>Types:</b>{" "}
                  {selectedPokemon.types
                    .map((t) => t.type.name)
                    .join(", ")}
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