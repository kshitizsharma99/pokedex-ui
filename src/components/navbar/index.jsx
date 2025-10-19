import { Button, Flex } from 'antd';

function Navbar({ handlePage, activePage }) {


    return (
        <div className="navbar p-5 flex">
            <div className="home-button mx-2 ">
                <Button onClick={() => { handlePage("home") }} type="text"
                    className={activePage === "home" ? "!text-red-500 !font-bold" : "!text-gray-600"}>Home</Button>
            </div>
            <div className="pokedex-button mx-2 ">
                <Button onClick={() => { handlePage("pokedex") }} type="text"
                    className={activePage === "pokedex" ? "!text-red-500 !font-bold" : "!text-gray-600"}>Pokedex</Button>
            </div>
        </div>
    )
}

export default Navbar;