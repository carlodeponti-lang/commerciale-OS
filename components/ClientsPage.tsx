'use client';

const CLIENTS = [
  { name: 'IBSA Farmaceutici', heat: 'caldo', lastContact: '2 gg', nextAction: 'Chiamata follow-up', revenue: 'High', status: 'Key Account', color: 'bg-green-500' },
  { name: 'Flamma S.p.A.', heat: 'caldo', lastContact: '5 gg', nextAction: 'Invio offerta', revenue: 'High', status: 'Key Account', color: 'bg-green-500' },
  { name: 'Bayer Italia', heat: 'tiepido', lastContact: '14 gg', nextAction: 'Email di aggiornamento', revenue: 'Medium', status: 'Prospect', color: 'bg-yellow-400' },
  { name: 'LabAnalysis S.r.l.', heat: 'tiepido', lastContact: '10 gg', nextAction: 'Rispondere SA8000', revenue: 'Medium', status: 'Prospect', color: 'bg-yellow-400' },
  { name: 'Complife Group', heat: 'freddo', lastContact: '28 gg', nextAction: 'Riattivare contatto', revenue: 'Low', status: 'Dormiente', color: 'bg-red-400' },
  { name: 'Recordati SpA', heat: 'freddo', lastContact: '45 gg', nextAction: 'Scouting nuovo referente', revenue: 'Low', status: 'Dormiente', color: 'bg-red-400' },
];

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">CRM Clienti</h2>

      {/* Heat map visiva */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-600 mb-4">Heat Map</h3>
        <div className="grid grid-cols-3 gap-3">
          {CLIENTS.map((c) => (
            <div key={c.name} className="rounded-xl p-4 bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2.5 h-2.5 rounded-full ${c.color}`} />
                <span className="text-sm font-medium text-gray-900">{c.name}</span>
              </div>
              <p className="text-xs text-gray-400">Ultimo contatto: {c.lastContact}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">{c.nextAction}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabella */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 uppercase border-b border-gray-100">
              <th className="text-left px-5 py-3">Cliente</th>
              <th className="text-left px-4 py-3">Stato</th>
              <th className="text-left px-4 py-3">Calore</th>
              <th className="text-left px-4 py-3">Ultimo contatto</th>
              <th className="text-left px-4 py-3">Prossima azione</th>
            </tr>
          </thead>
          <tbody>
            {CLIENTS.map((c) => (
              <tr key={c.name} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-900">{c.name}</td>
                <td className="px-4 py-3 text-gray-600">{c.status}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${c.color}`} />
                    <span className="text-gray-600">{c.heat}</span>
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{c.lastContact}</td>
                <td className="px-4 py-3 text-gray-700">{c.nextAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
