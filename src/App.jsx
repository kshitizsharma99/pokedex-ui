import "./index.css"
import Layout from "./components/layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Explore from "./pages/explore"
import Pokedex from "./pages/pokedex"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full overflow-x-hidden flex justify-center">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/explore" element={<Explore />} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  )
}

export default App
