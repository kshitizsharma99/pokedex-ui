function AboutLore({ pokemons }) {

    if (!pokemons) return <p>Loading Lore...</p>;

    const uniqueTexts = [];
    const seen = new Set();

    (pokemons.englishFlavorTexts || []).forEach(entry => {
        if (!entry?.flavor_text) return;
        const cleanText = entry.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ').trim();
        const key = `${cleanText}-${entry.version}`;
        if (!seen.has(key)) {
            seen.add(key);
            uniqueTexts.push({
                text: cleanText,
                version: entry.version
            });
        }
    });

    return (
        <div className="space-y-2">
            {uniqueTexts.length > 0 ? (
                uniqueTexts.map((entry, i) => (
                    <p key={i}>
                        <span className="font-bold capitalize mr-2">{entry.version}:</span>
                        {entry.text}
                    </p>
                ))
            ) : (
                <p className="text-gray-500">No lore available for this Pokémon.</p>
            )}
        </div>
    );
}

export default AboutLore;
