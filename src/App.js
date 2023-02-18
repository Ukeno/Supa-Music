import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Delete from "./pages/Delete"

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>Supa Music</h1>
        <Link to="/">Home</Link>
        <input type="text" placeholder="Working on it.."></input>
        <Link to="/create">Create</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
        <Route path="/delete" element={<Delete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;