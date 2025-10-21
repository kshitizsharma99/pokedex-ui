import { useEffect, useState } from "react";
import Zeusstand from "../../store/zeusStand"
import PokemonDetail from "../pokemonDetails/pokemonDetails";

function Pokemon({ defaultPokemon }) {

    const [item, setItem] = useState(Zeusstand.getState() || defaultPokemon);
    useEffect(() => {
        const unsubscribe = Zeusstand.subscribe((newItem) => {
            setItem(newItem || defaultPokemon);
        });
        return unsubscribe;
    }, [defaultPokemon]);


    if (!item) return <p>Loading Pokémon...</p>;

    if (item.types) return (
        <PokemonDetail pokemon={item} />
    );

    return <p>Unknown item</p>;
};

export default Pokemon