import { useState, useEffect } from "react";
import axios from "axios";
import PokemonPreviewGrid from "../pokemonPreviewGrid";
import { Pagination } from "antd";
import Zeusstand from "../../store/zeusStand";

function PokemonPreview() {
    const [pokemonList, setPokemonList] = useState([]);
    const limit = 52;
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const offset = (page - 1) * limit;

        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
            .then(async (response) => {

                setTotal(response.data.count);

                const results = response.data.results;

                const pokemonDetails = await Promise.all(
                    results.map(async (pokemon) => {
                        const res = await axios.get(pokemon.url);

                        const animatedSprite =
                            res.data.sprites?.versions?.["generation-v"]?.["black-white"]?.animated?.front_default ||
                            res.data.sprites?.front_default;

                        return {
                            id: res.data.id,
                            name: res.data.name,
                            animated: animatedSprite,
                            image: res.data.sprites.front_default,
                            types: res.data.types.map((t) => t.type.name),
                        };
                    })
                )
                setPokemonList(pokemonDetails);


            })
            .catch((error) => {
                console.error("Error fetching Pokémon list:", error);
            });
    }, [page]);


    return (
        <div className="">
            <PokemonPreviewGrid pokemons={pokemonList} />
            <div className="justify-center flex mt-2">
                <Pagination
                    current={page}
                    pageSize={limit}
                    total={total}
                    onChange={(p) => setPage(p)}
                    showSizeChanger={false} />
            </div>
        </div>
    )
}

export default PokemonPreview