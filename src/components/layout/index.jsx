import Navbar from "../navbar";
import Footer from "../footer";
import Home from "../../pages/home";
import Pokedex from "../../pages/pokedex";
import { useState } from "react";


function Layout() {
    const [page, setPage] = useState("home");

    const handlePage = (value) => {
        setPage(value)
    }

    return (
        <div className="w-5/6 px-2">
            <div className="bg-white mt-5 mb-5 rounded-lg shadow-xl">
                <Navbar handlePage={handlePage} activePage={page} />
            </div>
            <div>
                {
                    page == "home" ? <Home /> : null
                }
                {
                    page == "pokedex" ? <Pokedex /> : null
                }
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Layout;