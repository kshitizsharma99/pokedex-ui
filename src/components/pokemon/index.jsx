import PokemonDetail from "../pokemonDetails/pokemonDetails";
import usePokemonStore from "../../store/pokemonStore";

function Pokemon() {
    const selectedPokemon = usePokemonStore((state) => state.selectedPokemon);

    if (!selectedPokemon) return <p>Loading Pokémon...</p>;

    if (selectedPokemon.types) {
        return (
            <div>
                <PokemonDetail pokemon={selectedPokemon} />
            </div>
        );
    }

    return <p>Unknown Pokémon</p>;
}

export default Pokemon;
