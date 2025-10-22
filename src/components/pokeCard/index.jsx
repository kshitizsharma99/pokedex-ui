import { Tag, Button } from "antd";
import tagColors from "../../util/tagColors";
import abilityColors from "../../util/abilityColors";
import statColors from "../../util/statColors";
import statNicknames from "../../util/statNicknames";
import { useNavigate } from "react-router-dom";
import usePokemonStore from "../../store/pokemonStore";

function PokeCard() {
    const navigate = useNavigate();


    const selectedPokemon = usePokemonStore((state) => state.selectedPokemon);
    const setShowPokeCardPopup = usePokemonStore((state) => state.setShowPokeCardPopup);

    if (!selectedPokemon) return null;

    const cleanFlavorText = selectedPokemon.description?.replace(/\f/g, ' ') || '';

    return (
        <div className="text-center relative">

            <button
                className="absolute top-2 right-2 text-red-500 font-bold text-xl"
                onClick={() => setShowPokeCardPopup(false)}
            >
                ✖
            </button>


            <img
                src={selectedPokemon.highImage || selectedPokemon.image}
                alt={selectedPokemon.name}
                className="mx-auto block w-60 h-60 object-contain"
            />


            <p className="text-gray-500 text-xs">N°{selectedPokemon.id}</p>
            <p className="font-bold capitalize text-xl pb-2 pt-2">{selectedPokemon.name}</p>


            <div className="flex gap-2 justify-center pt-2 pb-2">
                {selectedPokemon.types.map((type, i) => (
                    <Tag
                        key={i}
                        className="!font-bold !uppercase"
                        color={tagColors[type.toLowerCase()] || "default"}
                    >
                        {type}
                    </Tag>
                ))}
            </div>


            <div className="pt-5 pb-2">
                <Button
                    className="rounded-full w-36 uppercase !font-bold text-2xl"
                    type="primary"
                    onClick={() => navigate("/explore")}
                >
                    Explore
                </Button>
            </div>


            <div className="">
                <div className="font-bold uppercase text-base pt-5 pb-2">Pokedex Entry</div>
                <div className="text-sm py-3 px-10">{cleanFlavorText}</div>
            </div>

            <div>
                <p className="font-bold uppercase text-sm pt-5 pb-2">Abilities</p>
                <div className="flex flex-wrap justify-evenly pt-2 pb-2">
                    {selectedPokemon.abilities.map((ability, i) => (
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
                    <Tag className="!font-bold !text-xs  !text-center  !pt-2 !pb-2 !rounded-full !mr-0 !w-24">{selectedPokemon.height}m</Tag>
                </div>
                <div>
                    <p className="font-bold uppercase text-sm p-2">Weight</p>
                    <Tag className="!font-bold !capitalize !text-xs !text-center !pt-2 !pb-2 !rounded-full !mr-0 !w-24">{selectedPokemon.weight}Kg</Tag>
                </div>
            </div>


            <div className="flex flex-wrap mt-5 mb-5 justify-evenly">
                <div>
                    <p className="font-bold uppercase text-sm p-2">Base Exp</p>
                    <Tag className="!font-bold !capitalize !text-xs !w-24 !pt-2 !pb-2 !rounded-full !mr-0 !text-center">{selectedPokemon.experience}</Tag>
                </div>
            </div>

            <div className="font-bold uppercase text-sm">
                <p className="font-bold uppercase text-sm pt-5 pb-2">Base Stats</p>
                <div className="flex flex-wrap justify-evenly pt-5">
                    {selectedPokemon.stats.map((stat, i) => (
                        <Tag
                            key={i}
                            className="!font-bold !uppercase !text-[10px] !rounded-full !flex !flex-col !items-center !pb-1 !pt-2 !gap-3"
                        >
                            <p className={`text-white px-1 py-1 rounded-full ${statColors[stat.name] || "bg-gray-400"}`}>
                                {statNicknames[stat.name] || stat.name.replace("-", " ")}
                            </p>
                            <p className="text-[10px]">{stat.base}</p>
                        </Tag>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PokeCard;
