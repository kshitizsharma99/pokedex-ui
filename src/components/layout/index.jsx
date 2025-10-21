import Navbar from "../navbar";
import Footer from "../footer";

function Layout({ children }) {
    return (
        <div className="w-5/6 px-2">
            <div className="bg-white mt-5 mb-5 rounded-lg shadow-xl">
                <Navbar />
            </div>

            <div>
                {children}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Layout;