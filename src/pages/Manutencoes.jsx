import { useEffect, useState } from 'react';
import api from '../api/api';
import { Layout } from '../components/Layout';
import { Wrench, Plus, CheckCircle } from 'lucide-react';

export function Manutencoes() {
  const [manutencoes, setManutencoes] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [novaManutencao, setNovaManutencao] = useState({
    veiculoId: '',
    descricaoProblema: '' // Nome alterado para bater com o RequestDTO do Java
  });

  const carregarDados = async () => {
    try {
      const [resM, resV] = await Promise.all([
        api.get('/manutencoes'),
        api.get('/veiculos')
      ]);
      setManutencoes(resM.data);
      setVeiculos(resV.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviamos exatamente o que o ManutencaoRequestDTO espera
      await api.post('/manutencoes', novaManutencao);
      alert("Manutenção aberta com sucesso!");
      setNovaManutencao({ veiculoId: '', descricaoProblema: '' });
      carregarDados();
    } catch (error) {
      alert("Erro ao abrir manutenção.");
    }
  };

  const finalizarOS = async (id) => {
    if (confirm("Deseja finalizar esta Ordem de Serviço?")) {
      try {
        await api.put(`/manutencoes/${id}/finalizar`);
        carregarDados();
      } catch (error) {
        alert("Erro ao finalizar.");
      }
    }
  };

  return (
    <Layout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-secundaria flex items-center gap-3">
          <Wrench className="text-principal" /> Ordens de Serviço
        </h1>
      </header>

      {/* Formulário de Abertura */}
      <form onSubmit={handleSubmit} className="card-branco p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-secundaria mb-1">Veículo</label>
          <select 
            className="w-full border border-slate-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-principal"
            value={novaManutencao.veiculoId}
            onChange={e => setNovaManutencao({...novaManutencao, veiculoId: e.target.value})}
            required
          >
            <option value="">Selecione um veículo...</option>
            {veiculos.map(v => (
              <option key={v.id} value={v.id}>{v.placa} - {v.modelo}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-secundaria mb-1">Descrição do Problema</label>
          <input 
            type="text"
            className="w-full border border-slate-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-principal"
            placeholder="Ex: Troca de óleo"
            value={novaManutencao.descricaoProblema}
            onChange={e => setNovaManutencao({...novaManutencao, descricaoProblema: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="btn-principal flex items-center justify-center gap-2 h-[42px]">
          <Plus size={18} /> Abrir Manutenção
        </button>
      </form>

      {/* Tabela de Manutenções */}
      <div className="card-branco overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="tabela-header p-4 text-left w-[20%]">Veículo</th>
              <th className="tabela-header p-4 text-left w-[40%]">Descrição</th>
              <th className="tabela-header p-4 text-center w-[20%]">Data de Entrada</th>
              <th className="tabela-header p-4 text-right w-[20%]">Ações / Status</th>
            </tr>
          </thead>
          <tbody>
            {manutencoes.map(m => (
              <tr key={m.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-secundaria">{m.placaVeiculo}</td>
                <td className="p-4 text-slate-600">{m.descricaoProblema}</td>
                <td className="p-4 text-center text-slate-600">
                  {/* Resolve o Invalid Date validando se a string da data existe */}
                  {m.dataAbertura ? new Date(m.dataAbertura).toLocaleDateString('pt-BR') : '--/--/----'}
                </td>
                <td className="p-4 text-right">
                  {m.status === 'ABERTA' ? (
                    <button 
                      onClick={() => finalizarOS(m.id)}
                      className="flex items-center gap-1 ml-auto bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase hover:bg-amber-200 transition-all cursor-pointer"
                    >
                      <CheckCircle size={14} /> Finalizar OS
                    </button>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                      Concluída
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}