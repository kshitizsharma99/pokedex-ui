import { useState, useMemo } from "react";
import axios from "axios";
import PokemonPreviewGrid from "../pokemonPreviewGrid";
import { Pagination, Skeleton } from "antd";

function PokemonPreview() {
    const [pokemonList, setPokemonList] = useState([]);
    const limit = 20;
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useMemo(() => {
        const offset = (page - 1) * limit;
        setLoading(true);
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
        setLoading(false);
    }, [page]);

    if (loading)
        return <Skeleton />

    return (
        <div className="">
            <PokemonPreviewGrid pokemons={pokemonList} />
            <div className="justify-center flex pt-5 ">
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