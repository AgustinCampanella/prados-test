import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Leaf, MessageCircle } from 'lucide-react';
import { mockSustainability, whatsappNumber } from '../data/mock';

const Sustainability = () => {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hola, quiero saber más sobre sostenibilidad en Prados de Paraíso`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1629267699730-f7467e129e65?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxiaW9kaXZlcnNpdHl8ZW58MHx8fHwxNzYzNDMwNzMxfDA&ixlib=rb-4.1.0&q=85"
            alt="Sostenibilidad"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/75 to-stone-900/60"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Un proyecto comprometido con el{' '}
              <span className="text-brand-green-light">medio ambiente</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <p className="text-xl text-stone-700 leading-relaxed">
              Nuestra propuesta nace del respeto por la biodiversidad del <span className="font-bold text-brand-green">Humedal El Paraíso</span>. Conservamos, integramos y protegemos cada recurso natural, creando un entorno responsable y sostenible.
            </p>
          </div>

          {/* Pillars Section */}
          <div className="mb-16">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
                Pilares <span className="text-brand-green">Sostenibles</span>
              </h2>
            </div>

            <div className="space-y-12">
              {mockSustainability.map((pillar, index) => (
                <Card
                  key={index}
                  className={`overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                    index % 2 === 0 ? '' : ''
                  }`}
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${
                    index % 2 === 0 ? '' : 'lg:grid-flow-dense'
                  }`}>
                    <div className={`relative h-80 lg:h-auto ${
                      index % 2 === 0 ? '' : 'lg:col-start-2'
                    }`}>
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className={`p-8 lg:p-12 flex flex-col justify-center ${
                      index % 2 === 0 ? '' : 'lg:col-start-1'
                    }`}>
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-green/20 mb-6">
                        <span className="text-3xl font-bold text-brand-green">{pillar.number}</span>
                      </div>
                      <h3 className="text-3xl font-bold text-stone-900 mb-4">{pillar.title}</h3>
                      <p className="text-lg text-stone-700 leading-relaxed">{pillar.description}</p>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 border-brand-green/30 bg-white hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Leaf className="w-12 h-12 text-brand-green mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-stone-900 mb-2">Biodiversidad</h4>
                  <p className="text-sm text-stone-600">Protección de flora y fauna nativa</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-brand-green/30 bg-white hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Leaf className="w-12 h-12 text-brand-green mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-stone-900 mb-2">Energía limpia</h4>
                  <p className="text-sm text-stone-600">Uso de tecnologías ecológicas</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-brand-green/30 bg-white hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Leaf className="w-12 h-12 text-brand-green mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-stone-900 mb-2">Compostaje</h4>
                  <p className="text-sm text-stone-600">Gestión de residuos orgánicos</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-brand-blue text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-3xl md:text-4xl font-bold text-white mb-6">
              "Sostenibilidad no es un concepto:
            </p>
            <p className="text-4xl md:text-5xl font-bold text-white">
              es nuestro estilo de vida"
            </p>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative h-64 overflow-hidden rounded-2xl shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1616364817046-0607a75f3233?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxvcmdhbmljJTIwZ2FyZGVufGVufDB8fHx8MTc2MzQzMDcyNnww&ixlib=rb-4.1.0&q=85"
                alt="Biohuerto orgánico"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent flex items-end">
                <p className="text-white font-semibold p-4">Biohuerto orgánico</p>
              </div>
            </div>
            <div className="relative h-64 overflow-hidden rounded-2xl shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1528164646014-c17e20821ec2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHx3ZXRsYW5kc3xlbnwwfHx8fDE3NjM0MzA3Mzd8MA&ixlib=rb-4.1.0&q=85"
                alt="Fauna del humedal"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent flex items-end">
                <p className="text-white font-semibold p-4">Fauna del humedal</p>
              </div>
            </div>
            <div className="relative h-64 overflow-hidden rounded-2xl shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1574786198875-49f5d09fe2d2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHx3ZXRsYW5kc3xlbnwwfHx8fDE3NjM0MzA3Mzd8MA&ixlib=rb-4.1.0&q=85"
                alt="Ecosistema protegido"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent flex items-end">
                <p className="text-white font-semibold p-4">Ecosistema protegido</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            Únete a un proyecto que cuida el futuro
          </h2>
          <p className="text-xl text-stone-600 mb-10 max-w-3xl mx-auto">
            Descubre cómo puedes formar parte de una comunidad comprometida con el medio ambiente.
          </p>
          <Button
            onClick={handleWhatsApp}
            size="lg"
            className="bg-brand-green hover:bg-brand-green-dark text-white px-8 py-6 text-lg shadow-xl"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Conoce más sobre sostenibilidad
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Sustainability;
