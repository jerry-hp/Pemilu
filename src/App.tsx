import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home.tsx";
import AddPartai from "./pages/addPartai.tsx";
import AddPaslon from "./pages/addPaslon.tsx";
import UpdatePartai from "./pages/updatePartai.tsx";
import UpdatePaslon from "./pages/updatePaslon.tsx";
import Profil from "./pages/Profil.tsx";
import Login from "./pages/Login.tsx";

function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/addPartai" element={<AddPartai />} />
            <Route path="/addPaslon" element={<AddPaslon />} />
            <Route path="/updatePartai/:id" element={<UpdatePartai />} />
            <Route path="/updatePaslon/:id" element={<UpdatePaslon />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
