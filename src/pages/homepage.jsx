import React from "react";
import { useEffect } from "react";
import Navbar from "../components/layout/navbar";
import Banner from "../components/homepage/banner";
import Sobre from "../components/homepage/sobre";
import Promo from "../components/homepage/PromoStrip.jsx";
import Conteudos from "../components/homepage/conteudos";
import Integrantes from "../components/homepage/integrantes";
import Contato from "../components/homepage/contato.jsx";
import Footer from "../components/layout/footer.jsx";

import "../styles/home.css";

export default function Homepage() {

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const to = params.get("to");
  if (!to) return;
  const el = document.getElementById(to);
  if (el) {
    // pequena espera para garantir que sections e imagens já renderizaram
    setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    // remove o ?to=... da barra de endereço
    const clean = window.location.origin + window.location.pathname;
    window.history.replaceState({}, "", clean);
  }
}, []);

  return (
    <div id="homepage">
       <Navbar />
       <Banner />
       <Sobre />
       <Promo />
       <Conteudos />
       <Integrantes />
       <Contato />
       <Footer />
    </div>
  );
}
