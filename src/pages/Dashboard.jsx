import { useEffect, useState } from 'react';
import api from '../api/api';
import { Layout } from '../components/Layout';
import { Truck, Wrench, CheckCircle, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function Dashboard() {
  const [stats, setStats] = useState({ totalVeiculos: 0, osAbertas: 0, osFinalizadas: 0 });
  const [dadosGrafico, setDadosGrafico] = useState([]);

  useEffect(() => {
    // Carrega estatísticas e dados do gráfico simultaneamente para evitar múltiplos re-renders
    Promise.all([
      api.get('/manutencoes/estatisticas'),
      api.get('/manutencoes/grafico-mensal')
    ]).then(([resStats, resGrafico]) => {
      setStats(resStats.data);
      setDadosGrafico(resGrafico.data);
    }).catch(err => console.error("Erro ao carregar dados do Dashboard", err));
  }, []);

  const cards = [
    { 
      label: 'Frota Total', 
      valor: stats.totalVeiculos, 
      icon: <Truck size={32} />, 
      cor: 'bg-blue-500',
      shadow: 'shadow-blue-200'
    },
    { 
      label: 'O.S. em Aberto', 
      valor: stats.osAbertas, 
      icon: <AlertCircle size={32} />, 
      cor: 'bg-amber-500',
      shadow: 'shadow-amber-200'
    },
    { 
      label: 'Manutenções Concluídas', 
      valor: stats.osFinalizadas, 
      icon: <CheckCircle size={32} />, 
      cor: 'bg-green-500', 
      shadow: 'shadow-green-200'
    }
  ];

  return (
    <Layout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-secundaria text-left">Painel de Controle</h1>
        <p className="text-slate-500 text-left">Resumo operacional do sistema de frotas.</p>
      </header>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {cards.map((card, index) => (
          <div key={index} className={`p-6 rounded-padrao bg-white border border-slate-100 shadow-xl ${card.shadow} flex items-center gap-5 transition-transform hover:scale-105`}>
            <div className={`${card.cor} p-4 rounded-lg text-white`}>
              {card.icon}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{card.label}</p>
              <p className="text-4xl font-black text-secundaria">{card.valor}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Gráfico de Produtividade */}
      <div className="grid grid-cols-1 gap-8">
        <div className="card-branco p-8 text-left">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-secundaria">Produtividade da Oficina</h2>
            <p className="text-sm text-slate-500">Total de manutenções finalizadas por mês</p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosGrafico}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="mes" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 12}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 12}}
                />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                  {dadosGrafico.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === dadosGrafico.length - 1 ? '#3b82f6' : '#94a3b8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
        <div className="card-branco p-8">
          <h2 className="font-bold text-lg mb-4">Ações Rápidas</h2>
          <div className="flex gap-4">
            <button className="btn-principal py-3 px-6">Nova Manutenção</button>
            <button className="border border-slate-200 rounded-padrao py-3 px-6 hover:bg-slate-50 transition-all">Relatório Semanal</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}