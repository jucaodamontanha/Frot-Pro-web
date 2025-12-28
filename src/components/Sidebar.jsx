import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Truck, Wrench, Users, LogOut, LayoutDashboard } from 'lucide-react';

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Veículos', path: '/veiculos', icon: <Truck size={20} /> },
    { name: 'Manutenções', path: '/manutencoes', icon: <Wrench size={20} /> },
    { name: 'Usuários', path: '/usuarios', icon: <Users size={20} /> },
  ];

  return (
    <aside className="w-64 bg-secundaria min-h-screen text-white flex flex-col p-6 fixed left-0 top-0">
      <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-700">
        <Truck className="text-principal" size={32} />
        <span className="font-bold text-xl tracking-tight">Frota Pro</span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-padrao transition-all ${
              location.pathname === item.path 
                ? 'bg-principal text-white shadow-lg shadow-blue-500/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <button 
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 p-3 text-slate-400 hover:text-perigo hover:bg-red-500/10 rounded-padrao transition-all border-t border-slate-700 pt-6"
      >
        <LogOut size={20} />
        <span className="font-medium">Sair da Conta</span>
      </button>
    </aside>
  );
}