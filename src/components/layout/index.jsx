import Navbar from "../navbar";
import Footer from "../footer";
import Home from "../../pages/home";
import Pokedex from "../../pages/pokedex";

function Layout() {
    return (
        <div className="layout">
            <div>
                <Navbar />
            </div>
            <div>
                <Home />
                <Pokedex />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Layout;