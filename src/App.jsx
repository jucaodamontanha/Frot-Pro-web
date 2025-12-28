import { useEffect, useState } from 'react';
import api from './api/api';
import { Layout } from './components/Layout';
import { FormVeiculo } from './components/FormVeiculo';

export default function App() {
  const [veiculos, setVeiculos] = useState([]);

  const carregarVeiculos = async () => {
    const res = await api.get('/veiculos');
    setVeiculos(res.data);
  };

  useEffect(() => {
    carregarVeiculos();
  }, []);

  return (
    <Layout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-secundaria">Frota de Veículos</h1>
        <p className="text-slate-500">Gerencie os veículos cadastrados na sua unidade.</p>
      </header>

      <FormVeiculo aoCadastrar={carregarVeiculos} />

      <div className="card-branco mt-6">
  <table className="w-full border-collapse">
    <thead>
      <tr className="border-b border-slate-100">
        {/* Usamos larguras percentuais para garantir que o título e o corpo ocupem o mesmo espaço */}
        <th className="tabela-header w-[25%] p-4 text-left">Placa</th>
        <th className="tabela-header w-[50%] p-4 text-left">Modelo</th>
        <th className="tabela-header w-[25%] p-4 text-right">KM Atual</th>
      </tr>
    </thead>
    <tbody>
      {veiculos.map(v => (
        <tr key={v.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
          <td className="p-4 font-bold text-secundaria text-left uppercase">
            {v.placa}
          </td>
          <td className="p-4 text-slate-600 text-left">
            {v.modelo}
          </td>
          <td className="p-4 text-slate-600 text-right font-mono">
            {v.kmAtual.toLocaleString()} km
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </Layout>
  );
}