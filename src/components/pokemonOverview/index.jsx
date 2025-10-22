import { Tag, Button, Tabs } from "antd";
import tagColors from "../../util/tagColors";
import { useState } from "react";
import abilityColors from "../../util/abilityColors";
import statColors from "../../util/statColors";
import statNicknames from "../../util/statNicknames";
import AboutTab from "../aboutTab";
import AboutLore from "../aboutLore";
import EvolutionTab from "../evolutionTab";
import { useNavigate } from "react-router-dom";



function PokemonOverview({ pokemon }) {

    const [viewShiny, setViewShiny] = useState(false);
    const navigate = useNavigate();


    const tabItems = [
        {
            key: "1",
            label: "About",
            children: (
                <div>
                    <AboutTab pokemons={pokemon} />
                </div>

            ),
        },
        {
            key: "2",
            label: "Lore",
            children: (
                <div className="h-[445px] overflow-y-auto p-2">
                    <AboutLore pokemons={pokemon} />

                </div>
            ),
        },
        {
            key: "3",
            label: "Moves",
            children: (
                <div className="h-[445px] overflow-y-auto p-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {pokemon.movesDetails?.map((move, i) => (
                            <div key={i} className="p-3 border rounded-lg shadow-sm">
                                <p className="capitalize font-bold text-base">{move.name}</p>
                                <p className="text-xs text-gray-500 mb-1">
                                    {move.damage_class} | Type: <span className="uppercase">{move.type}</span>
                                </p>
                                <p className="text-xs">
                                    Power: {move.power} | Accuracy: {move.accuracy}% | PP: {move.pp}
                                </p>
                                <p className="text-xs mt-2 text-gray-600">{move.description}</p>
                            </div>
                        )) || <p className="text-gray-500">Loading moves...</p>}
                    </div>
                </div>
            ),
        },
        {
            key: "4",
            label: "Evolution",
            children: (
                <div>
                    <EvolutionTab pokemons={pokemon} />
                </div>

            ),
        },


    ];

    return (
        <div className=" rounded-lg bg-white sahdow-xl py-2 !sm:text-center">
            <div className="my-1 px-7">
                <Button className="rounded-full w-36 !text-base !bg-transparent !border-none !shadow-none !text-black hover:!bg-transparent hover:!text-black focus:!outline-none focus:!shadow-none"
                    type="primary"
                    icon={<span className="text-xl mr-0.5">←</span>}
                    onClick={() => { navigate("/pokedex") }}></Button>

            </div>

            <div className="flex flex-col lg:flex-row px-4 lg:px-20 gap-5">

                <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start mx-auto">
                    <div className="flex flex-wrap lg:justify-start lg:items-end gap-2 ">
                        <p className="font-bold capitalize text-2xl sm:text-3xl lg:text-4xl">{pokemon.name}</p>
                        <p className="text-gray-500 text-xs sm:text-sm lg:text-sm pb-3">N° {pokemon.id}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 lg:text-left lg:justify-start pt-2 pb-2">
                        {pokemon.types.map((type, i) => (
                            <Tag
                                key={i}
                                className="!font-bold !uppercase !rounded-full"
                                color={tagColors[type.toLowerCase()] || "default"}
                            >
                                {type}
                            </Tag>
                        ))}
                    </div>
                    <img
                        src={
                            viewShiny
                                ? pokemon?.images?.shiny || pokemon.highImage || pokemon.image
                                : pokemon?.images?.normal || pokemon.highImage || pokemon.image
                        }
                        alt={pokemon.name}
                        className="w-60 h-60 sm:w-64 sm:h-64 lg:w-60 lg:h-60 object-contain mt-4"
                    />

                    <div>
                        <p className="font-bold capitalize my-2 text-base">Versions</p>
                        <div className="flex gap-1 flex-wrap lg:justify-start pt-2 pb-2">
                            <Tag
                                className="!font-bold !uppercase !rounded-full cursor-pointer"
                                type={!viewShiny ? "primary" : "default"}
                                onClick={() => setViewShiny(false)}
                            >
                                Normal
                            </Tag>
                            <Tag
                                className="!font-bold !uppercase !rounded-full cursor-pointer"
                                type={viewShiny ? "primary" : "default"}
                                onClick={() => setViewShiny(true)}
                                disabled={!pokemon?.images?.shiny}
                            >
                                Shiny ✨
                            </Tag>
                        </div>
                    </div>

                </div>
                <div className="w-full lg:w-2/3">
                    <Tabs defaultActiveKey="1" items={tabItems} />

                </div>
            </div>

        </div>
    );
}

export default PokemonOverview;
