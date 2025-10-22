import { useState, useEffect } from "react";
import Filter from "../../components/filter";
import Pokemon from "../../components/pokemon";
import PokemonPreview from "../../components/pokemonPreview";
import PokeCard from "../../components/pokeCard";
import usePokemonStore from "../../store/pokemonStore";

function Pokedex() {
    const [searchText, setSearchText] = useState("");
    const [selectedType, setSelectedType] = useState([]);
    const [isPanelHidden, setIsPanelHidden] = useState(window.innerWidth < 1024);
    const selectedPokemon = usePokemonStore(state => state.selectedPokemon);
    const showPokeCardPopup = usePokemonStore(state => state.showPokeCardPopup);
    const setShowPokeCardPopup = usePokemonStore(state => state.setShowPokeCardPopup);

    useEffect(() => {
        const handleResize = () => {
            setIsPanelHidden(window.innerWidth < 1024);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex flex-col lg:flex-row">

            <div className="w-full lg:w-2/3">
                <div>
                    <Filter
                        onSearch={setSearchText}
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                    />
                </div>
                <div className="mt-5 mb-5">
                    <PokemonPreview
                        searchText={searchText}
                        selectedType={selectedType}
                        isPanelHidden={isPanelHidden}
                    />
                </div>
            </div>


            <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-xl mt-5 mb-5 lg:ml-5 hidden lg:block">
                <Pokemon />
            </div>


            {showPokeCardPopup && selectedPokemon && isPanelHidden && (
                <div className="fixed top-0 left-0 w-full h-full bg-transparent  flex justify-center items-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto relative w-11/12 lg:w-1/2">

                        <PokeCard pokemons={selectedPokemon} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pokedex;
