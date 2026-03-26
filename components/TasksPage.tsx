'use client';
import { useState } from 'react';

type Task = { id: number; title: string; done: boolean; priority: 'alta' | 'media' | 'bassa'; due: string; client: string };

const INIT: Task[] = [
  { id: 1, title: 'Follow-up offerta IBSA', done: false, priority: 'alta', due: '2026-03-27', client: 'IBSA Farmaceutici' },
  { id: 2, title: 'Preparare presentazione Flamma', done: false, priority: 'alta', due: '2026-03-28', client: 'Flamma S.p.A.' },
  { id: 3, title: 'Aggiornare scheda Bayer', done: true, priority: 'media', due: '2026-03-25', client: 'Bayer Italia' },
  { id: 4, title: 'Chiamare Complife per recall', done: false, priority: 'media', due: '2026-03-29', client: 'Complife Group' },
  { id: 5, title: 'Inviare documentazione SA8000', done: false, priority: 'bassa', due: '2026-03-31', client: 'LabAnalysis S.r.l.' },
];

const P_COLOR: Record<string, string> = {
  alta: 'bg-red-50 text-red-700',
  media: 'bg-orange-50 text-orange-700',
  bassa: 'bg-gray-50 text-gray-600',
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(INIT);
  const [newTitle, setNewTitle] = useState('');

  const toggle = (id: number) =>
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));

  const add = () => {
    if (!newTitle.trim()) return;
    setTasks((t) => [
      ...t,
      { id: Date.now(), title: newTitle.trim(), done: false, priority: 'media', due: '', client: '' },
    ]);
    setNewTitle('');
  };

  const remove = (id: number) => setTasks((t) => t.filter((x) => x.id !== id));

  const open = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Task ({open.length} aperti)</h2>
      </div>

      {/* Aggiungi task */}
      <div className="flex gap-2">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder="Aggiungi un task..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={add} className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition">
          Aggiungi
        </button>
      </div>

      {/* Lista aperti */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {open.map((task) => (
          <div key={task.id} className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-50 last:border-0">
            <input type="checkbox" checked={false} onChange={() => toggle(task.id)} className="w-4 h-4 accent-blue-600" />
            <div className="flex-1">
              <p className="text-sm text-gray-900">{task.title}</p>
              {task.client && <p className="text-xs text-gray-400">{task.client} {task.due && `· Entro ${task.due}`}</p>}
            </div>
            {task.priority && <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${P_COLOR[task.priority]}`}>{task.priority}</span>}
            <button onClick={() => remove(task.id)} className="text-gray-300 hover:text-red-400 text-lg">&times;</button>
          </div>
        ))}
        {open.length === 0 && <p className="px-5 py-4 text-sm text-gray-400">Nessun task aperto</p>}
      </div>

      {/* Completati */}
      {done.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Completati ({done.length})</p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden opacity-60">
            {done.map((task) => (
              <div key={task.id} className="flex items-center gap-3 px-5 py-3 border-b border-gray-50 last:border-0">
                <input type="checkbox" checked onChange={() => toggle(task.id)} className="w-4 h-4 accent-blue-600" />
                <p className="text-sm text-gray-400 line-through flex-1">{task.title}</p>
                <button onClick={() => remove(task.id)} className="text-gray-300 hover:text-red-400 text-lg">&times;</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
