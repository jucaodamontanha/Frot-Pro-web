import { useState } from 'react';
import api from '../api/api';

export function FormVeiculo({ aoCadastrar }) {
  const [veiculo, setVeiculo] = useState({ placa: '', modelo: '', kmAtual: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/veiculos', veiculo);
      alert("Veículo cadastrado com sucesso!");
      setVeiculo({ placa: '', modelo: '', kmAtual: '' }); // Limpa o form
      aoCadastrar(); // Atualiza a lista automaticamente
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao salvar veículo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-branco p-card mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
      <div>
        <label className="block text-sm font-medium text-secundaria mb-1">Placa</label>
        <input 
          type="text" 
          value={veiculo.placa}
          onChange={e => setVeiculo({...veiculo, placa: e.target.value.toUpperCase()})}
          className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-principal outline-none"
          placeholder="ABC1D23"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-secundaria mb-1">Modelo</label>
        <input 
          type="text" 
          value={veiculo.modelo}
          onChange={e => setVeiculo({...veiculo, modelo: e.target.value})}
          className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-principal outline-none"
          placeholder="Ex: Fiat Toro"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-secundaria mb-1">KM Inicial</label>
        <input 
          type="number" 
          value={veiculo.kmAtual}
          onChange={e => setVeiculo({...veiculo, kmAtual: e.target.value})}
          className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-principal outline-none"
          placeholder="0"
          required
        />
      </div>
      <button type="submit" className="btn-principal h-[42px]">
        Salvar Veículo
      </button>
    </form>
  );
}