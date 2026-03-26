'use client';
import { useState } from 'react';

type Contact = {
  id: number; name: string; role: string; company: string;
  email: string; phone: string; status: string; origin: string; lastContact: string;
};

const INIT: Contact[] = [
  { id: 1, name: 'Dr. Marco Casoni', role: 'R&D Director', company: 'GNOSIS Svizzera', email: 'casoni@gnosis.ch', phone: '+41 79 000 0001', status: 'Key Account', origin: 'Incontro', lastContact: '2026-03-26' },
  { id: 2, name: 'Ing. Laura Bianchi', role: 'QC Manager', company: 'IBSA Farmaceutici', email: 'bianchi@ibsa.ch', phone: '+39 02 000 0002', status: 'Key Account', origin: 'Email', lastContact: '2026-03-24' },
  { id: 3, name: 'Dott. Filippo Rossi', role: 'Validation Engineer', company: 'Flamma S.p.A.', email: 'rossi@flamma.it', phone: '+39 035 000 003', status: 'Prospect', origin: 'Cold Call', lastContact: '2026-03-20' },
  { id: 4, name: 'Sara Conti', role: 'Regulatory Affairs', company: 'Bayer Italia', email: 'conti@bayer.com', phone: '+39 02 000 0004', status: 'Dormiente', origin: 'Fiera', lastContact: '2026-02-10' },
  { id: 5, name: 'Paolo Ferretti', role: 'QA Director', company: 'Complife Group', email: 'ferretti@complife.it', phone: '+39 0381 000 005', status: 'Offerta inviata', origin: 'Referral', lastContact: '2026-03-15' },
];

const STATUS_COLOR: Record<string, string> = {
  'Key Account': 'bg-blue-50 text-blue-700',
  'Prospect': 'bg-green-50 text-green-700',
  'Dormiente': 'bg-red-50 text-red-700',
  'Offerta inviata': 'bg-orange-50 text-orange-700',
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(INIT);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Contact, 'id'>>({
    name: '', role: '', company: '', email: '', phone: '', status: 'Prospect', origin: '', lastContact: '',
  });

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const header = 'Nome,Ruolo,Azienda,Email,Telefono,Stato,Origine,Ultimo Contatto';
    const rows = contacts.map((c) =>
      `"${c.name}","${c.role}","${c.company}","${c.email}","${c.phone}","${c.status}","${c.origin}","${c.lastContact}"`
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contatti_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const addContact = () => {
    if (!form.name.trim()) return;
    setContacts((c) => [...c, { ...form, id: Date.now() }]);
    setForm({ name: '', role: '', company: '', email: '', phone: '', status: 'Prospect', origin: '', lastContact: '' });
    setShowForm(false);
  };

  const remove = (id: number) => setContacts((c) => c.filter((x) => x.id !== id));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Contatti ({contacts.length})</h2>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition">
            Esporta CSV
          </button>
          <button onClick={() => setShowForm((s) => !s)} className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
            + Aggiungi
          </button>
        </div>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cerca per nome, azienda o ruolo..."
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 grid grid-cols-3 gap-3">
          {(['name','role','company','email','phone','origin','lastContact'] as const).map((f) => (
            <input
              key={f}
              value={form[f]}
              onChange={(e) => setForm((x) => ({ ...x, [f]: e.target.value }))}
              placeholder={f === 'name' ? 'Nome' : f === 'role' ? 'Ruolo' : f === 'company' ? 'Azienda' : f === 'email' ? 'Email' : f === 'phone' ? 'Telefono' : f === 'origin' ? 'Origine' : 'Ultimo contatto (YYYY-MM-DD)'}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
          <select value={form.status} onChange={(e) => setForm((x) => ({ ...x, status: e.target.value }))} className="px-3 py-2 rounded-lg border border-gray-200 text-sm">
            {['Key Account','Prospect','Dormiente','Offerta inviata'].map((s) => <option key={s}>{s}</option>)}
          </select>
          <button onClick={addContact} className="col-span-3 mt-1 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition">Salva contatto</button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 uppercase border-b border-gray-100">
              <th className="text-left px-5 py-3">Nome</th>
              <th className="text-left px-4 py-3">Ruolo</th>
              <th className="text-left px-4 py-3">Azienda</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Telefono</th>
              <th className="text-left px-4 py-3">Stato</th>
              <th className="text-left px-4 py-3">Ultimo contatto</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-900">{c.name}</td>
                <td className="px-4 py-3 text-gray-600">{c.role}</td>
                <td className="px-4 py-3 text-gray-600">{c.company}</td>
                <td className="px-4 py-3 text-blue-600"><a href={`mailto:${c.email}`}>{c.email}</a></td>
                <td className="px-4 py-3 text-gray-600">{c.phone}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLOR[c.status] || 'bg-gray-50 text-gray-600'}`}>{c.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-500">{c.lastContact}</td>
                <td className="px-4 py-3">
                  <button onClick={() => remove(c.id)} className="text-gray-300 hover:text-red-400">&times;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="px-5 py-4 text-sm text-gray-400">Nessun contatto trovato</p>}
      </div>
    </div>
  );
}
