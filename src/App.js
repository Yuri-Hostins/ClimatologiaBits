import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


// Homepage
import Homepage from "./pages/homepage";

// Rota Obrigado
import Obrigado from "./pages/obrigado";

// Error 404
import NotFound from "./pages/NotFound";

// Rotas das paginas de conteudos
import SubtropicalPage from "./pages/conteudos/Subtropical";


function App() {

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     const key = e.key.toLowerCase();

  //     // Bloqueia F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J, Ctrl+U
  //     if (
  //       e.key === 'F12' ||
  //       (e.ctrlKey && e.shiftKey && (key === 'i' || key === 'c' || key === 'j')) ||
  //       (e.ctrlKey && key === 'u')
  //     ) {
  //       e.preventDefault();
  //       return false;
  //     }
  //   };

  //   const handleContextMenu = (e) => {
  //     e.preventDefault(); // Bloqueia botão direito
  //   };

  //   document.addEventListener('keydown', handleKeyDown);
  //   document.addEventListener('contextmenu', handleContextMenu);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //   };
  // }, []);

  return (
    <>
      <Router>
        <Routes>
          {/* Rota pública de login */}
          <Route path="/" element={<Homepage />} />

          <Route path="/conteudos/subtropical" element={<SubtropicalPage />} />
          <Route path="/obrigado" element={<Obrigado />} />

          {/* Rota para erros ou 404 */}
          <Route path="*" element={ <NotFound /> } />

        </Routes>
      </Router>
    </>
  );
}

export default App;