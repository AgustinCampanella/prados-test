import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, Clock, User, Calendar, Tag } from 'lucide-react';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBlog(data);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-xl text-stone-600">Cargando artículo...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-stone-900 mb-4">Artículo no encontrado</h2>
            <p className="text-stone-600 mb-6">El artículo que buscas no existe o ha sido eliminado.</p>
            <Link to="/blogs">
              <Button className="bg-brand-green hover:bg-brand-green-dark text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Blogs
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-stone-50">
      {/* Back Button */}
      <div className="bg-white border-b border-stone-200">
        <div className="container mx-auto px-4 py-4">
          <Button
            onClick={() => navigate('/blogs')}
            variant="outline"
            className="border-brand-green text-brand-green hover:bg-brand-green/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Blogs
          </Button>
        </div>
      </div>

      {/* Blog Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-xl text-stone-600 leading-relaxed">
                {blog.excerpt}
              </p>
            )}
          </header>

          {/* Featured Image */}
          <div className="relative h-96 mb-8 rounded-xl overflow-hidden shadow-2xl">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg prose-stone max-w-none">
                <div className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                  {blog.content}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center text-white font-bold text-lg">
                  {blog.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-stone-900">{blog.author}</p>
                  <p className="text-sm text-stone-500">Autor</p>
                </div>
              </div>

              <Link to="/blogs">
                <Button className="bg-brand-green hover:bg-brand-green-dark text-white">
                  Ver más artículos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
