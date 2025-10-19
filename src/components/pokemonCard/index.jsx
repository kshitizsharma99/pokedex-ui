import { Card, Tag, Button } from "antd";
import tagColors from "../../util/tagColors";
import Zeusstand from "../../store/zeusStand";
import axios from "axios";
import { useEffect } from "react";
function PokemonCard({ data, autoClick }) {
    useEffect(() => {
        if (autoClick) handleClick();
    }, [autoClick]);

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

            Zeusstand.send(fullData);

        } catch (error) {
            console.error("Error fetching Pokémon details:", error);
        }
    };

    return (
        <Card hoverable className="text-center cursor-pointer" onClick={handleClick}>

            <img className="mx-auto block w-12 h-12 object-contain" src={data.animated || data.image} alt="" />

            <p className="font-bold mt-1 mb-1 text-slate-400 text-xs">N&deg;{data.id}</p>

            <p className="font-bold capitalize m-3 -mt-1">{data.name}</p>

            <div className="flex gap-2 justify-center ">
                {data.types.map((type, i) => (

                    <Tag key={i} className="font-bold uppercase" color={tagColors[type.toLowerCase()] || "default"}>{type}</Tag>
                ))}
            </div>
        </Card>
    )
}

export default PokemonCard