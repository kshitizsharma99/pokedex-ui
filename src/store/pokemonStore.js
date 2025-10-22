import { create } from "zustand";
import axios from "axios";

const usePokemonStore = create((set, get) => ({
    selectedPokemon: null,
    setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),


    fetchMorePokemonDetails: async () => {
        const pokemon = get().selectedPokemon;

        if (!pokemon || !pokemon.id) {
            console.warn("No Pokémon selected yet, skipping move fetch.");
            return;
        }

        try {
            const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);

            const evolutionChainUrl = speciesRes.data.evolution_chain.url;
            const chainRes = await axios.get(evolutionChainUrl);

            const chain = chainRes.data.chain;

            const fetchEvolutions = async (chain) => {
                let evoData = [];
                let current = chain;

                while (current) {
                    const evoName = current.species.name;
                    const evoRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evoName}`);

                    evoData.push({
                        id: evoRes.data.id,
                        name: evoRes.data.name,
                        image: evoRes.data.sprites.other["official-artwork"].front_default,
                        shiny: evoRes.data.sprites.other["official-artwork"].front_shiny,
                        types: evoRes.data.types.map(t => t.type.name),
                    });

                    current = current.evolves_to[0]; // Move to next evolution
                }

                return evoData;
            };

            const evolutionData = await fetchEvolutions(chain);


            const normalHD =
                res.data.sprites.other["official-artwork"].front_default;

            const shinyHD =
                res.data.sprites.other["official-artwork"].front_shiny;

            const englishFlavorTexts = speciesRes.data.flavor_text_entries
                .filter(entry => entry.language.name === "en")
                .map(entry => ({
                    flavor_text: entry.flavor_text,
                    version: entry.version.name,
                }));



            const moves = res.data.moves;

            // Fetch full move info
            const movesDetails = await Promise.all(
                moves.map(async (m) => {
                    const moveRes = await axios.get(m.move.url);
                    return {
                        name: moveRes.data.name,
                        type: moveRes.data.type.name,
                        power: moveRes.data.power || "—",
                        accuracy: moveRes.data.accuracy || "—",
                        pp: moveRes.data.pp,
                        damage_class: moveRes.data.damage_class.name,
                        description:
                            moveRes.data.effect_entries.find(e => e.language.name === "en")?.short_effect ||
                            "No description available.",
                    };
                })
            );

            set({
                selectedPokemon: {
                    ...pokemon,

                    movesDetails: movesDetails,
                    englishFlavorTexts: englishFlavorTexts,
                    evolution: evolutionData,
                    images: {
                        normal: normalHD,
                        shiny: shinyHD
                    },
                }
            });
        } catch (error) {
            console.error("Error fetching extra Pokémon details:", error);
        }
    }
}));

export default usePokemonStore;
