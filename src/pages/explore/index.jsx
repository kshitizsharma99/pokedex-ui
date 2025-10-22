import { useEffect } from "react";
import usePokemonStore from "../../store/pokemonStore";
import PokemonOverview from "../../components/pokemonOverview";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Explore() {
    const selectedPokemon = usePokemonStore(state => state.selectedPokemon);
    const fetchMorePokemonDetails = usePokemonStore(state => state.fetchMorePokemonDetails);
    const navigate = useNavigate();


    useEffect(() => {
        if (selectedPokemon) {
            fetchMorePokemonDetails();
        }
    }, [selectedPokemon]);

    if (!selectedPokemon) return (
        <div>

            <div className=" rounded-lg bg-transparent sahdow-xl py-2 px-5">
                <div className="my-1 px-7">
                    <Button className="rounded-full w-36 !text-base !bg-transparent !border-none !shadow-none !text-black hover:!bg-transparent hover:!text-black focus:!outline-none focus:!shadow-none"
                        type="primary"
                        icon={<span className="text-xl mr-0.5 ">←</span>}
                        onClick={() => { navigate("/pokedex") }}>No Pokemon Selected. Return To Pokedex</Button>

                </div>
            </div>
        </div>
    );

    return <PokemonOverview pokemon={selectedPokemon} />;
}

export default Explore;
