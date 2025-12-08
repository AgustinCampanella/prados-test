import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Users, FileText, Shield, LogOut, Plus, Edit, Trash2, BookOpen, UserCog, Home, Building2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('quotes'); // 'quotes', 'blogs', 'users', 'projects', or 'banners'
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    image: '',
    excerpt: '',
    content: '',
    author: ''
  });
  const [users, setUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'user'
  });
  const [projects, setProjects] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    price: '',
    address: '',
    area: '',
    description: '',
    image: '',
    status: 'Disponible'
  });
  const [banners, setBanners] = useState([]);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [bannerForm, setBannerForm] = useState({
    title: '',
    description: '',
    content: '',
    image: '',
    order: 0
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/');
      return;
    }

    const parsedUser = JSON.parse(userData);
    
    if (parsedUser.role !== 'admin' && parsedUser.role !== 'colaborador') {
      alert('No tienes permisos para acceder a esta página');
      navigate('/');
      return;
    }

    setUser(parsedUser);
    await Promise.all([fetchQuotes(token), fetchBlogs(), fetchUsers(token), fetchProjects(), fetchBanners()]);
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchUsers = async (token) => {
    // Only fetch users if admin (not colaborador)
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData.role !== 'admin') {
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/`);
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchQuotes = async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/quotes`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setQuotes(data);
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleAddBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '',
      image: '',
      excerpt: '',
      content: '',
      author: user?.name || ''
    });
    setShowBlogModal(true);
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      image: blog.image,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author
    });
    setShowBlogModal(true);
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const url = editingBlog
        ? `${process.env.REACT_APP_BACKEND_URL}/api/blogs/${editingBlog.id}`
        : `${process.env.REACT_APP_BACKEND_URL}/api/blogs/`;

      const method = editingBlog ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(blogForm)
      });

      if (response.ok) {
        alert(editingBlog ? 'Blog actualizado exitosamente' : 'Blog creado exitosamente');
        setShowBlogModal(false);
        await fetchBlogs();
      } else {
        alert('Error al guardar el blog');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error de conexión');
    }
  };


  const handleImageUploadBlog = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen es muy grande. Por favor selecciona una imagen menor a 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogForm({ ...blogForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImageBlog = () => {
    setBlogForm({ ...blogForm, image: '' });
  };


  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este blog?')) {
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Blog eliminado exitosamente');
        await fetchBlogs();
      } else {
        alert('Error al eliminar el blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error de conexión');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setShowUserModal(true);
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userForm)
      });

      if (response.ok) {
        alert('Usuario actualizado exitosamente');
        setShowUserModal(false);
        await fetchUsers(token);
      } else {
        const errorData = await response.json();
        alert(errorData.detail || 'Error al actualizar usuario');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Error de conexión');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Usuario eliminado exitosamente');
        await fetchUsers(token);
      } else {
        const errorData = await response.json();
        alert(errorData.detail || 'Error al eliminar usuario');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error de conexión');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen es muy grande. Por favor selecciona una imagen menor a 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectForm({ ...projectForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProjectForm({ ...projectForm, image: '' });
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      price: '',
      address: '',
      area: '',
      description: '',
      image: '',
      status: 'Disponible'
    });
    setShowProjectModal(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      price: project.price,
      address: project.address,
      area: project.area,
      description: project.description,
      image: project.image,
      status: project.status
    });
    setShowProjectModal(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const url = editingProject
        ? `${process.env.REACT_APP_BACKEND_URL}/api/projects/${editingProject.id}`
        : `${process.env.REACT_APP_BACKEND_URL}/api/projects/`;

      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectForm)
      });

      if (response.ok) {
        alert(editingProject ? 'Proyecto actualizado exitosamente' : 'Proyecto creado exitosamente');
        setShowProjectModal(false);
        await fetchProjects();
      } else {
        alert('Error al guardar el proyecto');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error de conexión');
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Proyecto eliminado exitosamente');
        await fetchProjects();
      } else {
        alert('Error al eliminar el proyecto');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error de conexión');
    }
  };


  // Banner Functions
  const fetchBanners = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/banners/`);
      if (response.ok) {
        const data = await response.json();
        setBanners(data);
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const handleImageUploadBanner = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen es muy grande. Por favor selecciona una imagen menor a 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerForm({ ...bannerForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImageBanner = () => {
    setBannerForm({ ...bannerForm, image: '' });
  };

  const handleAddBanner = () => {
    setEditingBanner(null);
    setBannerForm({
      title: '',
      description: '',
      content: '',
      image: '',
      order: banners.length + 1
    });
    setShowBannerModal(true);
  };

  const handleEditBanner = (banner) => {
    setEditingBanner(banner);
    setBannerForm({
      title: banner.title,
      description: banner.description,
      content: banner.content || '',
      image: banner.image,
      order: banner.order
    });
    setShowBannerModal(true);
  };

  const handleSaveBanner = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const url = editingBanner
        ? `${process.env.REACT_APP_BACKEND_URL}/api/banners/${editingBanner.id}`
        : `${process.env.REACT_APP_BACKEND_URL}/api/banners/`;

      const method = editingBanner ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bannerForm)
      });

      if (response.ok) {
        alert(editingBanner ? 'Banner actualizado exitosamente' : 'Banner creado exitosamente');
        setShowBannerModal(false);
        await fetchBanners();
      } else {
        alert('Error al guardar el banner');
      }
    } catch (error) {
      console.error('Error saving banner:', error);
      alert('Error de conexión');
    }
  };

  const handleDeleteBanner = async (bannerId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este banner?')) {
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/banners/${bannerId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Banner eliminado exitosamente');
        await fetchBanners();
      } else {
        alert('Error al eliminar el banner');
      }
    } catch (error) {
      console.error('Error deleting banner:', error);
      alert('Error de conexión');
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-brand-green" />
              <div>
                <h1 className="text-3xl font-bold text-stone-900">Panel de Administración</h1>
                <p className="text-stone-600">Bienvenido, {user?.name}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => window.location.href = '/'} 
                variant="outline" 
                className="gap-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
              >
                <Home className="w-4 h-4" />
                Volver al Sitio
              </Button>
              <Button onClick={handleLogout} variant="outline" className="gap-2">
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="flex border-b border-stone-200">
            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'quotes'
                  ? 'text-brand-green border-b-2 border-brand-green'
                  : 'text-stone-600 hover:text-brand-green'
              }`}
            >
              <FileText className="w-5 h-5 inline mr-2" />
              Cotizaciones
            </button>
            <button
              onClick={() => setActiveTab('banners')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'banners'
                  ? 'text-brand-green border-b-2 border-brand-green'
                  : 'text-stone-600 hover:text-brand-green'
              }`}
            >
              <ImageIcon className="w-5 h-5 inline mr-2" />
              Gestión de Banners
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'projects'
                  ? 'text-brand-green border-b-2 border-brand-green'
                  : 'text-stone-600 hover:text-brand-green'
              }`}
            >
              <Building2 className="w-5 h-5 inline mr-2" />
              Gestión de Proyectos
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'blogs'
                  ? 'text-brand-green border-b-2 border-brand-green'
                  : 'text-stone-600 hover:text-brand-green'
              }`}
            >
              <BookOpen className="w-5 h-5 inline mr-2" />
              Gestión de Blogs
            </button>
            {user?.role === 'admin' && (
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'users'
                    ? 'text-brand-green border-b-2 border-brand-green'
                    : 'text-stone-600 hover:text-brand-green'
                }`}
              >
                <UserCog className="w-5 h-5 inline mr-2" />
                Gestión de Usuarios
              </button>
            )}
          </div>
        </div>

        {/* Quotes Section */}
        {activeTab === 'quotes' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-stone-600">Total Cotizaciones</CardTitle>
              <FileText className="w-5 h-5 text-brand-green" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-stone-900">{quotes.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-stone-600">Usuarios Registrados</CardTitle>
              <Users className="w-5 h-5 text-brand-green" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-stone-900">
                {quotes.filter(q => q.user_id).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-stone-600">Cotizaciones Anónimas</CardTitle>
              <FileText className="w-5 h-5 text-stone-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-stone-900">
                {quotes.filter(q => !q.user_id).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quotes Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-stone-900">Cotizaciones Recibidas</CardTitle>
          </CardHeader>
          <CardContent>
            {quotes.length === 0 ? (
              <div className="text-center py-12 text-stone-500">
                No hay cotizaciones aún
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stone-200">
                      <th className="text-left py-3 px-4 font-semibold text-stone-700">Nombre</th>
                      <th className="text-left py-3 px-4 font-semibold text-stone-700">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-stone-700">Teléfono</th>
                      <th className="text-left py-3 px-4 font-semibold text-stone-700">Proyecto</th>
                      <th className="text-left py-3 px-4 font-semibold text-stone-700">Mensaje</th>
                      <th className="text-left py-3 px-4 font-semibold text-stone-700">Fecha</th>
                      <th className="text-left py-3 px-4 font-semibold text-stone-700">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((quote) => (
                      <tr key={quote.id} className="border-b border-stone-100 hover:bg-stone-50">
                        <td className="py-3 px-4">{quote.nombre}</td>
                        <td className="py-3 px-4">{quote.email}</td>
                        <td className="py-3 px-4">{quote.telefono}</td>
                        <td className="py-3 px-4">{quote.proyecto}</td>
                        <td className="py-3 px-4">
                          {quote.mensaje ? (
                            <span className="text-sm">{quote.mensaje.substring(0, 50)}...</span>
                          ) : (
                            <span className="text-stone-400">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {new Date(quote.created_at).toLocaleDateString('es-PE')}
                        </td>
                        <td className="py-3 px-4">
                          {quote.user_id ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-green text-white">
                              Usuario
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-200 text-stone-700">
                              Anónimo
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
          </>
        )}

        {/* Blogs Section */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            {/* Add Blog Button */}
            <div className="flex justify-end">
              <Button onClick={handleAddBlog} className="bg-brand-green hover:bg-brand-green-dark text-white gap-2">
                <Plus className="w-5 h-5" />
                Agregar Blog
              </Button>
            </div>

            {/* Blogs Grid */}
            {blogs.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-stone-500">
                  No hay blogs publicados aún
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <Card key={blog.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold text-stone-900 mb-2 line-clamp-2">{blog.title}</h3>
                      <p className="text-sm text-stone-600 mb-3 line-clamp-2">{blog.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-4">
                        <span>{blog.author}</span>
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleEditBlog(blog)}
                          variant="outline" 
                          size="sm" 
                          className="flex-1 gap-1"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </Button>
                        <Button 
                          onClick={() => handleDeleteBlog(blog.id)}
                          variant="outline" 
                          size="sm" 
                          className="flex-1 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Blog Modal */}
        <Dialog open={showBlogModal} onOpenChange={setShowBlogModal}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-stone-900">
                {editingBlog ? 'Editar Blog' : 'Agregar Nuevo Blog'}
              </DialogTitle>
              <DialogDescription className="text-stone-600">
                Completa la información del blog
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSaveBlog} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Título</label>
                <Input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="Título del blog"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Imagen del Blog</label>
                
                {/* Image Preview */}
                {blogForm.image && (
                  <div className="relative mb-3 rounded-lg overflow-hidden border border-stone-300">
                    <img 
                      src={blogForm.image} 
                      alt="Preview" 
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImageBlog}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex gap-2">
                  <label className="flex-1">
                    <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-stone-300 rounded-lg hover:border-brand-green hover:bg-brand-green/5 transition-colors cursor-pointer">
                      <Upload className="w-5 h-5 text-stone-500" />
                      <span className="text-sm text-stone-600">Subir imagen local</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUploadBlog}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* URL Input Alternative */}
                <div className="mt-3">
                  <div className="relative flex items-center">
                    <div className="flex-grow border-t border-stone-300"></div>
                    <span className="px-3 text-xs text-stone-500">o pega una URL</span>
                    <div className="flex-grow border-t border-stone-300"></div>
                  </div>
                  <Input
                    type="url"
                    value={blogForm.image.startsWith('data:') ? '' : blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="mt-2"
                  />
                </div>
                
                <p className="text-xs text-stone-500 mt-2">
                  Sube una imagen desde tu computadora o pega una URL (max 5MB)
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Breve Descripción (Excerpt)
                </label>
                <textarea
                  required
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  placeholder="Descripción breve que aparece en la tarjeta..."
                  rows="2"
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Contenido</label>
                <textarea
                  required
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="Contenido completo del blog..."
                  rows="6"
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Autor</label>
                <Input
                  type="text"
                  required
                  value={blogForm.author}
                  onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                  placeholder="Nombre del autor"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowBlogModal(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1 bg-brand-green hover:bg-brand-green-dark text-white">
                  {editingBlog ? 'Actualizar' : 'Crear'} Blog
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Users Section */}
        {activeTab === 'users' && user?.role === 'admin' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-stone-900">Usuarios Registrados</CardTitle>
              </CardHeader>
              <CardContent>
                {users.length === 0 ? (
                  <div className="text-center py-12 text-stone-500">
                    No hay usuarios registrados
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-stone-200">
                          <th className="text-left py-3 px-4 font-semibold text-stone-700">Nombre</th>
                          <th className="text-left py-3 px-4 font-semibold text-stone-700">Email</th>
                          <th className="text-left py-3 px-4 font-semibold text-stone-700">Rol</th>
                          <th className="text-left py-3 px-4 font-semibold text-stone-700">Fecha de Registro</th>
                          <th className="text-left py-3 px-4 font-semibold text-stone-700">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((userItem) => (
                          <tr key={userItem.id} className="border-b border-stone-100 hover:bg-stone-50">
                            <td className="py-3 px-4">{userItem.name}</td>
                            <td className="py-3 px-4">{userItem.email}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                userItem.role === 'admin' 
                                  ? 'bg-red-100 text-red-800'
                                  : userItem.role === 'colaborador'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {userItem.role === 'admin' ? 'Admin' : userItem.role === 'colaborador' ? 'Colaborador' : 'Usuario'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              {new Date(userItem.created_at).toLocaleDateString('es-PE')}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleEditUser(userItem)}
                                  variant="outline"
                                  size="sm"
                                  className="gap-1"
                                >
                                  <Edit className="w-4 h-4" />
                                  Editar
                                </Button>
                                {userItem.id !== user?.id && (
                                  <Button
                                    onClick={() => handleDeleteUser(userItem.id)}
                                    variant="outline"
                                    size="sm"
                                    className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Eliminar
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Projects Section */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Add Project Button */}
            <div className="flex justify-end">
              <Button onClick={handleAddProject} className="bg-brand-green hover:bg-brand-green-dark text-white gap-2">
                <Plus className="w-5 h-5" />
                Agregar Proyecto
              </Button>
            </div>

            {/* Projects Grid */}
            {projects.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-stone-500">
                  No hay proyectos publicados aún
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === 'Disponible' 
                            ? 'bg-green-500 text-white'
                            : project.status === 'Vendido'
                            ? 'bg-red-500 text-white'
                            : 'bg-yellow-500 text-white'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold text-stone-900 mb-2 line-clamp-1">{project.title}</h3>
                      <div className="space-y-1 text-sm text-stone-600 mb-3">
                        <p className="font-semibold text-brand-green">{project.price}</p>
                        <p className="line-clamp-1">{project.address}</p>
                        <p>{project.area}</p>
                        <p className="line-clamp-2 text-xs">{project.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleEditProject(project)}
                          variant="outline" 
                          size="sm" 
                          className="flex-1 gap-1"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </Button>
                        <Button 
                          onClick={() => handleDeleteProject(project.id)}
                          variant="outline" 
                          size="sm" 
                          className="flex-1 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Project Modal */}
        <Dialog open={showProjectModal} onOpenChange={setShowProjectModal}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-stone-900">
                {editingProject ? 'Editar Proyecto' : 'Agregar Nuevo Proyecto'}
              </DialogTitle>
              <DialogDescription className="text-stone-600">
                Completa la información del proyecto
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSaveProject} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Título</label>
                <Input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="Nombre del proyecto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Precio</label>
                <Input
                  type="text"
                  required
                  value={projectForm.price}
                  onChange={(e) => setProjectForm({ ...projectForm, price: e.target.value })}
                  placeholder="ej: Desde $50,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Dirección</label>
                <Input
                  type="text"
                  required
                  value={projectForm.address}
                  onChange={(e) => setProjectForm({ ...projectForm, address: e.target.value })}
                  placeholder="Ubicación del proyecto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Área</label>
                <Input
                  type="text"
                  required
                  value={projectForm.area}
                  onChange={(e) => setProjectForm({ ...projectForm, area: e.target.value })}
                  placeholder="ej: Desde 200 m²"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Descripción</label>
                <textarea
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Descripción del proyecto..."
                  rows="3"
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Imagen del Proyecto</label>
                
                {/* Image Preview */}
                {projectForm.image && (
                  <div className="relative mb-3 rounded-lg overflow-hidden border border-stone-300">
                    <img 
                      src={projectForm.image} 
                      alt="Preview" 
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex gap-2">
                  <label className="flex-1">
                    <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-stone-300 rounded-lg hover:border-brand-green hover:bg-brand-green/5 transition-colors cursor-pointer">
                      <Upload className="w-5 h-5 text-stone-500" />
                      <span className="text-sm text-stone-600">Subir imagen local</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* URL Input Alternative */}
                <div className="mt-3">
                  <div className="relative flex items-center">
                    <div className="flex-grow border-t border-stone-300"></div>
                    <span className="px-3 text-xs text-stone-500">o pega una URL</span>
                    <div className="flex-grow border-t border-stone-300"></div>
                  </div>
                  <Input
                    type="url"
                    value={projectForm.image.startsWith('data:') ? '' : projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="mt-2"
                  />
                </div>
                
                <p className="text-xs text-stone-500 mt-2">
                  Sube una imagen desde tu computadora o pega una URL (max 5MB)
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Estado</label>
                <Select value={projectForm.status} onValueChange={(value) => setProjectForm({ ...projectForm, status: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona el estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Disponible">Disponible</SelectItem>
                    <SelectItem value="Vendido">Vendido</SelectItem>
                    <SelectItem value="Reservado">Reservado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowProjectModal(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1 bg-brand-green hover:bg-brand-green-dark text-white">
                  {editingProject ? 'Actualizar' : 'Crear'} Proyecto
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>


        {/* Banners Section */}
        {activeTab === 'banners' && (
          <div className="space-y-6">
            {/* Add Banner Button */}
            <div className="flex justify-end">
              <Button onClick={handleAddBanner} className="bg-brand-green hover:bg-brand-green-dark text-white gap-2">
                <Plus className="w-5 h-5" />
                Agregar Banner
              </Button>
            </div>

            {/* Banners Grid */}
            {banners.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-stone-500">
                  No hay banners publicados aún
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {banners.map((banner) => (
                  <Card key={banner.id} className="overflow-hidden">
                    <div className="relative h-64">
                      <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2">
                        <span className="px-3 py-1 bg-brand-green text-white text-xs font-semibold rounded-full">
                          Orden: {banner.order}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-bold text-stone-900 mb-2">{banner.title}</h3>
                      <p className="text-sm text-stone-600 mb-4 line-clamp-3">{banner.description}</p>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleEditBanner(banner)}
                          variant="outline" 
                          size="sm" 
                          className="flex-1 gap-1"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </Button>
                        <Button 
                          onClick={() => handleDeleteBanner(banner.id)}
                          variant="outline" 
                          size="sm" 
                          className="flex-1 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Banner Modal */}
        <Dialog open={showBannerModal} onOpenChange={setShowBannerModal}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-stone-900">
                {editingBanner ? 'Editar Banner' : 'Agregar Nuevo Banner'}
              </DialogTitle>
              <DialogDescription className="text-stone-600">
                Completa la información del banner
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSaveBanner} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Título</label>
                <Input
                  type="text"
                  required
                  value={bannerForm.title}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  placeholder="Título del banner"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Descripción</label>
                <textarea
                  required
                  value={bannerForm.description}
                  onChange={(e) => setBannerForm({ ...bannerForm, description: e.target.value })}
                  placeholder="Descripción del banner..."
                  rows="3"
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Contenido</label>
                <textarea
                  required
                  value={bannerForm.content}
                  onChange={(e) => setBannerForm({ ...bannerForm, content: e.target.value })}
                  placeholder="Contenido detallado del banner..."
                  rows="4"
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
                <p className="text-xs text-stone-500 mt-1">
                  Este contenido se mostrará en la parte inferior del banner
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Imagen del Banner</label>
                
                {/* Image Preview */}
                {bannerForm.image && (
                  <div className="relative mb-3 rounded-lg overflow-hidden border border-stone-300">
                    <img 
                      src={bannerForm.image} 
                      alt="Preview" 
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImageBanner}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex gap-2">
                  <label className="flex-1">
                    <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-stone-300 rounded-lg hover:border-brand-green hover:bg-brand-green/5 transition-colors cursor-pointer">
                      <Upload className="w-5 h-5 text-stone-500" />
                      <span className="text-sm text-stone-600">Subir imagen local</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUploadBanner}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* URL Input Alternative */}
                <div className="mt-3">
                  <div className="relative flex items-center">
                    <div className="flex-grow border-t border-stone-300"></div>
                    <span className="px-3 text-xs text-stone-500">o pega una URL</span>
                    <div className="flex-grow border-t border-stone-300"></div>
                  </div>
                  <Input
                    type="url"
                    value={bannerForm.image.startsWith('data:') ? '' : bannerForm.image}
                    onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="mt-2"
                  />
                </div>
                
                <p className="text-xs text-stone-500 mt-2">
                  Sube una imagen desde tu computadora o pega una URL (max 5MB)
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Orden de Visualización</label>
                <Input
                  type="number"
                  required
                  min="1"
                  value={bannerForm.order}
                  onChange={(e) => setBannerForm({ ...bannerForm, order: parseInt(e.target.value) })}
                  placeholder="1"
                />
                <p className="text-xs text-stone-500 mt-1">
                  Define el orden en que aparecerá este banner (1 = primero)
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowBannerModal(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1 bg-brand-green hover:bg-brand-green-dark text-white">
                  {editingBanner ? 'Actualizar' : 'Crear'} Banner
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* User Edit Modal */}
        <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-stone-900">
                Editar Usuario
              </DialogTitle>
              <DialogDescription className="text-stone-600">
                Modifica la información del usuario
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSaveUser} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Nombre</label>
                <Input
                  type="text"
                  required
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  placeholder="Nombre completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
                <Input
                  type="email"
                  required
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  placeholder="email@ejemplo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Rol</label>
                <Select value={userForm.role} onValueChange={(value) => setUserForm({ ...userForm, role: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Usuario</SelectItem>
                    <SelectItem value="colaborador">Colaborador</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-stone-500 mt-1">
                  Admin: acceso completo • Colaborador: panel admin sin usuarios • Usuario: solo público
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowUserModal(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1 bg-brand-green hover:bg-brand-green-dark text-white">
                  Actualizar Usuario
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Admin;
