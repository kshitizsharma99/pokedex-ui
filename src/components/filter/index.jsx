import { Input, Image, Dropdown, Tag, Button, Select } from "antd";
import { useState } from "react";
import allTypes from "../../util/allTypes";

function Filter({ onSearch, selectedType, setSelectedType }) {
    const [searchText, setSearchText] = useState("");
    const bannerImg = "/icon/icon_128.png";

    const { Option } = Select;

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        onSearch(value);
    };



    return (
        <div>

            <div className="mb-3 relative">
                <Input
                    placeholder="Search your Pokemon!"
                    value={searchText}
                    onChange={handleSearch}
                    className="!border-none !shadow-2xl !p-4 !rounded-lg"
                // suffix={
                //     <Image
                //         preview={false}
                //         src={bannerImg}
                //         width={30}
                //         height={30}
                //     />
                // }
                />
            </div>

            <Select
                mode="multiple"
                placeholder="Type"
                value={selectedType}
                onChange={(values) => setSelectedType(values)}
                showSearch={false}
                maxTagCount={Infinity}
                style={{
                    minWidth: 80,
                    maxWidth: "100%",
                    width: "auto",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                }}
                optionLabelProp="label"
                className="!cursor-pointer !capitalize"
                dropdownClassName="cursor-pointer"
                dropdownMatchSelectWidth={false}
            >
                {allTypes.map((type) => (
                    <Option key={type} value={type} label={type} className=" !capitalize">
                        {type}
                    </Option>
                ))}
            </Select>

        </div>
    );
}

export default Filter;
