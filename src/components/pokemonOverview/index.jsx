import { Tag } from "antd";
import tagColors from "../../util/tagColors";
import abilityColors from "../../util/abilityColors";
import statColors from "../../util/statColors";
import statNicknames from "../../util/statNicknames";


function PokemonOverview({ pokemon }) {
    const cleanFlavorText = pokemon.description?.replace(/\f/g, ' ') || '';

    return (
        <div className="text-center">

            <img
                src={pokemon.highImage || pokemon.image}
                alt={pokemon.name}
                className="mx-auto block w-60 h-60 object-contain"
            />

            <p className="text-gray-500 text-xs">N°{pokemon.id}</p>

            <p className="font-bold capitalize text-xl pb-2 pt-2">{pokemon.name}</p>

            <div className="flex gap-2 justify-center pt-2 pb-2">
                {pokemon.types.map((type, i) => (
                    <Tag
                        key={i}
                        className="!font-bold !uppercase"
                        color={tagColors[type.toLowerCase()] || "default"}
                    >
                        {type}
                    </Tag>
                ))}
            </div>
            <div className="">
                <p className="font-bold uppercase text-base pt-5 pb-2">Pokedex Entry</p>
                <p className="text-sm pt-2 pb-2 px-2">{cleanFlavorText}</p>
            </div>
            <div>
                <p className="font-bold uppercase text-sm pt-5 pb-2">Abilities</p>
                <div className="flex flex-wrap justify-evenly pt-2 pb-2">
                    {pokemon.abilities.map((ability, i) => (
                        <Tag
                            key={i}
                            className="!font-bold !capitalize !text-xs !pr-7 !pl-7 !pt-2 !pb-2 !rounded-full !min-w-[90px]"
                            color={abilityColors[ability] || "default"}
                        >
                            {ability}
                        </Tag>
                    ))}
                </div>
            </div>
            <div className="flex flex-wrap mt-5 mb-5 justify-evenly">
                <div>
                    <p className="font-bold uppercase text-sm p-2">Height</p>
                    <Tag className="!font-bold !text-xs  !text-center  !pt-2 !pb-2 !rounded-full !mr-0 !w-24">{pokemon.height}m</Tag>
                </div>
                <div>
                    <p className="font-bold uppercase text-sm p-2">weight</p>
                    <Tag className="!font-bold !capitalize !text-xs !text-center !pt-2 !pb-2 !rounded-full !mr-0 !w-24">{pokemon.weight}Kg</Tag>
                </div>

            </div>
            <div className="flex flex-wrap mt-5 mb-5 justify-evenly">
                <div>
                    <p className="font-bold uppercase text-sm p-2">Weaknesses</p>
                    <Tag className="!font-bold !text-xs !text-center !pt-2 !pb-2 !rounded-full !mr-0 !w-24">{pokemon.height}m</Tag>
                </div>
                <div>
                    <p className="font-bold uppercase text-sm p-2">Base Exp</p>
                    <Tag className="!font-bold !capitalize !text-xs !w-24 !pt-2 !pb-2 !rounded-full !mr-0 !text-center">{pokemon.experience}</Tag>
                </div>

            </div>
            <div className="font-bold uppercase text-sm">
                <p className="font-bold uppercase text-sm pt-5 pb-2">Base Stats</p>
                <div className="flex flex-wrap justify-evenly pt-5">
                    {pokemon.stats.map((stat, i) => (
                        <Tag
                            key={i}
                            className="!font-bold !uppercase !text-[10px] !rounded-full !flex !flex-col !items-center !pb-1 !pt-2 !gap-3"
                        >
                            <p className={`text-white px-1 py-1 rounded-full  ${statColors[stat.name] || "bg-gray-400"}`}

                            >{statNicknames[stat.name] || stat.name.replace("-", " ")}</p>
                            <p className="text-[10px]">{stat.base}</p>
                        </Tag>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default PokemonOverview;
