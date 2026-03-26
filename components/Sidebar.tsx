'use client';
import { Section } from '@/app/page';

const nav: { id: Section; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'tasks', label: 'Task', icon: '✓' },
  { id: 'clients', label: 'Clienti', icon: '★' },
  { id: 'contacts', label: 'Contatti', icon: '◎' },
  { id: 'mail', label: 'Mail & Follow-up', icon: '✉' },
  { id: 'calendar', label: 'Calendario', icon: '⊡' },
];

export default function Sidebar({
  section,
  setSection,
}: {
  section: Section;
  setSection: (s: Section) => void;
}) {
  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col py-6 px-3">
      <div className="mb-8 px-3">
        <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">Commercial OS</span>
      </div>
      <nav className="flex flex-col gap-1">
        {nav.map((item) => (
          <button
            key={item.id}
            onClick={() => setSection(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              section === item.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className="text-base w-5 text-center">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
