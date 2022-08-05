import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Home from "./pages/Home";

function App() {
   console.log("rendering");
   return (
      <BrowserRouter>
         <div className="min-h-screen px-4 flex flex-col justify-between text-slate-600">
            <div className="w-full">
               <div className="max-w-7xl mx-auto">
                  <Navbar />
                  <div className="px-8">
                     <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/edit" element={<Edit />} />
                     </Routes>
                  </div>
               </div>
            </div>
            <Footer />
         </div>
      </BrowserRouter>
   );
}

export default App;
