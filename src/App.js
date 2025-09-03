import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


// Rotas
import Homepage from "./pages/homepage.jsx";

// import funcionariosRoutes from "./routes/funcionariosRoutes";

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

          {/* Rota para erros ou 404 */}
          {/* {errosRoutes} */}
        </Routes>
      </Router>
    </>
  );
}

export default App;