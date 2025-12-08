import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { Gift, Users, TrendingUp, CheckCircle2, Phone } from 'lucide-react';
import { whatsappNumber } from '../data/mock';

const ReferEarn = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombreReferidor: '',
    telefonoReferidor: '',
    correoReferidor: '',
    nombreReferido: '',
    telefonoReferido: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/referrals/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el referido');
      }

      toast({
        title: '¡Registro exitoso!',
        description: 'Tu referido ha sido registrado. Te contactaremos pronto.',
      });
      setIsRegistered(true);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Hubo un problema al registrar tu referido. Inténtalo nuevamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Gift,
      title: 'Gana recompensas',
      description: 'Por cada referido que compre, ganas beneficios exclusivos'
    },
    {
      icon: Users,
      title: 'Ayuda a tu comunidad',
      description: 'Comparte el sueño de vivir en armonía con la naturaleza'
    },
    {
      icon: TrendingUp,
      title: 'Sin límites',
      description: 'Refiere a cuantas personas quieras y multiplica tus ganancias'
    }
  ];

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hola, tengo dudas sobre el programa Refiere y Gana`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHxmYW1pbHklMjBvdXRkb29yfGVufDB8fHx8MTc2MzQzMDg0Mnww&ixlib=rb-4.1.0&q=85"
            alt="Refiere y Gana"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/85 via-stone-900/70 to-stone-900/55"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center flex items-center justify-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Refiere</span> y <span className="text-white">Gana</span>
            </h1>
          <p className="text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Comparte Prados de Paraíso con tus amigos y familiares, y obtén beneficios increíbles por cada referido que se una a nuestra comunidad.
          </p>
          <div className="flex items-center justify-center space-x-3 text-white/80">
            <CheckCircle2 className="w-6 h-6" />
            <span className="text-lg">Programa de referidos sin límites</span>
          </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
              ¿Por qué <span className="text-brand-green">participar</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-green/10 flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-brand-green" />
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 mb-3">{benefit.title}</h3>
                    <p className="text-stone-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {!isRegistered ? (
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8 md:p-12">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-stone-900 mb-4">
                      Registra tu referido
                    </h2>
                    <p className="text-stone-600">
                      Completa el formulario con tus datos y los de tu referido
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border-b border-stone-200 pb-6">
                      <h3 className="text-xl font-bold text-stone-900 mb-4">Tus datos</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="nombreReferidor">Tu nombre completo</Label>
                          <Input
                            id="nombreReferidor"
                            name="nombreReferidor"
                            placeholder="Escribe tu nombre"
                            value={formData.nombreReferidor}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefonoReferidor">Tu teléfono</Label>
                          <Input
                            id="telefonoReferidor"
                            name="telefonoReferidor"
                            type="tel"
                            placeholder="Tu número de teléfono"
                            value={formData.telefonoReferidor}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2 mt-6">
                        <Label htmlFor="correoReferidor">Tu correo electrónico</Label>
                        <Input
                          id="correoReferidor"
                          name="correoReferidor"
                          type="email"
                          placeholder="tu@correo.com"
                          value={formData.correoReferidor}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-stone-900 mb-4">Datos de tu referido</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="nombreReferido">Nombre del referido</Label>
                          <Input
                            id="nombreReferido"
                            name="nombreReferido"
                            placeholder="Nombre de tu referido"
                            value={formData.nombreReferido}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefonoReferido">Teléfono del referido</Label>
                          <Input
                            id="telefonoReferido"
                            name="telefonoReferido"
                            type="tel"
                            placeholder="Teléfono del referido"
                            value={formData.telefonoReferido}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-green hover:bg-brand-green-dark text-white text-lg py-6"
                    >
                      {isSubmitting ? 'Enviando...' : 'Registrar referido'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-2xl bg-brand-green/5">
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-green/20 flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-brand-green" />
                  </div>
                  <h2 className="text-3xl font-bold text-stone-900 mb-4">
                    ¡Gracias por tu referido!
                  </h2>
                  <p className="text-lg text-stone-600 mb-8">
                    Nuestro equipo se pondrá en contacto contigo y con tu referido muy pronto.
                  </p>
                  <Button
                    onClick={() => {
                      setIsRegistered(false);
                      setFormData({
                        nombreReferidor: '',
                        telefonoReferidor: '',
                        correoReferidor: '',
                        nombreReferido: '',
                        telefonoReferido: '',
                      });
                    }}
                    className="bg-brand-green hover:bg-brand-green-dark text-white"
                  >
                    Registrar otro referido
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Tienes dudas?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Nuestro equipo está listo para ayudarte con cualquier pregunta sobre el programa Refiere y Gana.
          </p>
          <Button
            onClick={handleWhatsApp}
            size="lg"
            className="bg-white text-brand-blue hover:bg-stone-100 px-8 py-6 text-lg shadow-xl"
          >
            <Phone className="w-5 h-5 mr-2" />
            Contactar por WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ReferEarn;
