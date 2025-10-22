import { Card, Tag } from "antd";
import tagColors from "../../util/tagColors";
import axios from "axios";
import usePokemonStore from "../../store/pokemonStore";
import { useEffect } from "react";


function PokemonCard({ data, autoSelect }) {

    const setSelectedPokemon = usePokemonStore((state) => state.setSelectedPokemon);

    const handleClick = async () => {
        try {

            const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`);

            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${data.id}`);

            const animatedSprite =
                res.data.sprites?.versions?.["generation-v"]?.["black-white"]?.animated?.front_default ||
                res.data.sprites?.front_default;

            const hdImage =
                res.data.sprites?.other?.["official-artwork"]?.front_default ||
                res.data.sprites?.other?.dream_world?.front_default ||
                res.data.sprites?.front_default ||
                "";

            const flavorText = speciesRes.data.flavor_text_entries.find(
                entry => entry.language.name === "en"
            )?.flavor_text || "";

            const fullData = {
                id: res.data.id,
                name: res.data.name,
                animated: animatedSprite,
                image: res.data.sprites.front_default,
                experience: res.data.base_experience,
                highImage: hdImage,
                types: res.data.types.map((t) => t.type.name),
                height: res.data.height,
                weight: res.data.weight,
                abilities: res.data.abilities.map(a => a.ability.name),
                stats: res.data.stats.map(s => ({ name: s.stat.name, base: s.base_stat })),
                description: flavorText,
            };


            setSelectedPokemon(fullData);


        } catch (error) {
            console.error("Error fetching Pokémon details:", error);
        }
    };

    useEffect(() => {
        if (autoSelect) handleClick();
    }, [autoSelect]);

    return (
        <Card
            hoverable
            className="text-center cursor-pointer"
            onClick={handleClick}
        >

            <img className="mx-auto block w-12 h-12 object-contain" src={data.animated || data.image} loading="lazy" />

            <p className="font-bold mt-2 text-slate-400 text-xs">N&deg;{data.id}</p>

            <p className="font-bold capitalize p-1">{data.name}</p>

            <div className="flex align-center justify-center mt-2">
                {data.types.map((type, i) => (

                    <Tag key={i} className="font-bold uppercase" color={tagColors[type.toLowerCase()] || "default"}>{type}</Tag>
                ))}
            </div>
        </Card>
    )
}

export default PokemonCard;