import tagColors from "../../util/tagColors";
import { Tag } from "antd";

const EvolutionTab = ({ pokemons }) => {

    if (!pokemons?.evolution || pokemons.evolution.length === 0) {
        return <p className="text-gray-500 text-center">This Pokémon does not evolve.</p>;
    }


    return (
        <div>
            <h2>Evolution Chain</h2>
            <div className="flex flex-wrap gap-8 items-center">
                {pokemons.evolution.map((evo, index) => (
                    <div key={index} className="text-center">
                        <img src={evo.image} alt={evo.name} width={150} />
                        <h3>{evo.name.toUpperCase()}</h3>
                        <div>
                            {evo.types.map((type, i) => (
                                <Tag
                                    key={i}
                                    className="!font-bold !uppercase !rounded-full"
                                    color={tagColors[type.toLowerCase()] || "default"}
                                >
                                    {type}
                                </Tag>
                            ))}
                        </div>
                        <p>ID: #{evo.id}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EvolutionTab;
