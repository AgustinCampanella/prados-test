import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Menu, X, LogIn, User, Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll position when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsScrolled(false);
    setIsSidebarOpen(false); // Close sidebar on route change
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/nosotros', label: 'Nosotros' },
    { path: '/proyecto', label: 'El Proyecto' },
    { path: '/lotes', label: 'Lotes' },
    { path: '/sostenibilidad', label: 'Sostenibilidad' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/refiere-y-gana', label: 'Refiere y Gana' },
    { path: '/vende-tu-terreno', label: 'Vende tu terreno' },
    { path: '/eventos', label: 'Eventos' },
    { path: '/contacto', label: 'Contacto' },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginForm)
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and user info
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        
        alert(`¡Bienvenido ${data.user.name}!`);
        setIsLoginModalOpen(false);
        setLoginForm({ email: '', password: '' });

        // Redirect admin or colaborador to admin panel
        if (data.user.role === 'admin' || data.user.role === 'colaborador') {
          window.location.href = '/admin-panel-prados';
        }
      } else {
        alert(data.detail || 'Error al iniciar sesión');
      }
    } catch (error) {
      alert('Error de conexión');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('¡Cuenta creada exitosamente! Por favor inicia sesión.');
        setIsRegistering(false);
        setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
      } else {
        alert(data.detail || 'Error al crear la cuenta');
      }
    } catch (error) {
      alert('Error de conexión');
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    alert('Sesión cerrada exitosamente');
    window.location.href = '/';
  };

  return (
    <>
      {/* Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Menu Hamburger - Left */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isScrolled
                  ? 'hover:bg-brand-green/10'
                  : 'hover:bg-white/20'
              }`}
            >
              <Menu className={`w-6 h-6 transition-colors duration-300 ${
                isScrolled ? 'text-brand-green' : 'text-white'
              }`} />
            </button>

            {/* Logo - Center */}
            <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2 flex-shrink-0">
              <img 
                src="/prados-logo.svg" 
                alt="Prados de Paraíso" 
                className={`h-10 w-auto transition-all duration-300 ${!isScrolled ? 'brightness-0 invert' : ''}`}
              />
              <div className="flex flex-col">
                <span className={`text-base md:text-lg font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-brand-green' : 'text-white'
                }`}>
                  Prados de Paraíso
                </span>
                <span className={`text-xs transition-colors duration-300 hidden sm:block ${
                  isScrolled ? 'text-brand-green-dark' : 'text-white/90'
                }`}>
                  Villa Eco-Sostenible
                </span>
              </div>
            </Link>

            {/* User Info / Login Button - Right */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-2">
                  <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                    isScrolled ? 'bg-stone-50' : 'bg-white/10 backdrop-blur-sm'
                  }`}>
                    <div className={`w-8 h-8 rounded-full bg-brand-green flex items-center justify-center text-white font-semibold text-sm`}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-sm font-semibold ${isScrolled ? 'text-stone-900' : 'text-white'}`}>
                        {user.name}
                      </span>
                      {(user.role === 'admin' || user.role === 'colaborador') && (
                        <Link 
                          to="/admin-panel-prados"
                          className={`text-xs ${isScrolled ? 'text-brand-green' : 'text-brand-green-light'} hover:underline`}
                        >
                          Panel Admin
                        </Link>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className={`hidden md:flex transition-all duration-300 ${
                      isScrolled
                        ? 'border-brand-green text-brand-green hover:bg-brand-green hover:text-white'
                        : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30'
                    }`}
                  >
                    <LogIn className="w-4 h-4 rotate-180" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsLoginModalOpen(true)}
                  size="sm"
                  className={`transition-all duration-300 ${
                    isScrolled
                      ? 'bg-brand-green hover:bg-brand-green-dark text-white'
                      : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30'
                  }`}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Iniciar Sesión
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-stone-200">
            <span className="text-lg font-bold text-stone-900">Menú</span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5 text-stone-600" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'text-brand-green bg-brand-green/10'
                      : 'text-stone-700 hover:text-brand-green hover:bg-stone-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Sidebar Footer - User Info / Login */}
          <div className="p-4 border-t border-stone-200">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3 py-2 bg-stone-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-stone-500 truncate">{user.email}</p>
                  </div>
                </div>
                
                {(user.role === 'admin' || user.role === 'colaborador') && (
                  <Link
                    to="/admin-panel-prados"
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-brand-green hover:bg-brand-green/10 rounded-lg transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    Panel Admin
                  </Link>
                )}

                <Button
                  onClick={() => {
                    handleLogout();
                    setIsSidebarOpen(false);
                  }}
                  variant="outline"
                  className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
                >
                  <LogIn className="w-4 h-4 mr-2 rotate-180" />
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setIsSidebarOpen(false);
                }}
                className="w-full bg-brand-green hover:bg-brand-green-dark text-white"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Iniciar Sesión
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Login/Register Modal */}
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-stone-900">
              {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
            </DialogTitle>
            <DialogDescription className="text-stone-600">
              {isRegistering 
                ? 'Completa los datos para crear tu cuenta'
                : 'Ingresa tus credenciales para acceder'
              }
            </DialogDescription>
          </DialogHeader>

          {/* Login Form */}
          {!isRegistering && (
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <Input
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    placeholder="tu@email.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-stone-300" />
                  <span className="text-stone-600">Recordarme</span>
                </label>
                <a href="#" className="text-brand-green hover:text-brand-green-dark">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <Button type="submit" disabled={loading} className="w-full bg-brand-green hover:bg-brand-green-dark text-white">
                  {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsRegistering(true)}
                  className="w-full"
                >
                  ¿No tienes cuenta? Regístrate
                </Button>
              </div>
            </form>
          )}

          {/* Register Form */}
          {isRegistering && (
            <form onSubmit={handleRegister} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Nombre completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <Input
                    type="text"
                    required
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    placeholder="Juan Pérez"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <Input
                    type="email"
                    required
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    placeholder="tu@email.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <Input
                    type="password"
                    required
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <Button type="submit" disabled={loading} className="w-full bg-brand-green hover:bg-brand-green-dark text-white">
                  {loading ? 'Creando...' : 'Crear Cuenta'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsRegistering(false)}
                  className="w-full"
                >
                  ¿Ya tienes cuenta? Inicia sesión
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
