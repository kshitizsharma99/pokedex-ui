import { Button, Image } from 'antd';
import { NavLink } from 'react-router-dom';

function Navbar() {
    const bannerImg = "/icon/icon_128.png";

    return (
        <div className="navbar p-5 flex align-center flex-wrap">
            <div className="banner mx-1">
                <Image preview={false} src={bannerImg} height={30} width={30} />
            </div>

            <div className="home-button">
                <NavLink to={"/"}>
                    <Button type="text">
                        Home
                    </Button>
                </NavLink>
            </div>

            <div className="pokedex-button">
                <NavLink to={"/pokedex"}>
                    <Button type="text">
                        Pokedex
                    </Button>
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar;