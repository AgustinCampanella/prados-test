import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Eye, Target, Heart, MessageCircle } from 'lucide-react';
import { whatsappNumber } from '../data/mock';

const About = () => {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hola, quiero más información sobre Prados de Paraíso`, '_blank');
  };

  const values = [
    { title: 'Sostenibilidad', description: 'Comprometidos con el medio ambiente' },
    { title: 'Conexión con la naturaleza', description: 'Vivir en armonía con el entorno' },
    { title: 'Compromiso social', description: 'Desarrollo comunitario responsable' },
    { title: 'Bienestar colectivo', description: 'Calidad de vida para todas las familias' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1592711491694-e85f60a7773a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBvdXRkb29yfGVufDB8fHx8MTc2MzQzMDg0Mnww&ixlib=rb-4.1.0&q=85"
            alt="Sobre Nosotros"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/70 to-stone-900/50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Un proyecto nacido del <span className="text-brand-green-light">equilibrio</span>
            </h1>
            <p className="text-2xl text-stone-200">
              Entre el ser humano y la naturaleza
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-stone-700 leading-relaxed mb-8">
              Desde <span className="font-bold text-brand-green">2015</span>, Prados de Paraíso desarrolla un concepto de vivienda sostenible donde la naturaleza es la protagonista. Buscamos inspirar a las familias a vivir en armonía, respetando el entorno y generando un impacto positivo en la comunidad local.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
              Nuestra <span className="text-brand-green">Esencia</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {/* Vision */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 rounded-full bg-brand-green/20 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-brand-green" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4">Visión</h3>
                <p className="text-lg text-stone-700">
                  Construir comunidades eco-sostenibles que proyecten bienestar y futuro.
                </p>
              </CardContent>
            </Card>

            {/* Mission */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 rounded-full bg-brand-green/20 flex items-center justify-center">
                  <Target className="w-8 h-8 text-brand-green" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4">Misión</h3>
                <p className="text-lg text-stone-700">
                  Integrar desarrollo responsable, diseño consciente y respeto por la biodiversidad en cada espacio.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-stone-900 mb-4">ADN de Marca</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="border-2 border-brand-green/20 hover:border-brand-green300 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Heart className="w-10 h-10 text-brand-green mx-auto mb-3" />
                    <h4 className="font-bold text-stone-900 mb-2">{value.title}</h4>
                    <p className="text-sm text-stone-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Archetype */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
              Arquetipo de Marca
            </h2>
            <p className="text-2xl text-brand-green font-semibold mb-6">
              Explorador, inspirador y valiente
            </p>
            <p className="text-xl text-stone-700">
              Una marca que invita a descubrir, soñar y construir un estilo de vida diferente.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-green">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Quieres ser parte de esta visión?
          </h2>
          <p className="text-xl text-brand-green/10 mb-10 max-w-3xl mx-auto">
            Descubre cómo puedes vivir en armonía con la naturaleza en Prados de Paraíso.
          </p>
          <Button
            onClick={handleWhatsApp}
            size="lg"
            className="bg-white text-brand-green-dark hover:bg-stone-100 px-8 py-6 text-lg shadow-xl"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Contactar ahora
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
