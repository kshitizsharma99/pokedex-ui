import { Input, Tag } from "antd";
import { useState } from "react";

const allTypes = [
    "normal", "fire", "water", "grass", "electric", "ice", "fighting",
    "poison", "ground", "flying", "psychic", "bug", "rock", "ghost",
    "dark", "dragon", "steel", "fairy"
];

function Filter({ onSearch, selectedType, setSelectedType }) {
    const [searchText, setSearchText] = useState("");

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        onSearch(value);
    };

    return (
        <div className="p-5">
            {/* Search bar */}
            <Input
                placeholder="Search Pokémon by name..."
                value={searchText}
                onChange={handleSearch}
                className="mb-4"
            />

            {/* Type tags */}
            <div className="flex flex-wrap gap-2">
                {allTypes.map((type) => (
                    <Tag
                        key={type}
                        className={`!uppercase !font-bold cursor-pointer ${selectedType === type ? "!bg-black text-white" : "!bg-gray-200 text-black"
                            }`}
                        onClick={() =>
                            setSelectedType(selectedType === type ? null : type)
                        }
                    >
                        {type}
                    </Tag>
                ))}
            </div>
        </div>
    );
}

export default Filter;
