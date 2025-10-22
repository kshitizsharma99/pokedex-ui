import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import PokemonPreviewGrid from "../pokemonPreviewGrid";
import { Pagination, Skeleton } from "antd";
import Filter from "../filter";

function PokemonPreview({ searchText, selectedType }) {
    const [pokemonList, setPokemonList] = useState([]);
    const [allPokemonList, setAllPokemonList] = useState(null);
    const [filteredList, setFilteredList] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 20;
    const [loading, setLoading] = useState(false);

    // Fetch Pokémon (same as before)
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                const offset = (page - 1) * limit;
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
                const results = response.data.results;

                const pokemonDetails = await Promise.all(
                    results.map(async (pokemon) => {
                        const res = await axios.get(pokemon.url);
                        return {
                            id: res.data.id,
                            name: res.data.name,
                            image: res.data.sprites.front_default,
                            types: res.data.types.map(t => t.type.name),
                        };
                    })
                );

                setPokemonList(pokemonDetails);

                // If no filter, show current page
                if (!searchText && !selectedType) setFilteredList(pokemonDetails);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (!searchText && !selectedType) {
            fetchPokemon();
        }
    }, [page, searchText, selectedType]);

    // Apply filter
    useEffect(() => {
        const applyFilter = async () => {
            if (searchText || selectedType) {
                let list = allPokemonList;

                if (!list) {
                    try {
                        setLoading(true);
                        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000");
                        const results = response.data.results;

                        list = await Promise.all(
                            results.map(async (pokemon) => {
                                const res = await axios.get(pokemon.url);
                                return {
                                    id: res.data.id,
                                    name: res.data.name,
                                    image: res.data.sprites.front_default,
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
                if (searchText) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()));
                if (selectedType) filtered = filtered.filter(p => p.types.includes(selectedType));

                setFilteredList(filtered);
                setPage(1);
            } else {
                setFilteredList(pokemonList);
            }
        };

        applyFilter();
    }, [searchText, selectedType, allPokemonList, pokemonList]);

    const paginatedList = useMemo(() => {
        const start = (page - 1) * limit;
        return filteredList.slice(start, start + limit);
    }, [filteredList, page]);

    if (loading) return <Skeleton active />;

    return (
        <>
            <PokemonPreviewGrid pokemons={paginatedList} />
            <div className="justify-center flex pt-5">
                <Pagination
                    current={page}
                    pageSize={limit}
                    total={filteredList.length}
                    onChange={setPage}
                    showSizeChanger={false}
                />
            </div>
        </>
    );
}

export default PokemonPreview;

