import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { ArrowRight, Leaf, Users, Sprout, TrendingUp, Phone, MessageCircle, Calendar, ChevronLeft, ChevronRight, Quote, Star, Search, MapPin, DollarSign, SortAsc, Home as HomeIcon, Maximize, FileText, Clock, User } from 'lucide-react';
import { mockBenefits, mockTestimonials, mockBlogs, whatsappNumber } from '../data/mock';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const SearchSection = () => {
  const [filters, setFilters] = useState({
    ubicacion: '',
    precio: '',
    orden: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    setHasSearched(true);
    
    try {
      // Build query params
      const params = new URLSearchParams();
      if (filters.ubicacion) params.append('ubicacion', filters.ubicacion);
      if (filters.precio) params.append('precio', filters.precio);
      if (filters.orden) params.append('orden', filters.orden);
      
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/projects/search/?${params.toString()}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        
        // Scroll to results section
        const resultsSection = document.getElementById('search-results');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        alert('Error al buscar proyectos');
      }
    } catch (error) {
      console.error('Error searching projects:', error);
      alert('Error de conexión');
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setFilters({ ubicacion: '', precio: '', orden: '' });
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
              Encuentra tu <span className="text-brand-green">proyecto ideal</span>
            </h2>
            <p className="text-xl text-stone-600">
              Utiliza nuestros filtros para encontrar el lote perfecto para ti
            </p>
          </div>

          <Card className="border-0 shadow-2xl bg-white">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Ubicación Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-green" />
                    Ubicación
                  </label>
                  <Select
                    value={filters.ubicacion}
                    onValueChange={(value) => setFilters({ ...filters, ubicacion: value })}
                  >
                    <SelectTrigger className="border-stone-200 focus:border-brand-green focus:ring-brand-green">
                      <SelectValue placeholder="Selecciona ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas las ubicaciones</SelectItem>
                      <SelectItem value="casa-huerto">Casa Huerto Ecológico</SelectItem>
                      <SelectItem value="villa-eco">Villa Eco-Sostenible</SelectItem>
                      <SelectItem value="huacho">Huacho</SelectItem>
                      <SelectItem value="el-paraiso">El Paraíso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Precio Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-brand-green" />
                    Rango de Precio
                  </label>
                  <Select
                    value={filters.precio}
                    onValueChange={(value) => setFilters({ ...filters, precio: value })}
                  >
                    <SelectTrigger className="border-stone-200 focus:border-brand-green focus:ring-brand-green">
                      <SelectValue placeholder="Selecciona rango" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los precios</SelectItem>
                      <SelectItem value="0-500">Hasta $500/mes</SelectItem>
                      <SelectItem value="500-1000">$500 - $1,000/mes</SelectItem>
                      <SelectItem value="1000-plus">Más de $1,000/mes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Orden Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                    <SortAsc className="w-4 h-4 text-brand-green" />
                    Ordenar por
                  </label>
                  <Select
                    value={filters.orden}
                    onValueChange={(value) => setFilters({ ...filters, orden: value })}
                  >
                    <SelectTrigger className="border-stone-200 focus:border-brand-green focus:ring-brand-green">
                      <SelectValue placeholder="Ordenar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alfabetico-az">A - Z</SelectItem>
                      <SelectItem value="alfabetico-za">Z - A</SelectItem>
                      <SelectItem value="precio-menor">Precio: Menor a Mayor</SelectItem>
                      <SelectItem value="precio-mayor">Precio: Mayor a Menor</SelectItem>
                      <SelectItem value="reciente">Más recientes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <Button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="w-full bg-brand-green hover:bg-brand-green-dark text-white transition-all duration-300 h-10"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {isSearching ? 'Buscando...' : 'Buscar'}
                  </Button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-stone-100">
                <div className="flex flex-wrap gap-4 justify-center text-sm text-stone-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-green"></div>
                    <span>2 Proyectos disponibles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-green"></div>
                    <span>Lotes desde 200 m²</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-green"></div>
                    <span>Financiamiento directo</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search Results Section */}
          {hasSearched && (
            <div id="search-results" className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-stone-900">
                    Resultados de búsqueda
                  </h3>
                  <p className="text-stone-600 mt-1">
                    {searchResults.length} {searchResults.length === 1 ? 'proyecto encontrado' : 'proyectos encontrados'}
                  </p>
                </div>
                <Button
                  onClick={handleClearSearch}
                  variant="outline"
                  className="border-brand-green text-brand-green hover:bg-brand-green/10"
                >
                  Limpiar búsqueda
                </Button>
              </div>

              {searchResults.length === 0 ? (
                <Card>
                  <CardContent className="py-16 text-center">
                    <Search className="w-16 h-16 mx-auto text-stone-300 mb-4" />
                    <h4 className="text-xl font-semibold text-stone-900 mb-2">
                      No se encontraron proyectos
                    </h4>
                    <p className="text-stone-600 mb-6">
                      Intenta ajustar tus filtros de búsqueda
                    </p>
                    <Button
                      onClick={handleClearSearch}
                      className="bg-brand-green hover:bg-brand-green-dark text-white"
                    >
                      Ver todos los proyectos
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((project) => (
                    <Card key={project.id} className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="relative h-48">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <span className={`absolute top-4 right-4 inline-block px-3 py-1 text-white text-sm rounded-full ${
                          project.status === 'Vendido' 
                            ? 'bg-red-500' 
                            : project.status === 'Disponible' 
                            ? 'bg-green-500' 
                            : project.status === 'Reservado'
                            ? 'bg-yellow-500'
                            : 'bg-brand-green'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-stone-900 mb-2">{project.title}</h3>
                        <p className="text-stone-600 mb-4 line-clamp-2">{project.description}</p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-stone-600">
                            <MapPin className="w-4 h-4 text-brand-green" />
                            <span>{project.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-stone-600">
                            <Maximize className="w-4 h-4 text-brand-green" />
                            <span>{project.area}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-brand-green">
                            <DollarSign className="w-4 h-4" />
                            <span>{project.price}</span>
                          </div>
                        </div>
                        <Link to="/lotes">
                          <Button className="w-full bg-brand-green hover:bg-brand-green-dark text-white">
                            Ver más <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const TestimonialsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Lo que dicen nuestros <span className="text-brand-green">clientes</span>
          </h2>
          <p className="text-xl text-stone-600">
            Historias reales de familias que viven en Prados de Paraíso
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {mockTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-[0_0_100%] min-w-0 px-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                  <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white h-full">
                    <CardContent className="p-6">
                      {/* Image */}
                      <div className="flex justify-center mb-6">
                        <div className="relative">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-20 h-20 rounded-full object-cover border-4 border-brand-green/20"
                          />
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                            <Quote className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex justify-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-brand-green text-brand-green" />
                        ))}
                      </div>
                      
                      {/* Text */}
                      <p className="text-stone-700 mb-6 italic leading-relaxed text-center">
                        "{testimonial.text}"
                      </p>
                      
                      {/* Info */}
                      <div className="border-t border-stone-100 pt-4 text-center">
                        <p className="font-bold text-stone-900">{testimonial.name}</p>
                        <p className="text-sm text-stone-500">{testimonial.location}</p>
                        <p className="text-xs text-brand-green mt-1">{testimonial.project}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-stone-200 flex items-center justify-center hover:bg-brand-green hover:text-white hover:border-brand-green transition-all duration-300 group"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="w-6 h-6 text-stone-700 group-hover:text-white transition-colors" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-stone-200 flex items-center justify-center hover:bg-brand-green hover:text-white hover:border-brand-green transition-all duration-300 group"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="w-6 h-6 text-stone-700 group-hover:text-white transition-colors" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {mockTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'bg-brand-green w-8'
                    : 'bg-stone-300 hover:bg-brand-green/50'
                }`}
                aria-label={`Ir a testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Quote Modal Component
const QuoteModal = ({ projectName, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    proyecto: projectName || '',
    mensaje: ''
  });

  // Auto-fill with user data if logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setFormData(prev => ({
        ...prev,
        nombre: userData.name,
        email: userData.email
      }));
    }
  }, [isOpen]);

  // Update project field when projectName changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, proyecto: projectName || '' }));
  }, [projectName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/quotes`, {
        method: 'POST',
        headers,
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
        onClose();
        setFormData({ nombre: '', email: '', telefono: '', proyecto: '', mensaje: '' });
      } else {
        alert('Hubo un error al enviar la cotización. Por favor intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error sending quote:', error);
      alert('Error de conexión. Por favor intenta de nuevo.');
    }
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-stone-900">Solicitar Cotización</DialogTitle>
        <DialogDescription className="text-stone-600">
          Completa el formulario y te contactaremos a la brevedad
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Nombre completo</label>
          <Input
            type="text"
            required
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            placeholder="Juan Pérez"
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Correo electrónico</label>
          <Input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="juan@ejemplo.com"
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Teléfono</label>
          <Input
            type="tel"
            required
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            placeholder="+51 999 999 999"
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Proyecto de interés</label>
          <Input
            type="text"
            value={formData.proyecto}
            onChange={(e) => setFormData({ ...formData, proyecto: e.target.value })}
            placeholder="Casa Huerto Ecológico"
            className="w-full bg-stone-50"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Mensaje (opcional)</label>
          <textarea
            value={formData.mensaje}
            onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
            placeholder="Cuéntanos más sobre tus necesidades..."
            rows="3"
            className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" className="flex-1 bg-brand-green hover:bg-brand-green-dark text-white">
            Enviar Cotización
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

// Blog Carousel Component
const BlogCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/`);
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          // Fallback to mock data if backend fails
          setBlogs(mockBlogs);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        // Fallback to mock data
        setBlogs(mockBlogs);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Nuestro <span className="text-brand-green">Blog</span>
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Mantente informado sobre tendencias, novedades y consejos para vivir en armonía con la naturaleza
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl text-stone-600">Cargando blogs...</div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-xl text-stone-600">No hay blogs disponibles</div>
            </div>
          ) : (
            <>
              {/* Carousel */}
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {blogs.map((blog) => (
                <div key={blog.id} className="flex-[0_0_100%] min-w-0 px-3 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                  <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white h-full overflow-hidden group">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent"></div>
                    </div>

                    <CardContent className="p-6">
                      {/* Date and Author */}
                      <div className="flex items-center gap-4 text-sm text-stone-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{blog.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{blog.author}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-stone-900 mb-3 line-clamp-2 group-hover:text-brand-green transition-colors duration-300">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-stone-600 mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>

                      {/* Read More Button */}
                      <Button 
                        variant="outline" 
                        className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-white transition-all duration-300"
                      >
                        Leer más <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-stone-200 flex items-center justify-center hover:bg-brand-green hover:text-white hover:border-brand-green transition-all duration-300 group"
            aria-label="Blog anterior"
          >
            <ChevronLeft className="w-6 h-6 text-stone-700 group-hover:text-white transition-colors" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-stone-200 flex items-center justify-center hover:bg-brand-green hover:text-white hover:border-brand-green transition-all duration-300 group"
            aria-label="Siguiente blog"
          >
            <ChevronRight className="w-6 h-6 text-stone-700 group-hover:text-white transition-colors" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'bg-brand-green w-8'
                    : 'bg-stone-300 hover:bg-brand-green/50'
                }`}
                aria-label={`Ir a página ${index + 1}`}
              />
            ))}
            </div>
          </>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-brand-green hover:bg-brand-green-dark text-white px-8 py-6">
            Ver todos los artículos <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Fetch projects from backend
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
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hola, quiero más información sobre Prados de Paraíso`, '_blank');
  };

  const handleQuoteClick = (projectName) => {
    setSelectedProject(projectName);
    setQuoteModalOpen(true);
  };

  const iconComponents = {
    Leaf: Leaf,
    Users: Users,
    Sprout: Sprout,
    TrendingUp: TrendingUp
  };

  // Carousel images
  const [banners, setBanners] = useState([]);
  const [bannersLoading, setBannersLoading] = useState(true);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/banners/`);
        if (response.ok) {
          const data = await response.json();
          setBanners(data);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setBannersLoading(false);
      }
    };
    
    fetchBanners();
  }, []);

  const autoplayPlugin = useCallback(() => Autoplay({ delay: 10000, stopOnInteraction: false }), []);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplayPlugin()]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      const autoplay = emblaApi.plugins()?.autoplay;
      if (autoplay) autoplay.reset();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      const autoplay = emblaApi.plugins()?.autoplay;
      if (autoplay) autoplay.reset();
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Carousel */}
        <div className="absolute inset-0 z-0 overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {bannersLoading ? (
              <div className="flex-[0_0_100%] min-w-0 relative h-full bg-stone-900 flex items-center justify-center">
                <div className="text-white text-xl">Cargando...</div>
              </div>
            ) : banners.length > 0 ? (
              banners.map((banner, index) => (
                <div key={banner.id} className="flex-[0_0_100%] min-w-0 relative h-full">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/60 to-transparent"></div>
                </div>
              ))
            ) : (
              <div className="flex-[0_0_100%] min-w-0 relative h-full bg-stone-900 flex items-center justify-center">
                <div className="text-white text-xl">No hay banners disponibles</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Dots Indicator */}
        {banners.length > 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  emblaApi?.scrollTo(index);
                  const autoplay = emblaApi?.plugins()?.autoplay;
                  if (autoplay) autoplay.reset();
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'bg-white w-8'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            {banners.length > 0 && banners[selectedIndex] && (
              <>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  {banners[selectedIndex].title.split(',').map((part, index) => (
                    <span key={index}>
                      {index === 0 ? part : <span className="text-brand-green-light">{part}</span>}
                      {index < banners[selectedIndex].title.split(',').length - 1 && ','}
                    </span>
                  ))}
                </h1>
                <p className="text-xl md:text-2xl text-stone-200 mb-8">
                  {banners[selectedIndex].description}
                </p>
                <p className="text-lg text-stone-300 mb-10">
                  {banners[selectedIndex].content}
                </p>
              </>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleWhatsApp}
                size="lg"
                className="bg-brand-green hover:bg-brand-green-dark text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Quiero más información
              </Button>
              <Button
                onClick={handleWhatsApp}
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-brand-green-dark text-lg px-8 py-6 transition-all duration-300"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Agendar visita
              </Button>
            </div>
            
            <p className="text-sm text-stone-300 mt-4">
              Un asesor se comunicará contigo en pocos minutos.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
              ¿Por qué <span className="text-brand-green">Prados de Paraíso</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockBenefits.map((benefit, index) => {
              const IconComponent = iconComponents[benefit.icon];
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-brand-green/10/30"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-green/20 flex items-center justify-center">
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

      {/* Search Section */}
      <SearchSection />

      {/* Featured Projects Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
              Nuestros <span className="text-brand-green">Proyectos</span>
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Descubre nuestras iniciativas que fusionan naturaleza y bienestar para ofrecer un estilo de vida en armonía con el entorno.
            </p>
          </div>

          {loadingProjects ? (
            <div className="text-center py-12">
              <div className="text-xl text-stone-600">Cargando proyectos...</div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-xl text-stone-600">No hay proyectos disponibles</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-64 group overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/60 to-transparent pointer-events-none"></div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/85 to-stone-900/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                      <div className="text-white p-4 space-y-2 w-full">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-brand-green-light flex-shrink-0" />
                          <div>
                            <p className="text-xs text-stone-300">Precio desde</p>
                            <p className="text-base font-bold">{project.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-brand-green-light flex-shrink-0" />
                          <div>
                            <p className="text-xs text-stone-300">Dirección</p>
                            <p className="text-sm font-semibold">{project.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Maximize className="w-4 h-4 text-brand-green-light flex-shrink-0" />
                          <div>
                            <p className="text-xs text-stone-300">Metraje</p>
                            <p className="text-base font-bold">{project.area}</p>
                          </div>
                        </div>
                        <div className="pt-2">
                          <Button 
                            onClick={(e) => {
                              e.preventDefault();
                              handleQuoteClick(project.title);
                            }}
                            className="w-full bg-brand-green hover:bg-brand-green-dark text-white text-sm py-2 h-auto"
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            Cotizar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <span className={`inline-block px-3 py-1 text-white text-sm rounded-full mb-3 ${
                      project.status === 'Vendido' 
                        ? 'bg-red-500' 
                        : project.status === 'Disponible' 
                        ? 'bg-green-500' 
                        : project.status === 'Reservado'
                        ? 'bg-yellow-500'
                        : 'bg-brand-green'
                    }`}>
                      {project.status}
                    </span>
                    <h3 className="text-2xl font-bold text-stone-900 mb-2">{project.title}</h3>
                    <p className="text-stone-600 mb-4">{project.description}</p>
                    <Link to="/lotes">
                      <Button className="w-full bg-brand-green hover:bg-brand-green-dark text-white">
                        Ver más <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="/lotes">
              <Button size="lg" className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-6">
                Ver todos los proyectos <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* Blog Section */}
      <BlogCarousel />

      {/* CTA Section */}
      <section className="py-20 bg-brand-green">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¡Vive una experiencia diferente!
          </h2>
          <p className="text-xl text-brand-green/10 mb-10 max-w-3xl mx-auto">
            Prados de Paraíso es un proyecto ecológico para casas de campo con vista al mar. Un lugar bendecido que forma parte de un escenario natural y cultural único en el Perú.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleWhatsApp}
              size="lg"
              className="bg-white text-brand-green-dark hover:bg-stone-100 px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Phone className="w-5 h-5 mr-2" />
              Hablar por WhatsApp
            </Button>
            <Link to="/nosotros">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-brand-green-dark px-8 py-6 text-lg transition-all duration-300"
              >
                Más sobre nosotros <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      <Dialog open={quoteModalOpen} onOpenChange={setQuoteModalOpen}>
        <QuoteModal 
          projectName={selectedProject} 
          isOpen={quoteModalOpen} 
          onClose={() => setQuoteModalOpen(false)} 
        />
      </Dialog>
    </div>
  );
};

export default Home;
