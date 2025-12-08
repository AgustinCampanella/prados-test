import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { mockGalleryImages } from '../data/mock';
import { X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = [
    { value: 'all', label: 'Todas' },
    { value: 'playa', label: 'Playa' },
    { value: 'familia', label: 'Familia' },
    { value: 'wellness', label: 'Bienestar' },
    { value: 'naturaleza', label: 'Naturaleza' }
  ];

  const filteredImages = filter === 'all'
    ? mockGalleryImages
    : mockGalleryImages.filter(img => img.category === filter);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 bg-stone-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Explora la esencia de{' '}
            <span className="text-brand-green-light">Prados de Paraíso</span>
          </h1>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto">
            Descubre cómo se vive en un entorno natural único. Actividades al aire libre, áreas verdes, comunidad y espacios diseñados para reconectar.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-stone-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.value}
                onClick={() => setFilter(category.value)}
                variant={filter === category.value ? 'default' : 'outline'}
                className={filter === category.value
                  ? 'bg-brand-green hover:bg-brand-green-dark text-white'
                  : 'border-brand-green text-brand-green hover:bg-brand-green/10'
                }
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Card
                key={image.id}
                className="overflow-hidden cursor-pointer group border-0 shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative aspect-square">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-semibold text-lg">{image.title}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-brand-green-light transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-6xl max-h-[90vh] w-full">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white text-center mt-4 text-xl font-semibold">
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
