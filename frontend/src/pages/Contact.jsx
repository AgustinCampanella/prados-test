import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { phoneNumber, email, address, whatsappNumber } from '../data/mock';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    proyecto: '',
    mensaje: ''
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

    // Simulate form submission (mock)
    setTimeout(() => {
      toast({
        title: '¡Mensaje enviado!',
        description: 'Gracias por tu mensaje. Nuestro equipo te contactará muy pronto.',
      });
      setFormData({
        nombre: '',
        telefono: '',
        correo: '',
        proyecto: '',
        mensaje: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hola, quiero más información`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxmYW1pbHklMjBvdXRkb29yfGVufDB8fHx8MTc2MzQzMDg0Mnww&ixlib=rb-4.1.0&q=85"
            alt="Contacto"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/75 to-stone-900/60"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Estamos aquí para{' '}
            <span className="text-brand-green-light">ayudarte</span>
          </h1>
          <p className="text-xl text-stone-200 max-w-3xl mx-auto">
            Déjanos tus datos y un asesor especializado se comunicará contigo para brindarte información personalizada.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-brand-green/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-brand-green" />
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 mb-2">Teléfono</h3>
                      <a href={`tel:${phoneNumber}`} className="text-stone-600 hover:text-brand-green transition-colors">
                        {phoneNumber}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-brand-green/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-brand-green" />
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 mb-2">Correo</h3>
                      <a href={`mailto:${email}`} className="text-stone-600 hover:text-brand-green transition-colors break-all">
                        {email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-brand-green/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-brand-green" />
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 mb-2">Dirección</h3>
                      <p className="text-stone-600">{address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="space-y-3">
                <Button
                  onClick={handleWhatsApp}
                  className="w-full bg-brand-green hover:bg-brand-green-dark text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Hablar por WhatsApp
                </Button>
                <Button
                  onClick={handleCall}
                  variant="outline"
                  className="w-full border-brand-green text-brand-green hover:bg-brand-green/10"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar ahora
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-stone-900 mb-6">
                    Envíanos un mensaje
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre completo</Label>
                        <Input
                          id="nombre"
                          name="nombre"
                          placeholder="Escribe tu nombre"
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
                          placeholder="Ingresa tu número de teléfono"
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
                        placeholder="Tu correo electrónico"
                        value={formData.correo}
                        onChange={handleChange}
                        required
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
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensaje">Mensaje / Consulta</Label>
                      <Textarea
                        id="mensaje"
                        name="mensaje"
                        placeholder="Cuéntanos qué información necesitas"
                        value={formData.mensaje}
                        onChange={handleChange}
                        rows={5}
                        required
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
                          Enviar mensaje
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5!2d-77.57144770!3d-11.21332160!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDEyJzQ3LjkiUyA3N8KwMzQnMTcuMiJX!5e0!3m2!1ses!2spe!4v1234567890123!5m2!1ses!2spe"
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
    </div>
  );
};

export default Contact;
