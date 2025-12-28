import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Lock, Mail } from 'lucide-react';
import api from '../api/api';

export function Login() {
const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

 const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/usuarios/login', { email, senha });
      
      // 2. Salva os dados do usuário no navegador (Sessão)
      localStorage.setItem('usuario', JSON.stringify(response.data));
      
      // 3. Redireciona para a tela de veículos automaticamente
      navigate('/veiculos');
      
    } catch (error) {
      alert("E-mail ou senha inválidos.");
    }
  };

  return (
    <div className="min-h-screen bg-fundo flex items-center justify-center p-6">
      <div className="card-branco w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-principal/10 p-4 rounded-full mb-4">
            <Truck size={48} className="text-principal" />
          </div>
          <h1 className="text-2xl font-bold text-secundaria">Acesso ao Sistema</h1>
          <p className="text-slate-500 text-sm">Gestão de Frotas e Manutenção</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-secundaria mb-2">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
              <input 
                type="email" 
                className="w-full border border-slate-300 rounded-padrao p-2.5 pl-11 focus:ring-2 focus:ring-principal outline-none transition-all"
                placeholder="nome@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secundaria mb-2">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
              <input 
                type="password" 
                className="w-full border border-slate-300 rounded-padrao p-2.5 pl-11 focus:ring-2 focus:ring-principal outline-none transition-all"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-principal w-full py-3 text-lg shadow-lg shadow-blue-500/30">
            Entrar no Sistema
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-400">
          v1.0.0 • 2025 Sistema de Frotas
        </p>
      </div>
    </div>
  );
}