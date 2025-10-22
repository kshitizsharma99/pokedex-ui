import { useEffect } from "react";
import usePokemonStore from "../../store/pokemonStore";
import PokemonOverview from "../../components/pokemonOverview";

function Explore() {
    const selectedPokemon = usePokemonStore(state => state.selectedPokemon);
    const fetchMorePokemonDetails = usePokemonStore(state => state.fetchMorePokemonDetails);

    useEffect(() => {
        if (selectedPokemon) {
            fetchMorePokemonDetails(); // ✅ safe now
        }
    }, [selectedPokemon]);

    if (!selectedPokemon) return <p>Loading Pokémon...</p>;

    return <PokemonOverview pokemon={selectedPokemon} />;
}

export default Explore;
