import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { Calendar, MapPin, Users, Clock, CheckCircle2, Phone } from 'lucide-react';
import { whatsappNumber } from '../data/mock';

const Events = () => {
  const { toast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    personas: '1'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const events = [
    {
      id: 1,
      title: 'Domingo Familiar en el Biohuerto',
      date: '24 de Noviembre, 2024',
      time: '10:00 AM - 2:00 PM',
      location: 'Casa Huerto Ecológico',
      image: 'https://images.unsplash.com/photo-1616364817046-0607a75f3233?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxvcmdhbmljJTIwZ2FyZGVufGVufDB8fHx8MTc2MzQzMDcyNnww&ixlib=rb-4.1.0&q=85',
      description: 'Actividad familiar para aprender sobre cultivo orgánico y cosecha. Incluye almuerzo campestre.',
      capacity: '50 personas',
      status: 'available',
      category: 'Familia'
    },
    {
      id: 2,
      title: 'Tour por Villa Eco-Sostenible',
      date: '1 de Diciembre, 2024',
      time: '9:00 AM - 12:00 PM',
      location: 'Villa Eco-Sostenible',
      image: 'https://images.unsplash.com/photo-1761571740780-d9149a88b759',
      description: 'Recorrido guiado por nuestro nuevo proyecto con vista a los humedales y la playa.',
      capacity: '30 personas',
      status: 'available',
      category: 'Tour'
    },
    {
      id: 3,
      title: 'Taller de Compostaje y Sostenibilidad',
      date: '8 de Diciembre, 2024',
      time: '3:00 PM - 6:00 PM',
      location: 'Casa Huerto Ecológico',
      image: 'https://images.unsplash.com/photo-1574786198875-49f5d09fe2d2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHx3ZXRsYW5kc3xlbnwwfHx8fDE3NjM0MzA3Mzd8MA&ixlib=rb-4.1.0&q=85',
      description: 'Aprende técnicas de compostaje y cómo reducir tu huella ambiental.',
      capacity: '25 personas',
      status: 'available',
      category: 'Taller'
    },
    {
      id: 4,
      title: 'Yoga al Amanecer en la Naturaleza',
      date: '15 de Diciembre, 2024',
      time: '6:30 AM - 8:00 AM',
      location: 'Villa Eco-Sostenible',
      image: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbmF0dXJlfGVufDB8fHx8MTc2MzQzMDg0N3ww&ixlib=rb-4.1.0&q=85',
      description: 'Sesión de yoga al aire libre con vista al amanecer. Incluye desayuno saludable.',
      capacity: '20 personas',
      status: 'available',
      category: 'Bienestar'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const registrationData = {
        ...formData,
        evento_id: selectedEvent.id.toString(),
        evento_title: selectedEvent.title,
      };

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/event-registrations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        throw new Error('Error al registrar al evento');
      }

      toast({
        title: '¡Registro exitoso!',
        description: `Te esperamos en: ${selectedEvent.title}`,
      });
      setFormData({
        nombre: '',
        telefono: '',
        correo: '',
        personas: '1'
      });
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Hubo un problema al registrarte al evento. Inténtalo nuevamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hola, quiero información sobre los eventos`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw1fHxmYW1pbHklMjBvdXRkb29yfGVufDB8fHx8MTc2MzQzMDg0Mnww&ixlib=rb-4.1.0&q=85"
            alt="Eventos y Actividades"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/85 via-stone-900/70 to-stone-900/55"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10 flex items-center justify-center">
          <div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Eventos y <span className="text-white">Actividades</span>
          </h1>
          <p className="text-2xl text-white/90 max-w-3xl mx-auto">
            Únete a nuestras actividades y descubre el estilo de vida en Prados de Paraíso
          </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
              Próximos <span className="text-brand-green">eventos</span>
            </h2>
            <p className="text-xl text-stone-600">
              Participa en nuestras actividades y conoce la comunidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {events.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-brand-green text-white">
                    {event.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{event.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-stone-600 text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-brand-green" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-stone-600 text-sm">
                      <Clock className="w-4 h-4 mr-2 text-brand-green" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-stone-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-brand-green" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-stone-600 text-sm">
                      <Users className="w-4 h-4 mr-2 text-brand-green" />
                      <span>{event.capacity}</span>
                    </div>
                  </div>

                  <p className="text-stone-600 text-sm mb-4">{event.description}</p>

                  <Button
                    onClick={() => setSelectedEvent(event)}
                    className="w-full bg-brand-green hover:bg-brand-green-dark text-white"
                  >
                    Inscribirme
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Modal/Form */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-stone-900 mb-2">
                  Inscríbete al evento
                </h2>
                <p className="text-brand-green font-semibold text-lg">{selectedEvent.title}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre completo</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    placeholder="Tu nombre completo"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      placeholder="Tu teléfono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="correo">Correo electrónico</Label>
                    <Input
                      id="correo"
                      name="correo"
                      type="email"
                      placeholder="tu@correo.com"
                      value={formData.correo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="personas">Número de asistentes</Label>
                  <Input
                    id="personas"
                    name="personas"
                    type="number"
                    min="1"
                    max="10"
                    placeholder="1"
                    value={formData.personas}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedEvent(null)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-brand-green hover:bg-brand-green-dark text-white"
                  >
                    {isSubmitting ? 'Enviando...' : 'Confirmar inscripción'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            ¿Tienes preguntas?
          </h2>
          <p className="text-xl text-stone-600 mb-10 max-w-3xl mx-auto">
            Contáctanos para más información sobre nuestros eventos y actividades.
          </p>
          <Button
            onClick={handleWhatsApp}
            size="lg"
            className="bg-brand-green hover:bg-brand-green-dark text-white px-8 py-6 text-lg shadow-xl"
          >
            <Phone className="w-5 h-5 mr-2" />
            Contactar por WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Events;
