import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import PokemonPreviewGrid from "../pokemonPreviewGrid";
import { Pagination, Skeleton } from "antd";

function PokemonPreview({ searchText, selectedType }) {
    const [pokemonList, setPokemonList] = useState([]); // Current page Pokémon
    const [total, setTotal] = useState(0);
    const [allPokemonList, setAllPokemonList] = useState(null); // All Pokémon for filtering
    const [filteredList, setFilteredList] = useState([]); // Filtered Pokémon (when filtering)
    const [page, setPage] = useState(1);
    const limit = 20;
    const [loading, setLoading] = useState(false);

    // Fetch paginated Pokémon for unfiltered browsing
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                const offset = (page - 1) * limit;
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

                setTotal(response.data.count);

                const results = response.data.results;
                const pokemonDetails = await Promise.all(
                    results.map(async (pokemon) => {
                        const res = await axios.get(pokemon.url);
                        const animatedSprite =
                            res.data.sprites?.versions?.["generation-v"]?.["black-white"]?.animated?.front_default ||
                            res.data.sprites.front_default;
                        return {
                            id: res.data.id,
                            name: res.data.name,
                            image: res.data.sprites.front_default,
                            animated: animatedSprite,
                            types: res.data.types.map(t => t.type.name),
                        };
                    })
                );

                setPokemonList(pokemonDetails);

                // Only set filteredList if no filter is active
                if (!searchText && !selectedType) setFilteredList(pokemonDetails);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        // Only fetch paginated Pokémon if no filter
        if (!searchText && !selectedType) {
            fetchPokemon();
        }
    }, [page, searchText, selectedType]);

    // Apply filter
    useEffect(() => {
        const applyFilter = async () => {
            if (searchText || selectedType) {
                let list = allPokemonList;

                // Fetch all Pokémon only once for filtering
                if (!list) {
                    try {
                        setLoading(true);
                        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000");
                        const results = response.data.results;

                        list = await Promise.all(
                            results.map(async (pokemon) => {
                                const res = await axios.get(pokemon.url);
                                const animatedSprite =
                                    res.data.sprites?.versions?.["generation-v"]?.["black-white"]?.animated?.front_default ||
                                    res.data.sprites.front_default;

                                return {
                                    id: res.data.id,
                                    name: res.data.name,
                                    image: res.data.sprites.front_default,
                                    animated: animatedSprite,
                                    types: res.data.types.map(t => t.type.name),
                                };
                            })
                        );

                        setAllPokemonList(list);
                    } catch (err) {
                        console.error(err);
                    } finally {
                        setLoading(false);
                    }
                }

                let filtered = list;

                if (searchText)
                    filtered = filtered.filter(p =>
                        p.name.toLowerCase().includes(searchText.toLowerCase())
                    );

                if (selectedType && selectedType.length > 0)
                    filtered = filtered.filter(p =>
                        selectedType.some(type => p.types.includes(type))
                    );


                setFilteredList(filtered);
                setPage(1); // reset to first page on filter
            } else {
                // If no filter, just show current page Pokémon
                setFilteredList(pokemonList);
            }
        };

        applyFilter();
    }, [searchText, selectedType, allPokemonList, pokemonList]);

    // Paginate list: only slice if filter is active
    const paginatedList = useMemo(() => {
        if (searchText || selectedType) {
            const start = (page - 1) * limit;
            return filteredList.slice(start, start + limit);
        }
        return pokemonList; // for unfiltered browsing, use current page
    }, [filteredList, pokemonList, page, searchText, selectedType]);

    if (loading) return <Skeleton active />;

    return (
        <>
            <PokemonPreviewGrid pokemons={paginatedList} />
            <div className="justify-center flex pt-5">
                <Pagination
                    current={page}
                    pageSize={limit}
                    total={searchText || selectedType ? filteredList.length : total}
                    onChange={setPage}
                    showSizeChanger={false}
                />
            </div>
        </>
    );
}

export default PokemonPreview;
