import { Tag, Button } from "antd";
import tagColors from "../../util/tagColors";
import abilityColors from "../../util/abilityColors";
import statColors from "../../util/statColors";

function PokemonDetail({ pokemon }) {
    const cleanFlavorText = pokemon.description?.replace(/\f/g, ' ') || '';

    return (
        <div className="text-center">

            <img
                src={pokemon.highImage || pokemon.image}
                alt={pokemon.name}
                className="mx-auto block w-60 h-60 object-contain"
            />

            <p className="text-gray-500 text-xs">N°{pokemon.id}</p>

            <p className="font-bold capitalize text-xl">{pokemon.name}</p>

            <div className="flex gap-2 justify-center mt-2 mb-2">
                {pokemon.types.map((type, i) => (
                    <Tag
                        key={i}
                        className="!font-bold !uppercase"
                        color={tagColors[type.toLowerCase()] || "default"}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Tag>
                ))}
            </div>
            <div className="m-5">
                <p className="font-bold uppercase text-base">Pokedex Entry</p>
                <p className="text-sm">{cleanFlavorText}</p>
            </div>
            <div>
                <p className="font-bold uppercase text-sm">Abilities</p>
                <div className="flex gap-3 justify-center mt-2 mb-2">
                    {pokemon.abilities.map((ability, i) => (
                        <Tag
                            key={i}
                            className="!font-bold !capitalize !text-xs !pr-7 !pl-7 !pt-2 !pb-2 !rounded-full"
                            color={abilityColors[ability] || "default"}
                        >
                            {ability}
                        </Tag>
                    ))}
                </div>
            </div>
            <div className="flex mt-5 mb-5 justify-evenly">
                <div>
                    <p className="font-bold uppercase text-sm m-2">Height</p>
                    <Tag className="!font-bold !text-xs !pr-13 !text-center !pl-13 !pt-2 !pb-2 !rounded-full ">{pokemon.height}m</Tag>
                </div>
                <div>
                    <p className="font-bold uppercase text-sm m-2">weight</p>
                    <Tag className="!font-bold !capitalize !text-xs !pr-13 !pl-13 !pt-2 !pb-2 !rounded-full">{pokemon.weight}Kg</Tag>
                </div>

            </div>
            <div className="flex mt-5 mb-5 justify-evenly">
                <div>
                    <p className="font-bold uppercase text-sm m-2">Weaknesses</p>
                    <Tag className="!font-bold !text-xs !pr-13 !text-center !pl-13 !pt-2 !pb-2 !rounded-full ">{pokemon.height}m</Tag>
                </div>
                <div>
                    <p className="font-bold uppercase text-sm m-2">Base Exp</p>
                    <Tag className="!font-bold !capitalize !text-xs !pr-13 !pl-13 !pt-2 !pb-2 !rounded-full">{pokemon.experience}</Tag>
                </div>

            </div>
            <div className="font-bold uppercase text-sm">
                <p className="font-bold uppercase text-sm m-2">Base Stats</p>
                <div className="flex flex-wrap justify-evenly">
                    {pokemon.stats.map((stat, i) => (
                        <Tag
                            key={i}
                            className="!font-bold !uppercase !text-xs !rounded-full !flex !flex-col !items-center"
                        >
                            <span>{stat.name.replace("-", " ")}</span>
                            <span className="text-[10px]">{stat.base}</span>
                        </Tag>
                    ))}
                </div>

            </div>

        </div>
    );
}

export default PokemonDetail;
