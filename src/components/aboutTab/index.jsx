import typeChart from "../../util/typeChart"
import { Tag, Button, Tabs, Progress } from "antd";
import tagColors from "../../util/tagColors";
import abilityColors from "../../util/abilityColors";
import statColors from "../../util/statColors";
import barColors from "../../util/barColors";
import statNicknames from "../../util/statNicknames";

function AboutTab({ pokemons }) {

    const weaknesses = [...new Set(pokemons.types.flatMap(type => typeChart[type]?.weak || []))];

    return (
        <div>
            <div className="mb-3">
                <p className="font-bold capitalize pb-2 text-base">Weaknesses</p>
                <div className="flex gap-1 flex-wrap ">

                    {weaknesses.length > 0 ? (
                        weaknesses.map((type, i) => (
                            <Tag
                                key={i}
                                className="!font-bold !uppercase !text-xs !px-3 !pt-1 !pb-1 !rounded-full !min-w-[90px] !text-center"
                                color={tagColors[type.toLowerCase()] || "default"}
                            >
                                {type}
                            </Tag>
                        ))
                    ) : (
                        <p className="text-gray-500">No significant weaknesses</p>
                    )}
                </div>
            </div>
            <div className=" mb-2">
                <p className="font-bold capitalize my-1 text-base">Abilities</p>
                <div className="flex flex-wrap justify-start my-2">
                    {pokemons.abilities.map((ability, i) => (
                        <Tag
                            key={i}
                            className="!font-bold !capitalize !text-xs !pr-7 !pl-7 !pt-1 !pb-1 !rounded-full !min-w-[90px]"
                            color={abilityColors[ability] || "default"}
                        >
                            {ability}
                        </Tag>
                    ))}
                </div>
            </div>
            <div className="flex flex-wrap justify-start my-1">
                <div>
                    <p className="font-bold capitalize text-base py-2">Height</p>
                    <Tag className="!font-bold !capitalize !text-xs !pr-7 !pl-7 !pt-1 !pb-1 !rounded-full !min-w-[90px]">{pokemons.height}m</Tag>
                </div>
                <div>
                    <p className="font-bold capitalize text-base py-2">weight</p>
                    <Tag className="!font-bold !capitalize !text-xs !pr-7 !pl-7 !pt-1 !pb-1 !rounded-full !min-w-[90px]">{pokemons.weight}Kg</Tag>
                </div>

            </div>
            <div className="pb-1">
                <p className="font-bold capitalize text-base py-2">Base Stats</p>
                <div className="flex flex-col gap-2">
                    {pokemons.stats.map((stat, i) => (
                        <div key={i} className="flex items-center gap-2">

                            <p className={`w-22 text-[12px] font-bold`}>
                                {stat.name.replace("-", " ")}
                            </p>

                            <span className="w-5 text-right text-[12px] font-bold">{stat.base}</span>

                            <Progress
                                percent={Math.min(stat.base, 150)}
                                showInfo={false}
                                strokeColor={barColors[stat.name] || "bg-gray-400"}
                                trailColor="#e0e0e0"
                                strokeWidth={5}
                                className="flex-1 !pb-1"
                            />
                        </div>
                    ))}
                </div>

            </div>
        </div>

    );
}
export default AboutTab;