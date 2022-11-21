import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import FullList from "./pages/FullList";
import Home from "./pages/Home";

function App() {
  console.log("rendering");
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col justify-between text-slate-600">
        <div className="w-full">
          <Navbar />
          <div className="max-w-7xl mx-auto px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/full-list" element={<FullList />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
