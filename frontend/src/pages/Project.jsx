import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Home, Trees, Flower2, Waves, ArrowRight } from 'lucide-react';
import { whatsappNumber } from '../data/mock';

const Project = () => {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hola, quiero explorar el proyecto Prados de Paraíso`, '_blank');
  };

  const features = [
    {
      icon: Home,
      title: 'Lotes amplios',
      description: 'Para vivienda o inversión'
    },
    {
      icon: Trees,
      title: 'Zonas verdes',
      description: 'Senderos y espacios de recreación'
    },
    {
      icon: Flower2,
      title: 'Huertos orgánicos',
      description: 'Áreas de cultivo comunitario'
    },
    {
      icon: Waves,
      title: 'Conectividad natural',
      description: 'Directa con la naturaleza'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1761571740780-d9149a88b759"
            alt="Villa Eco-Sostenible"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/85 via-stone-900/65 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Una villa eco-sostenible donde{' '}
              <span className="text-brand-green-light">florece la vida</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-stone-700 leading-relaxed mb-6">
              Prados de Paraíso está ubicado en <span className="font-bold text-brand-green">El Paraíso, Huacho</span>, un lugar rodeado de humedales, playas, lagunas y diversidad natural.
            </p>
            <p className="text-xl text-stone-700 leading-relaxed">
              Cada espacio del proyecto ha sido diseñado para convivir con el entorno, respetando su belleza y potenciando su valor.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
              Características del <span className="text-brand-green">Proyecto</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-green/20 flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-brand-green" />
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2">{feature.title}</h3>
                    <p className="text-stone-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="max-w-4xl mx-auto">
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg text-stone-700">Lotes amplios para vivienda o inversión</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg text-stone-700">Zonas verdes, senderos y espacios de recreación</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg text-stone-700">Huertos y áreas de cultivo</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg text-stone-700">Conectividad directa con la naturaleza</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg text-stone-700">Urbanización sostenible en crecimiento</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative h-64 overflow-hidden rounded-2xl shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1700601022750-96c538dccff4"
                alt="Senderos naturales"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent flex items-end">
                <p className="text-white font-semibold p-4">Senderos naturales</p>
              </div>
            </div>
            <div className="relative h-64 overflow-hidden rounded-2xl shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1600540520314-cbc1ddc91f3b"
                alt="Espacios verdes"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent flex items-end">
                <p className="text-white font-semibold p-4">Espacios verdes amplios</p>
              </div>
            </div>
            <div className="relative h-64 overflow-hidden rounded-2xl shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1649518811431-48cb38252f79"
                alt="Arquitectura sostenible"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent flex items-end">
                <p className="text-white font-semibold p-4">Arquitectura eco-sostenible</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspiration Quote */}
      <section className="py-20 bg-brand-green/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-3xl md:text-4xl font-bold text-stone-900 mb-6 italic">
              "Aquí no solo construyes una casa:
              <span className="text-brand-green"> construyes un estilo de vida</span>"
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-green">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-10">
            ¿Listo para explorar el proyecto?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleWhatsApp}
              size="lg"
              className="bg-white text-brand-green-dark hover:bg-stone-100 px-8 py-6 text-lg shadow-xl"
            >
              Explorar el proyecto
            </Button>
            <Link to="/lotes">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-brand-green-dark px-8 py-6 text-lg"
              >
                Ver lotes disponibles <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Project;
