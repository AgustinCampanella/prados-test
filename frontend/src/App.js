import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";
import Lots from "./pages/Lots";
import Sustainability from "./pages/Sustainability";
import Gallery from "./pages/Gallery";
import Location from "./pages/Location";
import Contact from "./pages/Contact";
import ReferEarn from "./pages/ReferEarn";
import SellLand from "./pages/SellLand";
import Events from "./pages/Events";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Admin from "./pages/Admin";

// Component to conditionally render Header and Footer
function Layout({ children }) {
  const location = useLocation();
  const isAdminPanel = location.pathname === '/admin-panel-prados';

  return (
    <>
      {!isAdminPanel && <Header />}
      {children}
      {!isAdminPanel && <Footer />}
      {!isAdminPanel && <WhatsAppButton />}
      <Toaster />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/proyecto" element={<Project />} />
            <Route path="/lotes" element={<Lots />} />
            <Route path="/sostenibilidad" element={<Sustainability />} />
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/ubicacion" element={<Location />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/refiere-y-gana" element={<ReferEarn />} />
            <Route path="/vende-tu-terreno" element={<SellLand />} />
            <Route path="/eventos" element={<Events />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/admin-panel-prados" element={<Admin />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
