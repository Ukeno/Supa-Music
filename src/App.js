import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Discover from "./pages/Discover"

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>Ⓢ𝓊𝓅𝒶 𝑀𝓊𝓈𝒾𝒸</h1>
        <Link to="/Discover">Discover</Link>
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
        <Route path="/discover" element={<Discover />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;