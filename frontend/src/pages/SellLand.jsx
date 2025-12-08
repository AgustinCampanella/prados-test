import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { TrendingUp, MapPin, CheckCircle2, Shield, Award, Send, Phone } from 'lucide-react';
import { whatsappNumber } from '../data/mock';

const SellLand = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    ubicacion: '',
    area: '',
    precio: '',
    proyecto: '',
    detalles: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, proyecto: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/land-sales/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar la solicitud');
      }

      toast({
        title: '¡Solicitud enviada!',
        description: 'Nuestro equipo evaluará tu terreno y te contactaremos pronto.',
      });
      setFormData({
        nombre: '',
        telefono: '',
        correo: '',
        ubicacion: '',
        area: '',
        precio: '',
        proyecto: '',
        detalles: ''
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Hubo un problema al enviar tu solicitud. Inténtalo nuevamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Proyección de crecimiento',
      description: 'Tu terreno forma parte de un proyecto con alta valorización'
    },
    {
      icon: Shield,
      title: 'Proceso seguro y respaldado',
      description: 'Transacciones transparentes con asesoría legal completa'
    },
    {
      icon: Award,
      title: 'Valuación justa',
      description: 'Análisis profesional para ofrecerte el mejor precio'
    }
  ];

  const indicators = [
    { label: 'Terrenos adquiridos', value: '190+', color: 'text-brand-green' },
    { label: 'Familias felices', value: '190+', color: 'text-brand-blue' },
    { label: 'Años de experiencia', value: '10+', color: 'text-brand-green-dark' },
    { label: 'Proyectos activos', value: '2', color: 'text-brand-blue-light' }
  ];

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hola, quiero vender mi terreno en Prados de Paraíso`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600540520314-cbc1ddc91f3b"
            alt="Vende tu terreno"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/75 to-stone-900/60"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Vende tu <span className="text-brand-green">terreno</span>
            </h1>
            <p className="text-2xl text-stone-200 mb-8">
              Únete al proyecto inmobiliario más sostenible del norte chico. Te ofrecemos una valuación justa y un proceso transparente.
            </p>
          </div>
        </div>
      </section>

      {/* Indicators Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {indicators.map((indicator, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl md:text-5xl font-bold ${indicator.color} mb-2 font-mono`}>
                  {indicator.value}
                </div>
                <p className="text-stone-600 text-sm md:text-base">{indicator.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
              ¿Por qué vender con <span className="text-brand-green">nosotros</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-stone-900 mb-4">
                    Obtén tu valuación
                  </h2>
                  <p className="text-stone-600">
                    Completa el formulario y nuestro equipo te contactará para evaluar tu terreno
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        placeholder="Tu número de teléfono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                      />
                    </div>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="ubicacion">Ubicación del terreno</Label>
                      <Input
                        id="ubicacion"
                        name="ubicacion"
                        placeholder="Dirección o referencia"
                        value={formData.ubicacion}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">Área del terreno (m²)</Label>
                      <Input
                        id="area"
                        name="area"
                        type="number"
                        placeholder="Ej: 500"
                        value={formData.area}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="precio">Precio esperado (opcional)</Label>
                      <Input
                        id="precio"
                        name="precio"
                        placeholder="Ej: $50,000"
                        value={formData.precio}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="proyecto">Proyecto de interés</Label>
                      <Select value={formData.proyecto} onValueChange={handleSelectChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un proyecto" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Casa Huerto Ecológico">Casa Huerto Ecológico</SelectItem>
                          <SelectItem value="Villa Eco-Sostenible">Villa Eco-Sostenible</SelectItem>
                          <SelectItem value="Otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="detalles">Detalles adicionales</Label>
                    <Textarea
                      id="detalles"
                      name="detalles"
                      placeholder="Cuéntanos más sobre tu terreno (servicios, accesos, documentación, etc.)"
                      value={formData.detalles}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-green hover:bg-brand-green-dark text-white text-lg py-6"
                  >
                    {isSubmitting ? (
                      'Enviando...'
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Solicitar valuación
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-blue to-brand-blue-light text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Prefieres hablar directamente?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Nuestro equipo de asesores está disponible para responder todas tus preguntas.
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

export default SellLand;
