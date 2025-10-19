import Filter from "../../components/filter"
import Pokemon from "../../components/pokemon"
import PokemonPreview from "../../components/pokemonPreview"


function Pokedex() {
    return (
        <div className="flex">
            <div className="w-2/3">
                <div className="bg-white rounded-lg shadow-xl mt-5 mb-5 mr-5">
                    <Filter />
                </div>
                <div className=" mt-5 mb-5 mr-5">
                    <PokemonPreview />
                </div>
            </div>
            <div className="w-1/3 bg-white rounded-lg shadow-xl mt-5 mb-5 ml-5">
                <Pokemon />
            </div>
        </div>
    )
}
export default Pokedex