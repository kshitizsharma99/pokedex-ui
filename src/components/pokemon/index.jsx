
import PokemonDetail from "../pokemonDetails/pokemonDetails";
import usePokemonStore from "../../store/pokemonStore";

function Pokemon({ defaultPokemon }) {

    const selectedPokemon = usePokemonStore((state) => state.selectedPokemon);

    const item = selectedPokemon;


    if (!item) return <p>Loading Pokémon...</p>;

    if (item.types) return (
        <PokemonDetail pokemon={item} />
    );

    return <p>Unknown item</p>;
};

export default Pokemon