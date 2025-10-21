import { useEffect, useState } from "react";
import Zeusstand from "../../store/zeusStand";
import PokemonOverview from "../../components/pokemonOverview";

function Explore() {
    const [item, setItem] = useState(Zeusstand.getState());

    useEffect(() => {
        const unsubscribe = Zeusstand.subscribe((newItem) => {
            setItem(newItem);
        });
        return unsubscribe;
    }, []);

    if (!item) return <p>Loading Pokémon...</p>;

    if (item.types) return (
        <PokemonOverview pokemon={item} />

    );

    return <p>Unknown item</p>;
};

export default Explore;