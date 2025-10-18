import { Button, Flex } from 'antd';

function Navbar(props) {
    const { handlePage } = props

    return (
        <div className="navbar p-5 flex">
            <div className="home-button mx-2 ">
                <Button onClick={() => { handlePage("home") }} type="text">Home</Button>
            </div>
            <div className="pokedex-button mx-2 ">
                <Button onClick={() => { handlePage("pokedex") }} type="text">Pokedex</Button>
            </div>
        </div>
    )
}

export default Navbar;