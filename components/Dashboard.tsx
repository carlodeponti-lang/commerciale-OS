'use client';
import { useState, useEffect } from 'react';

const KPI_DATA = [
  { label: 'Task aperti', value: 7, color: 'text-blue-600' },
  { label: 'Follow-up in attesa', value: 3, color: 'text-orange-500' },
  { label: 'Clienti caldi', value: 5, color: 'text-green-600' },
  { label: 'Offerte inviate', value: 2, color: 'text-purple-600' },
];

const CLIENTS_HEAT = [
  { name: 'IBSA Farmaceutici', heat: 'caldo', days: 2, color: 'bg-green-100 text-green-800' },
  { name: 'Flamma S.p.A.', heat: 'caldo', days: 5, color: 'bg-green-100 text-green-800' },
  { name: 'Bayer Italia', heat: 'tiepido', days: 14, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Complife Group', heat: 'freddo', days: 28, color: 'bg-red-100 text-red-800' },
  { name: 'LabAnalysis S.r.l.', heat: 'tiepido', days: 10, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Recordati SpA', heat: 'freddo', days: 45, color: 'bg-red-100 text-red-800' },
];

const TODAY_ITEMS = [
  { time: '09:00', label: 'Follow-up Post Incontro', type: 'task' },
  { time: '10:30', label: 'Incontro GNOSIS Svizzera - Dr. Casoni', type: 'meeting' },
  { time: '14:00', label: 'Rispondere a Labanalysis SA8000', type: 'mail' },
  { time: '16:00', label: 'Revisione offerta Flamma', type: 'task' },
];

export default function Dashboard() {
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' }));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Buongiorno, Carlo</h2>
        <p className="text-sm text-gray-400 mt-0.5 capitalize">{today}</p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-4 gap-4">
        {KPI_DATA.map((k) => (
          <div key={k.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className={`text-3xl font-bold ${k.color}`}>{k.value}</p>
            <p className="text-xs text-gray-500 mt-1">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Oggi */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Agenda di oggi</h3>
          <div className="space-y-3">
            {TODAY_ITEMS.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xs font-mono text-gray-400 w-10 pt-0.5">{item.time}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{item.label}</p>
                  <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${
                    item.type === 'meeting' ? 'bg-blue-50 text-blue-600' :
                    item.type === 'mail' ? 'bg-orange-50 text-orange-600' :
                    'bg-gray-50 text-gray-500'
                  }`}>{item.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heat Map Clienti */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Heat Map Clienti</h3>
          <div className="space-y-2">
            {CLIENTS_HEAT.map((c) => (
              <div key={c.name} className="flex items-center justify-between">
                <span className="text-sm text-gray-800">{c.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{c.days}gg fa</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.color}`}>{c.heat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
