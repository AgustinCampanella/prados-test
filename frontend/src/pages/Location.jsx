import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { MapPin, Clock, Navigation, Phone } from 'lucide-react';
import { address, coordinates, whatsappNumber } from '../data/mock';

const Location = () => {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hola, quiero visitar Prados de Paraíso`, '_blank');
  };

  const handleWaze = () => {
    window.open(`https://ul.waze.com/ul?place=ChIJw5u1E4PdBpER7qnrPgMVgBM&ll=${coordinates.lat}%2C${coordinates.lng}&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location`, '_blank');
  };

  const handleGoogleMaps = () => {
    window.open(`https://www.google.com/maps?ll=${coordinates.lat},${coordinates.lng}&z=13&t=m&hl=es-ES&gl=US&mapclient=embed`, '_blank');
  };

  const benefits = [
    {
      icon: Clock,
      title: 'Fácil acceso desde Lima',
      description: 'Solo 3 horas por la Panamericana Norte'
    },
    {
      icon: MapPin,
      title: 'Rico ecosistema natural',
      description: 'Humedales, playas y biodiversidad'
    },
    {
      icon: Navigation,
      title: 'Zona en crecimiento',
      description: 'Alto potencial de valorización'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 bg-stone-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            A solo <span className="text-brand-green-light">3 horas de Lima</span>
          </h1>
          <p className="text-2xl text-stone-200">
            Un paraíso natural por descubrir
          </p>
        </div>
      </section>

      {/* Location Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <MapPin className="w-8 h-8 text-brand-green flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold text-stone-900 mb-2">Ubicación</h3>
                    <p className="text-lg text-stone-700">{address}</p>
                  </div>
                </div>
                <p className="text-lg text-stone-600 mb-8">
                  Estamos ubicados en el Km 137 de la Panamericana Norte, en "El Paraíso", Huacho. Un entorno privilegiado con playas, humedales, lagunas y un ecosistema vibrante.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleGoogleMaps}
                    className="bg-brand-green hover:bg-brand-green-dark text-white"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Abrir en Google Maps
                  </Button>
                  <Button
                    onClick={handleWaze}
                    variant="outline"
                    className="border-brand-green text-brand-green hover:bg-brand-green/10"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Abrir en Waze
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits of Location */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-stone-900 text-center mb-12">
              Beneficios de la <span className="text-brand-green">ubicación</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-green/20 flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-brand-green" />
                      </div>
                      <h3 className="text-xl font-bold text-stone-900 mb-2">{benefit.title}</h3>
                      <p className="text-stone-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDEyJzQ3LjkiUyA3N8KwMzQnMTcuMiJX!5e0!3m2!1ses!2spe!4v1234567890123!5m2!1ses!2spe`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Prados de Paraíso"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <div className="relative h-80 overflow-hidden rounded-2xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1631071902017-cd28b02e2543?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxiZWFjaCUyMFBlcnV8ZW58MHx8fHwxNzYzNDMwODM1fDA&ixlib=rb-4.1.0&q=85"
                alt="Playa El Paraíso"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent flex items-end">
                <p className="text-white font-semibold text-xl p-6">Playa El Paraíso</p>
              </div>
            </div>
            <div className="relative h-80 overflow-hidden rounded-2xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1667170048452-ebecb622b96a"
                alt="Humedales"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent flex items-end">
                <p className="text-white font-semibold text-xl p-6">Humedales naturales</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-green">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para visitarnos?
          </h2>
          <p className="text-xl text-brand-green/10 mb-10 max-w-3xl mx-auto">
            Agenda una visita y descubre en persona la magia de Prados de Paraíso.
          </p>
          <Button
            onClick={handleWhatsApp}
            size="lg"
            className="bg-white text-brand-green-dark hover:bg-stone-100 px-8 py-6 text-lg shadow-xl"
          >
            <Phone className="w-5 h-5 mr-2" />
            Agendar visita
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Location;
