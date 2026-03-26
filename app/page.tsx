'use client';
import { useState, useEffect, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import TasksPage from '@/components/TasksPage';
import ClientsPage from '@/components/ClientsPage';
import ContactsPage from '@/components/ContactsPage';
import MailPage from '@/components/MailPage';
import CalendarPage from '@/components/CalendarPage';

export type Section = 'dashboard' | 'tasks' | 'clients' | 'contacts' | 'mail' | 'calendar';

export default function Home() {
  const [section, setSection] = useState<Section>('dashboard');
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const handleRefresh = useCallback(async () => {
    setSyncing(true);
    try {
      await fetch('/api/refresh');
      setLastSync(new Date().toLocaleTimeString('it-IT'));
    } catch (e) {
      console.error(e);
    } finally {
      setSyncing(false);
    }
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(handleRefresh, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [autoRefresh, handleRefresh]);

  const renderSection = () => {
    switch (section) {
      case 'dashboard': return <Dashboard />;
      case 'tasks': return <TasksPage />;
      case 'clients': return <ClientsPage />;
      case 'contacts': return <ContactsPage />;
      case 'mail': return <MailPage />;
      case 'calendar': return <CalendarPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#f5f5f7] overflow-hidden">
      <Sidebar section={section} setSection={setSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Deponti Commercial OS</h1>
            {lastSync && <p className="text-xs text-gray-400">Ultimo aggiornamento: {lastSync}</p>}
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="w-4 h-4 accent-blue-500"
              />
              Auto (5min)
            </label>
            <button
              onClick={handleRefresh}
              disabled={syncing}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#FF3B30] text-white font-semibold rounded-xl shadow-sm hover:bg-red-600 active:scale-95 transition-all disabled:opacity-60"
            >
              {syncing ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="text-lg">&#8635;</span>
              )}
              AGGIORNA
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
