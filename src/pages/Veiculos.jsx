import { useEffect, useState } from 'react';
import api from '../api/api';
import { Truck } from 'lucide-react';

export function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    api.get('/veiculos')
      .then(response => setVeiculos(response.data))
      .catch(error => console.error("Erro ao buscar veículos:", error));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1><Truck size={32} /> Frota de Veículos</h1>
      <table border="1" style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>Placa</th>
            <th>Modelo</th>
            <th>KM Atual</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map(v => (
            <tr key={v.id}>
              <td>{v.placa}</td>
              <td>{v.modelo}</td>
              <td>{v.kmAtual} km</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}