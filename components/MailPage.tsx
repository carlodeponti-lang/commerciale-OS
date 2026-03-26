'use client';
import { useState } from 'react';

type Mail = { id: number; from: string; company: string; subject: string; date: string; status: 'da gestire' | 'follow-up' | 'risposto' | 'attesa'; followUpDue?: string };

const INIT: Mail[] = [
  { id: 1, from: 'Laura Bianchi', company: 'IBSA Farmaceutici', subject: 'Richiesta offerta taratura strumenti', date: '2026-03-26', status: 'da gestire' },
  { id: 2, from: 'Paolo Ferretti', company: 'Complife Group', subject: 'Modifica procedura recall preventivi', date: '2026-03-25', status: 'follow-up', followUpDue: '2026-03-28' },
  { id: 3, from: 'Sara Conti', company: 'Bayer Italia', subject: 'Documentazione SA8000', date: '2026-03-24', status: 'da gestire' },
  { id: 4, from: 'Dr. Marco Casoni', company: 'GNOSIS Svizzera', subject: 'Post incontro - prossimi step', date: '2026-03-23', status: 'risposto' },
  { id: 5, from: 'Filippo Rossi', company: 'Flamma S.p.A.', subject: 'Revisione offerta Q1 2026', date: '2026-03-22', status: 'attesa', followUpDue: '2026-03-29' },
];

const S_COLOR: Record<string, string> = {
  'da gestire': 'bg-red-50 text-red-700',
  'follow-up': 'bg-orange-50 text-orange-700',
  'risposto': 'bg-green-50 text-green-700',
  'attesa': 'bg-yellow-50 text-yellow-700',
};

export default function MailPage() {
  const [mails, setMails] = useState<Mail[]>(INIT);

  const setStatus = (id: number, status: Mail['status']) =>
    setMails((m) => m.map((x) => (x.id === id ? { ...x, status } : x)));

  const open = mails.filter((m) => m.status !== 'risposto');
  const done = mails.filter((m) => m.status === 'risposto');

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Mail & Follow-up ({open.length} attivi)</h2>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {open.map((m) => (
          <div key={m.id} className="flex items-start gap-4 px-5 py-4 border-b border-gray-50 last:border-0">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-medium text-gray-900">{m.from}</p>
                <span className="text-xs text-gray-400">&middot; {m.company}</span>
              </div>
              <p className="text-sm text-gray-600">{m.subject}</p>
              {m.followUpDue && <p className="text-xs text-orange-500 mt-0.5">Follow-up entro {m.followUpDue}</p>}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{m.date}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${S_COLOR[m.status]}`}>{m.status}</span>
              {m.status !== 'risposto' && (
                <button
                  onClick={() => setStatus(m.id, 'risposto')}
                  className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition"
                >
                  Segna risposto
                </button>
              )}
            </div>
          </div>
        ))}
        {open.length === 0 && <p className="px-5 py-4 text-sm text-gray-400">Nessuna mail in gestione</p>}
      </div>

      {done.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Gestite ({done.length})</p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden opacity-60">
            {done.map((m) => (
              <div key={m.id} className="flex items-center gap-4 px-5 py-3 border-b border-gray-50 last:border-0">
                <p className="text-sm text-gray-400 flex-1 line-through">{m.subject}</p>
                <span className="text-xs text-gray-400">{m.from}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
