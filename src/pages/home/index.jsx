import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="flex flex-col items-center text-center px-5 bg-gradient-to-b from-red-500 to-yellow-400 !rounded-xl">

            <div className="mt-3 mb-2">
                <img
                    src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                    alt="Pokémon Logo"
                    className="w-48 drop-shadow-lg"
                />
            </div>


            <div className="mb-3 mt-2">
                <h1 className="text-3xl font-extrabold text-white drop-shadow-md uppercase">
                    Welcome to PokéDex Explorer
                </h1>
                <p className="text-white max-w-md mx-auto mt-2 text-base px-2">
                    Search, filter, and explore Pokémon stats, abilities, and types powered by the PokéAPI.
                </p>
            </div>


            <div className="my-5">
                <Link
                    to="/pokedex"
                    className="bg-white text-red-600 font-bold px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition transform"
                >
                    Explore Pokédex
                </Link>
            </div>


            <div className="mt-10 mb-1">
                <img
                    src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
                    alt="Pikachu"
                    className="w-52 drop-shadow-2xl animate-bounce"
                />
            </div>
        </div>
    );
}

export default Home;
