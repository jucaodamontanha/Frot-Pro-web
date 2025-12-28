import { useEffect, useState } from 'react';
import api from '../api/api';
import { Layout } from '../components/Layout';
import { Users, UserPlus, Shield } from 'lucide-react';

export function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: '', email: '', senha: '', perfil: 'MECANICO'
  });

  const carregarUsuarios = () => {
    api.get('/usuarios').then(res => setUsuarios(res.data));
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/usuarios', novoUsuario);
      alert("Usuário cadastrado com sucesso!");
      setNovoUsuario({ nome: '', email: '', senha: '', perfil: 'MECANICO' });
      carregarUsuarios();
    } catch (error) {
      alert("Erro ao cadastrar usuário.");
    }
  };

  return (
    <Layout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-secundaria flex items-center gap-3">
          <Users className="text-principal" /> Gestão de Usuários
        </h1>
      </header>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="card-branco p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end text-left">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
          <input 
            type="text" className="input-padrao" required
            value={novoUsuario.nome}
            onChange={e => setNovoUsuario({...novoUsuario, nome: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
          <input 
            type="email" className="input-padrao" required
            value={novoUsuario.email}
            onChange={e => setNovoUsuario({...novoUsuario, email: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Perfil</label>
          <select 
            className="input-padrao"
            value={novoUsuario.perfil}
            onChange={e => setNovoUsuario({...novoUsuario, perfil: e.target.value})}
          >
            <option value="MECANICO">Mecânico</option>
            <option value="GESTOR">Gestor</option>
          </select>
        </div>
        <div>
  <label className="block text-sm font-medium text-slate-700 mb-1">Senha Inicial</label>
  <input 
    type="password" 
    className="input-padrao" 
    placeholder="Mínimo 6 caracteres"
    required
    value={novoUsuario.senha}
    onChange={e => setNovoUsuario({...novoUsuario, senha: e.target.value})}
  />
</div>
        <button type="submit" className="btn-principal flex items-center justify-center gap-2 h-[42px]">
          <UserPlus size={18} /> Cadastrar
        </button>
      </form>

      {/* Tabela */}
      <div className="card-branco overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="tabela-header p-4 text-left">Nome</th>
              <th className="tabela-header p-4 text-left">E-mail</th>
              <th className="tabela-header p-4 text-center">Nível de Acesso</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-secundaria text-left">{u.nome}</td>
                <td className="p-4 text-slate-600 text-left">{u.email}</td>
                <td className="p-4 text-center">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    u.perfil === 'GESTOR' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    <Shield size={12} /> {u.perfil}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}