import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, Clock, User, BookOpen } from 'lucide-react';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/`);
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b"
            alt="Naturaleza y sostenibilidad"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/70 to-stone-900/60"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Nuestro Blog
            </h1>
            <p className="text-xl text-white/90">
              Mantente informado sobre tendencias, novedades y consejos para vivir en armonía con la naturaleza
            </p>
          </div>
        </div>
      </section>

      {/* Blogs Grid Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="text-xl text-stone-600">Cargando blogs...</div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-20 h-20 mx-auto text-stone-300 mb-4" />
              <h3 className="text-2xl font-bold text-stone-900 mb-2">
                No hay blogs disponibles
              </h3>
              <p className="text-stone-600">
                Pronto publicaremos contenido interesante
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <p className="text-lg text-stone-600">
                  {blogs.length} {blogs.length === 1 ? 'artículo publicado' : 'artículos publicados'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {blogs.map((blog) => (
                  <Card 
                    key={blog.id} 
                    className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent"></div>
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
                        {blog.excerpt || blog.content?.substring(0, 150) + '...'}
                      </p>

                      {/* Read More Button */}
                      <Link to={`/blogs/${blog.id}`}>
                        <Button 
                          variant="outline" 
                          className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-white transition-all duration-300"
                        >
                          Leer más <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blogs;
