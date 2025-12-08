import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { phoneNumber, email, address } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sobre Nosotros */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Prados de Paraíso</h3>
            <p className="text-sm text-stone-400 mb-4">
              Un proyecto inspirado en la naturaleza y en un futuro más consciente.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-brand-green/20 flex items-center justify-center hover:bg-brand-green transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-brand-green/20 flex items-center justify-center hover:bg-brand-green transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Enlaces */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-stone-400 hover:text-brand-green-light transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-sm text-stone-400 hover:text-brand-green-light transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/proyecto" className="text-sm text-stone-400 hover:text-brand-green-light transition-colors">
                  El Proyecto
                </Link>
              </li>
              <li>
                <Link to="/lotes" className="text-sm text-stone-400 hover:text-brand-green-light transition-colors">
                  Lotes
                </Link>
              </li>
              <li>
                <Link to="/sostenibilidad" className="text-sm text-stone-400 hover:text-brand-green-light transition-colors">
                  Sostenibilidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Proyectos */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Proyectos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/lotes" className="text-sm text-stone-400 hover:text-brand-green-light transition-colors">
                  Casa Huerto Ecológico
                </Link>
              </li>
              <li>
                <Link to="/lotes" className="text-sm text-stone-400 hover:text-brand-green-light transition-colors">
                  Villa Eco-Sostenible
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-sm text-stone-400 hover:text-brand-green-light transition-colors">
                  Galería
                </Link>
              </li>
              <li>
                <Link to="/ubicacion" className="text-sm text-stone-400 hover:text-brand-green-light transition-colors">
                  Ubicación
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-green/100 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-stone-400">{address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brand-green/100 flex-shrink-0" />
                <a href={`tel:${phoneNumber}`} className="text-sm text-stone-400 hover:text-brand-green-light transition-colors">
                  {phoneNumber}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-green/100 flex-shrink-0" />
                <a href={`mailto:${email}`} className="text-sm text-stone-400 hover:text-brand-green-light transition-colors">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-stone-400">
              © {currentYear} Prados de Paraíso. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link to="/terminos" className="text-sm text-stone-400 hover:text-brand-green-light transition-colors">
                Términos y condiciones
              </Link>
              <Link to="/privacidad" className="text-sm text-stone-400 hover:text-brand-green-light transition-colors">
                Política de privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
