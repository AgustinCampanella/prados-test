import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MapPin, TrendingUp, Shield, Sprout, Download, Calendar, Phone, DollarSign, Maximize } from 'lucide-react';
import { whatsappNumber } from '../data/mock';

const Lots = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/`);
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleWhatsApp = (project) => {
    const message = `Hola, quiero consultar sobre el proyecto ${project}`;
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const benefits = [
    {
      icon: MapPin,
      title: 'Ubicación estratégica',
      description: 'A solo 3 horas de Lima'
    },
    {
      icon: Sprout,
      title: 'Entorno ecológico',
      description: 'Rodeado de naturaleza'
    },
    {
      icon: TrendingUp,
      title: 'Crecimiento constante',
      description: 'Zona en desarrollo'
    },
    {
      icon: Shield,
      title: 'Comunidad segura',
      description: 'Proyecto consolidado'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1738774724083-50fcaf2f3e7e"
            alt="Lotes disponibles"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/85 via-stone-900/70 to-stone-900/50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Lotes diseñados para{' '}
              <span className="text-brand-green-light">tus sueños</span>
            </h1>
            <p className="text-xl text-stone-200">
              Disponemos de lotes pensados para quienes buscan vivir en armonía con la naturaleza o invertir en un proyecto con alta proyección de crecimiento.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
              Nuestros <span className="text-brand-green">Proyectos</span>
            </h2>
            <p className="text-xl text-stone-600">
              Elige el espacio perfecto para construir tu vida futura
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="text-xl text-stone-600">Cargando proyectos...</div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-xl text-stone-600">No hay proyectos disponibles</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-80">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className={`absolute top-4 right-4 text-white px-4 py-2 text-sm font-semibold ${
                      project.status === 'Vendido' 
                        ? 'bg-red-500' 
                        : project.status === 'Disponible' 
                        ? 'bg-green-500' 
                        : project.status === 'Reservado'
                        ? 'bg-yellow-500'
                        : 'bg-brand-green'
                    }`}>
                      {project.status}
                    </Badge>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-3xl font-bold text-stone-900 mb-4">{project.title}</h3>
                    <p className="text-stone-600 mb-6">{project.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-brand-green/10 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Maximize className="w-4 h-4 text-brand-green" />
                          <p className="text-sm text-stone-600">Área</p>
                        </div>
                        <p className="text-xl font-bold text-brand-green">{project.area}</p>
                      </div>
                      <div className="bg-brand-green/10 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="w-4 h-4 text-brand-green" />
                          <p className="text-sm text-stone-600">Precio</p>
                        </div>
                        <p className="text-xl font-bold text-brand-green">{project.price}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-brand-green" />
                        <p className="text-sm text-stone-600">{project.address}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={() => handleWhatsApp(project.title)}
                        className="flex-1 bg-brand-green hover:bg-brand-green-dark text-white"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Consultar proyecto
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-brand-green text-brand-green hover:bg-brand-green/10"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Más información
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <p className="text-center text-sm text-stone-500 italic">
            Atención personalizada para cada cliente.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
              <span className="text-brand-green">Beneficios</span> de invertir
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <CardContent className="p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-green/20 flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-brand-green" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 mb-2">{benefit.title}</h3>
                    <p className="text-stone-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-green">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para empezar tu proyecto?
          </h2>
          <p className="text-xl text-brand-green/10 mb-10 max-w-3xl mx-auto">
            Contáctanos para obtener información detallada sobre disponibilidad, precios y opciones de financiamiento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => handleWhatsApp('Prados de Paraíso')}
              size="lg"
              className="bg-white text-brand-green-dark hover:bg-stone-100 px-8 py-6 text-lg shadow-xl"
            >
              <Phone className="w-5 h-5 mr-2" />
              Hablar por WhatsApp
            </Button>
            <Button
              onClick={() => handleWhatsApp('Agendar visita')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-brand-green-dark px-8 py-6 text-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Agendar visita
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lots;
